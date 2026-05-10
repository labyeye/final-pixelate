import { createHash } from "node:crypto";

const META_GRAPH_API = "https://graph.facebook.com/v19.0";

export type MetaPostMetrics = {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  followers_gained: number;
};

export async function exchangeForLongLivedToken(
  shortToken: string,
): Promise<string> {
  const url = new URL(`${META_GRAPH_API}/oauth/access_token`);
  url.searchParams.set("grant_type", "fb_exchange_token");
  url.searchParams.set("client_id", process.env.FACEBOOK_APP_ID!);
  url.searchParams.set("client_secret", process.env.FACEBOOK_APP_SECRET!);
  url.searchParams.set("fb_exchange_token", shortToken);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Token exchange failed: ${await res.text()}`);
  const data = await res.json();
  if (!data.access_token)
    throw new Error("No access_token in exchange response");
  return data.access_token;
}

export type MetaPage = {
  id: string;
  name: string;
  access_token: string;
  link?: string;
  username?: string;
  instagram_business_account?: { id: string };
};

export async function getUserPages(
  longLivedToken: string,
): Promise<MetaPage[]> {
  const url = new URL(`${META_GRAPH_API}/me/accounts`);
  url.searchParams.set(
    "fields",
    "id,name,access_token,instagram_business_account",
  );
  url.searchParams.set("access_token", longLivedToken);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to get pages: ${await res.text()}`);
  const data = await res.json();
  return data.data || [];
}

export async function getPageDetails(
  pageId: string,
  pageToken: string,
): Promise<Pick<MetaPage, "id" | "name" | "link" | "username">> {
  const url = new URL(`${META_GRAPH_API}/${pageId}`);
  url.searchParams.set("fields", "id,name,link,username");
  url.searchParams.set("access_token", pageToken);

  const res = await fetch(url.toString());
  if (!res.ok) return { id: pageId, name: pageId };
  return res.json();
}

export function parseFbPostId(postUrl: string): {
  postId: string | null;
  pageId: string | null;
} {
  try {
    const u = new URL(postUrl);
    const pathname = u.pathname;

    const reelMatch = pathname.match(/\/reel\/(\d+)/);
    if (reelMatch) return { postId: reelMatch[1], pageId: null };

    const fbid = u.searchParams.get("fbid");
    const pageIdFromQuery = u.searchParams.get("id");
    if (fbid && pathname.includes("photo"))
      return { postId: fbid, pageId: pageIdFromQuery };

    const storyFbid = u.searchParams.get("story_fbid");
    if (storyFbid) return { postId: storyFbid, pageId: pageIdFromQuery };

    const videoId = u.searchParams.get("v");
    if (videoId) return { postId: videoId, pageId: null };

    // /posts/pfbid... — alphanumeric slug, not a numeric ID
    // /posts/123456789 — numeric post ID
    const pathMatch = pathname.match(
      /\/[^/]+\/(posts|videos|photos|notes)\/([^/?]+)/,
    );
    if (pathMatch) return { postId: pathMatch[2], pageId: null };
  } catch {}
  return { postId: null, pageId: null };
}

// Resolves Facebook share shortlinks (facebook.com/share/p/TOKEN) to the real URL
// by following the HTTP redirect without loading page content.
async function resolveShareUrl(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "User-Agent": "facebookexternalhit/1.1" },
    });
    const resolved = res.url;
    // If redirect landed back on a share URL or same URL, return original
    if (resolved && !resolved.includes("/share/") && resolved !== url) {
      return resolved;
    }
  } catch {}
  return url;
}

// Resolve a full post URL to a numeric Graph API object ID.
async function resolveUrlToObjectId(
  postUrl: string,
  accessToken: string,
): Promise<string | null> {
  try {
    const url = new URL(`${META_GRAPH_API}/`);
    url.searchParams.set("id", postUrl);
    url.searchParams.set("fields", "id");
    url.searchParams.set("access_token", accessToken);
    const res = await fetch(url.toString());
    if (!res.ok) return null;
    const data = await res.json();
    if (data.id && /^\d+$/.test(data.id)) return data.id;
  } catch {}
  return null;
}

// Search page's recent posts/feed to find the numeric ID matching a pfbid permalink.
// Tries multiple endpoints because reels/videos don't appear in /posts.
async function resolveViaPagePosts(
  pageId: string,
  pfbid: string,
  accessToken: string,
): Promise<string | null> {
  const endpoints = [
    `${META_GRAPH_API}/${pageId}/posts`,
    `${META_GRAPH_API}/${pageId}/feed`,
    `${META_GRAPH_API}/${pageId}/published_posts`,
  ];

  for (const base of endpoints) {
    let after: string | null = null;
    for (let p = 0; p < 4; p++) {
      const url = new URL(base);
      url.searchParams.set("fields", "id,permalink_url");
      url.searchParams.set("limit", "25");
      url.searchParams.set("access_token", accessToken);
      if (after) url.searchParams.set("after", after);

      try {
        const res = await fetch(url.toString());
        if (!res.ok) break;
        const data = await res.json();
        if (data.error) break;

        for (const post of data.data || []) {
          const permalink: string = post.permalink_url || "";
          // Match pfbid anywhere in the permalink URL
          if (permalink.includes(pfbid)) return post.id;
        }

        after = data.paging?.cursors?.after;
        if (!after) break;
      } catch {
        break;
      }
    }
  }
  return null;
}

export async function fetchFbPostMetrics(
  postUrl: string,
  pageId: string,
  pageAccessToken: string,
): Promise<MetaPostMetrics> {
  // Resolve share shortlinks first
  const resolvedUrl = postUrl.includes("/share/")
    ? await resolveShareUrl(postUrl)
    : postUrl;

  let { postId } = parseFbPostId(resolvedUrl);
  if (!postId)
    throw new Error(
      `Could not extract post ID from URL: ${postUrl}. ` +
      `Please use the direct post URL from your Facebook Page ` +
      `(e.g. facebook.com/YourPage/posts/123456789) instead of a share link.`
    );

  // pfbid slugs are not numeric — resolve to real numeric ID via multiple strategies
  const isPfbid = postId.startsWith("pfbid") || !/^\d+$/.test(postId);
  if (isPfbid) {
    // Strategy 1: Graph API URL lookup
    const byUrl = await resolveUrlToObjectId(resolvedUrl, pageAccessToken);
    if (byUrl) {
      postId = byUrl;
    } else {
      // Strategy 2: Search page's posts feed for matching permalink
      const byFeed = await resolveViaPagePosts(pageId, postId, pageAccessToken);
      if (byFeed) postId = byFeed;
      // else: try with slug anyway — will fail with a clear error
    }
  }

  const engFields = [
    "id,reactions.summary(true).limit(0),likes.summary(true).limit(0),comments.summary(true).limit(0),shares",
    "id,reactions.summary(true).limit(0),likes.summary(true).limit(0),comments.summary(true).limit(0)",
    "id,likes.summary(true).limit(0),comments.summary(true).limit(0)",
  ];

  async function fetchEngagement(id: string, token: string): Promise<any | null> {
    for (const fields of engFields) {
      const url = new URL(`${META_GRAPH_API}/${id}`);
      url.searchParams.set("fields", fields);
      url.searchParams.set("access_token", token);
      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.error) {
        const code = data.error.code;
        const subcode = data.error.error_subcode;
        console.warn(`FB engagement error for ${id}: ${data.error.message} (code ${code}, subcode ${subcode})`);
        // Token expired — throw immediately, no point retrying
        if (code === 190) {
          throw new Error(`Facebook access token has expired. Go to the client's Social Tokens tab and click "Connect Facebook" to get a new token.`);
        }
        // Permission error on this specific ID format (code 10) — try next field combo or caller will try bare ID
        // Field doesn't exist (code 100) — try next field combo without that field
        if (code === 10 || code === 100) continue;
        // Other auth/fatal errors — stop retrying
        break;
      }
      if (res.ok) return data;
    }
    return null;
  }

  const graphId = `${pageId}_${postId}`;
  console.log(`[FB metrics] postUrl=${postUrl} postId=${postId} graphId=${graphId}`);

  // Try all ID formats: pageId_postId, bare postId, then URL-resolved ID
  let eng: any =
    await fetchEngagement(graphId, pageAccessToken) ||
    await fetchEngagement(postId, pageAccessToken);

  if (!eng) {
    // Last resort: resolve URL to object ID and retry
    const urlResolved = await resolveUrlToObjectId(resolvedUrl, pageAccessToken);
    if (urlResolved && urlResolved !== postId) {
      eng =
        await fetchEngagement(`${pageId}_${urlResolved}`, pageAccessToken) ||
        await fetchEngagement(urlResolved, pageAccessToken);
    }
  }

  if (!eng)
    throw new Error(
      `Could not fetch metrics for post ${postId} (page ${pageId}). ` +
      `Check that the System User Token has 'pages_read_engagement' permission and the Page ID is correct.`
    );

  let views = 0;
  const fbViewMetrics = [
    "post_impressions_unique",
    "post_impressions",
    "post_video_views",
    "post_video_complete_views_organic",
  ];
  // Try insights with graphId first, then bare postId as fallback
  const insightIds = [graphId, postId].filter((v, i, a) => a.indexOf(v) === i);
  outer: for (const insightId of insightIds) {
    for (const metric of fbViewMetrics) {
      try {
        const insightUrl = new URL(`${META_GRAPH_API}/${insightId}/insights`);
        insightUrl.searchParams.set("metric", metric);
        insightUrl.searchParams.set("access_token", pageAccessToken);
        const insightRes = await fetch(insightUrl.toString());
        const insightData = await insightRes.json();
        if (insightData.error) {
          console.warn(`FB insight [${insightId}] "${metric}" error: ${insightData.error.message}`);
          continue;
        }
        const found = (insightData.data || []).find((d: any) => d.name === metric);
        const val = found?.values?.[0]?.value ?? found?.value ?? 0;
        if (val > 0) { views = val; break outer; }
      } catch {}
    }
  }

  return {
    views,
    likes:
      eng?.reactions?.summary?.total_count ??
      eng?.likes?.summary?.total_count ??
      0,
    comments: eng?.comments?.summary?.total_count ?? 0,
    shares: eng?.shares?.count ?? 0,
    followers_gained: 0,
  };
}

async function resolveIgMediaId(
  permalink: string,
  igAccountId: string,
  accessToken: string,
): Promise<{ id: string | null; failReason: string }> {
  const normalised = permalink.replace(/\/$/, "").toLowerCase().trim();
  const shortcodeMatch = permalink.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
  // Keep original case — Instagram shortcodes are case-sensitive (base64). Compare lowercased separately.
  const shortcode = shortcodeMatch?.[1] || null;
  const shortcodeLower = shortcode?.toLowerCase() || null;

  console.log(`[IG resolve] Looking for: "${normalised}" | shortcode: "${shortcode}" | igAccountId: ${igAccountId}`);

  // Search through account media
  let after: string | null = null;
  let totalScanned = 0;
  let apiError = "";
  let firstItemPermalink = "";

  for (let page = 0; page < 20; page++) {
    const url = new URL(`${META_GRAPH_API}/${igAccountId}/media`);
    url.searchParams.set("fields", "id,permalink,media_type");
    url.searchParams.set("limit", "100");
    url.searchParams.set("access_token", accessToken);
    if (after) url.searchParams.set("after", after);

    const res = await fetch(url.toString());
    const data = await res.json();

    if (!res.ok || data.error) {
      const code = data.error?.code;
      const msg = data.error?.message || `HTTP ${res.status}`;
      apiError = code === 190
        ? "Access token expired — regenerate the System User Token in Meta Business Suite."
        : code === 10 || code === 200
        ? `Token missing 'instagram_basic' permission — regenerate System User Token and select instagram_basic.`
        : code === 100
        ? `Instagram account ID ${igAccountId} not accessible — check igAccountId in the Social Tokens tab.`
        : msg;
      console.warn(`[IG resolve] media API failed: ${msg} (code ${code})`);
      break;
    }

    const items = data.data || [];
    if (totalScanned === 0 && items[0]?.permalink) {
      firstItemPermalink = items[0].permalink;
      console.log(`[IG resolve] First item in feed: "${firstItemPermalink}"`);
    }
    totalScanned += items.length;

    for (const item of items) {
      // Normalise item permalink the same way (lowercase, no trailing slash)
      const itemPermalink = (item.permalink || "").replace(/\/$/, "").toLowerCase().trim();
      // Extract shortcode from item permalink (already lowercased)
      const itemShortcodeMatch = itemPermalink.match(/instagram\.com\/(?:p|reel|tv)\/([a-z0-9_-]+)/);
      const itemShortcode = itemShortcodeMatch?.[1] || null;

      const exactMatch = itemPermalink === normalised;
      // Compare shortcodes in lowercase — shortcodes are case-sensitive but lowercasing both is safe for matching
      const shortcodeHit = shortcodeLower && itemShortcode && itemShortcode === shortcodeLower;
      if (exactMatch || shortcodeHit) {
        console.log(`[IG resolve] Found! id=${item.id} permalink="${item.permalink}" (exact=${exactMatch} shortcode=${shortcodeHit})`);
        return { id: item.id, failReason: "" };
      }
    }

    after = data.paging?.cursors?.after;
    if (!after) break;
  }

  console.warn(`[IG resolve] Not found after ${totalScanned} items. Searching for: "${normalised}" | First item was: "${firstItemPermalink}"`);

  const failReason = apiError ||
    (totalScanned > 0
      ? `Post not found after scanning ${totalScanned} items — it may be a collab post or belong to a different account.`
      : "No media returned from API.");

  return { id: null, failReason };
}

export interface LeadAdForm {
  id: string;
  name: string;
  status: string;
  created_time: string;
  leads_count?: number;
}

export interface FbLeadField {
  name: string;
  values: string[];
}

export interface FbLead {
  id: string;
  created_time: string;
  field_data: FbLeadField[];
}

export async function getLeadAdForms(
  _adAccountId: string,
  accessToken: string,
): Promise<LeadAdForm[]> {
  let pages: MetaPage[] = [];
  try {
    pages = await getUserPages(accessToken);
  } catch (e: any) {
    throw new Error(
      `Could not fetch Facebook Pages: ${e.message}. Make sure the token has pages_show_list permission.`,
    );
  }

  if (pages.length === 0) {
    throw new Error(
      "No Facebook Pages found for this token. The token must belong to a user who manages at least one Page.",
    );
  }

  const allForms: (LeadAdForm & { pageName?: string })[] = [];

  for (const page of pages) {
    const pageToken = page.access_token || accessToken;
    const url = new URL(`${META_GRAPH_API}/${page.id}/leadgen_forms`);
    url.searchParams.set("fields", "id,name,status,created_time,leads_count");
    url.searchParams.set("access_token", pageToken);

    try {
      const res = await fetch(url.toString());
      const data = await res.json();
      if (!data.error && Array.isArray(data.data)) {
        for (const form of data.data) {
          allForms.push({ ...form, pageName: page.name });
        }
      }
    } catch {}
  }

  return allForms;
}

export async function getFormLeads(
  formId: string,
  accessToken: string,
  since?: number,
): Promise<FbLead[]> {
  const leads: FbLead[] = [];
  const initialUrl = new URL(`${META_GRAPH_API}/${formId}/leads`);
  initialUrl.searchParams.set("fields", "id,created_time,field_data");
  initialUrl.searchParams.set("limit", "100");
  initialUrl.searchParams.set("access_token", accessToken);
  if (since) {
    initialUrl.searchParams.set(
      "filtering",
      JSON.stringify([
        { field: "time_created", operator: "GREATER_THAN", value: since },
      ]),
    );
  }

  let nextUrl: string | null = initialUrl.toString();
  while (nextUrl) {
    const url = nextUrl;

    const response: Response = await fetch(url);
    if (!response.ok) break;

    const pageData: {
      data?: FbLead[];
      error?: unknown;
      paging?: { next?: string };
    } = await response.json();
    if (pageData.error) break;
    leads.push(...(pageData.data || []));
    nextUrl = pageData.paging?.next || null;
  }
  return leads;
}

export function hashForMeta(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export interface ConversionEvent {
  event_name: string;
  event_time: number;
  hashed_email?: string;
  hashed_phone?: string;
  lead_id?: string;
  lead_event_source?: string;
}

export async function sendConversionEvents(
  datasetId: string,
  accessToken: string,
  events: ConversionEvent[],
): Promise<any> {
  const url = `https://graph.facebook.com/v25.0/${datasetId}/events`;
  const payload = {
    access_token: accessToken,
    data: events.map((e) => ({
      action_source: "system_generated",
      event_name: e.event_name,
      event_time: e.event_time,
      custom_data: {
        event_source: "crm",
        lead_event_source: e.lead_event_source || "Pixelate CRM",
      },
      user_data: {
        ...(e.hashed_email ? { em: [e.hashed_email] } : {}),
        ...(e.hashed_phone ? { ph: [e.hashed_phone] } : {}),
        ...(e.lead_id ? { lead_id: e.lead_id } : {}),
      },
    })),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  if (!res.ok)
    throw new Error(`Conversions API error: ${JSON.stringify(result)}`);
  return result;
}

export async function fetchIgMediaMetrics(
  postUrl: string,
  igAccountId: string,
  accessToken: string,
): Promise<MetaPostMetrics> {
  const { id: mediaId, failReason } = await resolveIgMediaId(postUrl, igAccountId, accessToken);
  if (!mediaId) {
    console.warn(`[IG sync] Skipping post — ${failReason}`);
    return { views: 0, likes: 0, comments: 0, shares: 0, followers_gained: 0, skipped: true, skipReason: failReason } as any;
  }

  // Fetch basic media info including media_type to pick correct insight metrics
  const mediaUrl = new URL(`${META_GRAPH_API}/${mediaId}`);
  mediaUrl.searchParams.set("fields", "id,like_count,comments_count,media_type,media_product_type,permalink,video_view_count");
  mediaUrl.searchParams.set("access_token", accessToken);

  const mediaRes = await fetch(mediaUrl.toString());
  if (!mediaRes.ok)
    throw new Error(`Failed to fetch IG media: ${await mediaRes.text()}`);
  const media = await mediaRes.json();
  if (media.error) throw new Error(`IG media error: ${media.error.message}`);

  const mediaType: string = media.media_type || "IMAGE";
  const mediaProductType: string = media.media_product_type || "";
  const isReel = mediaType === "VIDEO" || mediaProductType === "REELS" || postUrl.includes("/reel/");

  let views = 0;
  let shares = 0;
  let followers_gained = 0;
  let insightError = "";

  // For Reels: "plays" = total play count (correct view metric in v19.0)
  // ig_reels_video_view_total_time is watch-time in ms — NOT a view count
  // For Images: "impressions" = total times shown (correct view metric)
  const viewMetrics = isReel
    ? ["plays", "video_views", "impressions", "reach"]
    : ["impressions", "reach"];
  const extraMetrics = ["shares", "saved"];

  async function fetchInsight(metric: string): Promise<number> {
    try {
      const url = new URL(`${META_GRAPH_API}/${mediaId}/insights`);
      url.searchParams.set("metric", metric);
      url.searchParams.set("access_token", accessToken);
      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.error) {
        const code = data.error.code;
        // code 100 = unsupported metric — log at debug level, not warn
        if (code === 100) {
          console.log(`[IG insights] metric "${metric}" unsupported for ${mediaId}, trying next`);
        } else {
          insightError = data.error.message;
          console.warn(`[IG insights] error for "${metric}" on ${mediaId}: ${data.error.message}`);
        }
        return 0;
      }
      const item = (data.data || []).find((d: any) => d.name === metric);
      return item?.values?.[0]?.value ?? item?.value ?? 0;
    } catch {
      return 0;
    }
  }

  // Try view metrics one by one until we get a non-zero value
  for (const metric of viewMetrics) {
    const val = await fetchInsight(metric);
    if (val > 0) { views = val; break; }
  }
  // Last resort: video_view_count directly on the media object
  if (views === 0 && media.video_view_count) {
    views = media.video_view_count;
  }
  shares = await fetchInsight("shares");

  return {
    views,
    likes: media.like_count ?? 0,
    comments: media.comments_count ?? 0,
    shares,
    followers_gained,
  };
}
