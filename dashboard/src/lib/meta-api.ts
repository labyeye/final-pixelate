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
    const normalizedUrl =
      postUrl.startsWith("http://") || postUrl.startsWith("https://")
        ? postUrl
        : `https://${postUrl}`;
    const u = new URL(normalizedUrl);
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

    const pathMatch = pathname.match(
      /\/[^/]+\/(posts|videos|photos|notes)\/([^/?]+)/,
    );
    if (pathMatch) return { postId: pathMatch[2], pageId: null };
  } catch {}
  return { postId: null, pageId: null };
}

async function resolveShareUrl(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "User-Agent": "facebookexternalhit/1.1" },
    });
    const resolved = res.url;

    if (resolved && !resolved.includes("/share/") && resolved !== url) {
      return resolved;
    }
  } catch {}
  return url;
}

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
  const resolvedUrl = postUrl.includes("/share/")
    ? await resolveShareUrl(postUrl)
    : postUrl;

  let { postId } = parseFbPostId(resolvedUrl);
  if (!postId)
    throw new Error(
      `Could not extract post ID from URL: ${postUrl}. ` +
        `Please use the direct post URL from your Facebook Page ` +
        `(e.g. facebook.com/YourPage/posts/123456789) instead of a share link.`,
    );

  const isPfbid = postId.startsWith("pfbid") || !/^\d+$/.test(postId);
  if (isPfbid) {
    const byUrl = await resolveUrlToObjectId(resolvedUrl, pageAccessToken);
    if (byUrl) {
      postId = byUrl;
    } else {
      const byFeed = await resolveViaPagePosts(pageId, postId, pageAccessToken);
      if (byFeed) postId = byFeed;
    }
  }

  const engFields = [
    "id,reactions.summary(true).limit(0),likes.summary(true).limit(0),comments.summary(true).limit(0),shares",
    "id,reactions.summary(true).limit(0),likes.summary(true).limit(0),comments.summary(true).limit(0)",
    "id,likes.summary(true).limit(0),comments.summary(true).limit(0)",
  ];

  async function fetchEngagement(
    id: string,
    token: string,
  ): Promise<any | null> {
    for (const fields of engFields) {
      const url = new URL(`${META_GRAPH_API}/${id}`);
      url.searchParams.set("fields", fields);
      url.searchParams.set("access_token", token);
      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.error) {
        const code = data.error.code;
        const subcode = data.error.error_subcode;
        console.warn(
          `FB engagement error for ${id}: ${data.error.message} (code ${code}, subcode ${subcode})`,
        );

        if (code === 190) {
          throw new Error(
            `Facebook access token has expired. Go to the client's Social Tokens tab and click "Connect Facebook" to get a new token.`,
          );
        }

        if (code === 10 || code === 100) continue;

        break;
      }
      if (res.ok) return data;
    }
    return null;
  }

  const graphId = `${pageId}_${postId}`;
  console.log(
    `[FB metrics] postUrl=${postUrl} postId=${postId} graphId=${graphId}`,
  );

  let eng: any =
    (await fetchEngagement(graphId, pageAccessToken)) ||
    (await fetchEngagement(postId, pageAccessToken));

  if (!eng) {
    const urlResolved = await resolveUrlToObjectId(
      resolvedUrl,
      pageAccessToken,
    );
    if (urlResolved && urlResolved !== postId) {
      eng =
        (await fetchEngagement(`${pageId}_${urlResolved}`, pageAccessToken)) ||
        (await fetchEngagement(urlResolved, pageAccessToken));
    }
  }

  if (!eng)
    throw new Error(
      `Could not fetch metrics for post ${postId} (page ${pageId}). ` +
        `Check that the System User Token has 'pages_read_engagement' permission and the Page ID is correct.`,
    );

  let views = 0;
  const fbViewMetrics = [
    "post_impressions_unique",
    "post_impressions",
    "post_video_views",
    "post_video_complete_views_organic",
  ];

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
          console.warn(
            `FB insight [${insightId}] "${metric}" error: ${insightData.error.message}`,
          );
          continue;
        }
        const found = (insightData.data || []).find(
          (d: any) => d.name === metric,
        );
        const val = found?.values?.[0]?.value ?? found?.value ?? 0;
        if (val > 0) {
          views = val;
          break outer;
        }
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

export async function publishInstagramPost(
  igAccountId: string,
  accessToken: string,
  caption: string,
  mediaUrl: string,
  mediaType: "IMAGE" | "REELS" | "VIDEO" = "IMAGE",
): Promise<{ id: string; permalink: string }> {
  const containerUrl = new URL(`${META_GRAPH_API}/${igAccountId}/media`);
  containerUrl.searchParams.set("caption", caption);
  containerUrl.searchParams.set("access_token", accessToken);

  if (mediaType === "REELS" || mediaType === "VIDEO") {
    containerUrl.searchParams.set("video_url", mediaUrl);
    containerUrl.searchParams.set("media_type", "REELS");
  } else {
    containerUrl.searchParams.set("image_url", mediaUrl);
  }

  const containerRes = await fetch(containerUrl.toString(), { method: "POST" });
  const containerData = await containerRes.json();

  if (!containerRes.ok || containerData.error) {
    throw new Error(
      `IG Container Creation Failed: ${containerData.error?.message || containerRes.statusText}`,
    );
  }

  const containerId = containerData.id;

  let ready = false;
  let attempts = 0;
  while (!ready && attempts < 24) {
    attempts++;
    const statusUrl = new URL(`${META_GRAPH_API}/${containerId}`);
    statusUrl.searchParams.set("fields", "status_code,status");
    statusUrl.searchParams.set("access_token", accessToken);

    const statusRes = await fetch(statusUrl.toString());
    const statusData = await statusRes.json();

    if (statusData.status_code === "FINISHED") {
      ready = true;
    } else if (statusData.status_code === "ERROR") {
      throw new Error(
        `IG Media Processing Failed: ${statusData.status || statusData.error_message || "Unknown error"}`,
      );
    } else {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  if (!ready) {
    throw new Error(
      `IG Media Processing Timeout: Video (container ${containerId}) still processing after 2 minutes. Instagram pe bada ya unoptimized video hai — compress karke dobara try karein.`,
    );
  }

  const publishUrl = new URL(`${META_GRAPH_API}/${igAccountId}/media_publish`);
  publishUrl.searchParams.set("creation_id", containerId);
  publishUrl.searchParams.set("access_token", accessToken);

  const publishRes = await fetch(publishUrl.toString(), { method: "POST" });
  const publishData = await publishRes.json();

  if (!publishRes.ok || publishData.error) {
    throw new Error(
      `IG Publishing Failed: ${publishData.error?.message || publishRes.statusText}`,
    );
  }

  // Instagram sometimes needs a moment before the permalink is available
  const permalink = await fetchIgPermalink(publishData.id, accessToken);

  return { id: publishData.id, permalink };
}

async function fetchIgPermalink(
  mediaId: string,
  accessToken: string,
): Promise<string> {
  for (let attempt = 0; attempt < 4; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, 3000));
    try {
      const url = new URL(`${META_GRAPH_API}/${mediaId}`);
      url.searchParams.set("fields", "permalink,shortcode,media_type");
      url.searchParams.set("access_token", accessToken);
      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.permalink) return data.permalink;
      // Fallback: construct from shortcode
      if (data.shortcode) {
        const type = data.media_type === "VIDEO" ? "reel" : "p";
        return `https://www.instagram.com/${type}/${data.shortcode}/`;
      }
    } catch {}
  }
  return "";
}

export async function publishFacebookPost(
  pageId: string,
  pageToken: string,
  caption: string,
  mediaUrl?: string,
  mediaType: "IMAGE" | "VIDEO" | "REEL" = "IMAGE",
): Promise<{ id: string; permalink: string }> {
  let token = pageToken;
  try {
    const ptUrl = new URL(`${META_GRAPH_API}/${pageId}`);
    ptUrl.searchParams.set("fields", "access_token");
    ptUrl.searchParams.set("access_token", pageToken);
    const ptRes = await fetch(ptUrl.toString());
    const ptData = await ptRes.json();
    if (ptData.access_token) token = ptData.access_token;
  } catch {}

  const isVideo =
    mediaUrl != null &&
    (mediaType === "VIDEO" ||
      mediaType === "REEL" ||
      /\.(mp4|mov|avi|mkv|webm|m4v)(\?|$)/i.test(mediaUrl));

  let endpoint: string;
  const params: Record<string, string> = { access_token: token };

  if (!mediaUrl) {
    endpoint = `${META_GRAPH_API}/${pageId}/feed`;
    params.message = caption;
  } else if (isVideo) {
    // /videos endpoint uses 'description', not 'message'
    endpoint = `${META_GRAPH_API}/${pageId}/videos`;
    params.file_url = mediaUrl;
    params.description = caption;
  } else {
    // /photos endpoint uses 'caption', not 'message'
    endpoint = `${META_GRAPH_API}/${pageId}/photos`;
    params.url = mediaUrl;
    params.caption = caption;
  }

  const url = new URL(endpoint);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), { method: "POST" });
  const data = await res.json();

  if (!res.ok || data.error) {
    const errMsg = data.error?.message || res.statusText;
    const errDetail = data.error?.code ? ` [code ${data.error.code}${data.error.error_subcode ? `/${data.error.error_subcode}` : ""}]` : "";
    throw new Error(`FB Publishing Failed: ${errMsg}${errDetail}`);
  }

  console.log(`[FB publish] endpoint=${endpoint} response:`, JSON.stringify({ id: data.id, post_id: data.post_id }));

  // /photos returns data.id = photo node ID AND data.post_id = actual feed post ID.
  // /videos returns data.id = video ID.
  // /feed returns data.id = {page_id}_{post_id} composite.
  // Prefer post_id (the actual timeline post) over id (the asset node).
  const rawId: string = String(data.id || "");
  const postId: string = String(data.post_id || data.id || "");
  const permalink = await fetchFbPermalink(postId, pageId, isVideo, token);

  return { id: rawId, permalink };
}

async function fetchFbPermalink(
  rawId: string,
  pageId: string,
  isVideo: boolean,
  token: string,
): Promise<string> {
  if (!rawId) {
    console.warn("[FB permalink] rawId is empty, using fallback");
    return `https://www.facebook.com/${pageId}`;
  }

  // If rawId already has underscore (composite page_id_post_id), jump straight to Step 2.
  // Step 1: for photos/videos (rawId has no underscore → it's an asset node ID, not a post ID).
  if (!rawId.includes("_")) {
    try {
      const lookupUrl = new URL(`${META_GRAPH_API}/${rawId}`);
      lookupUrl.searchParams.set("fields", "post_id,permalink_url,link");
      lookupUrl.searchParams.set("access_token", token);
      const r = await fetch(lookupUrl.toString());
      const d = await r.json();
      console.log(`[FB permalink] lookup /${rawId}:`, JSON.stringify({ post_id: d.post_id, permalink_url: d.permalink_url, link: d.link }));

      if (d.permalink_url) return d.permalink_url;

      // post_id is the actual timeline post in {page_id}_{post_id} format
      if (d.post_id) {
        const postLookup = new URL(`${META_GRAPH_API}/${d.post_id}`);
        postLookup.searchParams.set("fields", "permalink_url");
        postLookup.searchParams.set("access_token", token);
        const pr = await fetch(postLookup.toString());
        const pd = await pr.json();
        console.log(`[FB permalink] post_id lookup /${d.post_id}:`, JSON.stringify({ permalink_url: pd.permalink_url }));
        if (pd.permalink_url) return pd.permalink_url;
        // Construct from post_id which is "{page_id}_{suffix}"
        const suffix = String(d.post_id).includes("_")
          ? String(d.post_id).split("_")[1]
          : d.post_id;
        return `https://www.facebook.com/permalink.php?story_fbid=${suffix}&id=${pageId}`;
      }

      // Try composite with pageId
      const compositeId = `${pageId}_${rawId}`;
      const compUrl = new URL(`${META_GRAPH_API}/${compositeId}`);
      compUrl.searchParams.set("fields", "permalink_url");
      compUrl.searchParams.set("access_token", token);
      const cr = await fetch(compUrl.toString());
      const cd = await cr.json();
      console.log(`[FB permalink] composite lookup /${compositeId}:`, JSON.stringify({ permalink_url: cd.permalink_url }));
      if (cd.permalink_url) return cd.permalink_url;
    } catch (e: any) {
      console.warn("[FB permalink] lookup threw:", e?.message);
    }

    // Fallback: best-effort URLs per content type
    if (isVideo) return `https://www.facebook.com/${pageId}/videos/${rawId}/`;
    return `https://www.facebook.com/photo/?fbid=${rawId}&set=a.${rawId}`;
  }

  // Step 2: rawId already contains underscore → it's a composite post ID like "{page_id}_{post_id}"
  try {
    const postUrl = new URL(`${META_GRAPH_API}/${rawId}`);
    postUrl.searchParams.set("fields", "permalink_url");
    postUrl.searchParams.set("access_token", token);
    const r = await fetch(postUrl.toString());
    const d = await r.json();
    console.log(`[FB permalink] composite /${rawId}:`, JSON.stringify({ permalink_url: d.permalink_url }));
    if (d.permalink_url) return d.permalink_url;
  } catch (e: any) {
    console.warn("[FB permalink] composite threw:", e?.message);
  }

  // Fallback from composite ID: extract the numeric suffix for permalink.php
  const parts = rawId.split("_");
  const suffix = parts.length >= 2 ? parts.slice(1).join("_") : rawId;
  const pid = parts[0] || pageId;
  return `https://www.facebook.com/permalink.php?story_fbid=${suffix}&id=${pid}`;
}

async function resolveIgMediaId(
  permalink: string,
  igAccountId: string,
  accessToken: string,
): Promise<{ id: string | null; failReason: string }> {
  const normalised = permalink.replace(/\/$/, "").toLowerCase().trim();
  const shortcodeMatch = permalink.match(
    /instagram\.com\/(?:p|reels?|tv)\/([A-Za-z0-9_-]+)/,
  );

  const shortcode = shortcodeMatch?.[1] || null;
  const shortcodeLower = shortcode?.toLowerCase() || null;

  console.log(
    `[IG resolve] Looking for: "${normalised}" | shortcode: "${shortcode}" | igAccountId: ${igAccountId}`,
  );

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
      apiError =
        code === 190
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
      const itemPermalink = (item.permalink || "")
        .replace(/\/$/, "")
        .toLowerCase()
        .trim();

      const itemShortcodeMatch = itemPermalink.match(
        /instagram\.com\/(?:p|reels?|tv)\/([a-z0-9_-]+)/,
      );
      const itemShortcode = itemShortcodeMatch?.[1] || null;

      const exactMatch = itemPermalink === normalised;

      const shortcodeHit =
        shortcodeLower && itemShortcode && itemShortcode === shortcodeLower;
      if (exactMatch || shortcodeHit) {
        console.log(
          `[IG resolve] Found! id=${item.id} permalink="${item.permalink}" (exact=${exactMatch} shortcode=${shortcodeHit})`,
        );
        return { id: item.id, failReason: "" };
      }
    }

    after = data.paging?.cursors?.after;
    if (!after) break;
  }

  console.warn(
    `[IG resolve] Not found after ${totalScanned} items. Searching for: "${normalised}" | First item was: "${firstItemPermalink}"`,
  );

  const failReason =
    apiError ||
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
  const { id: mediaId, failReason } = await resolveIgMediaId(
    postUrl,
    igAccountId,
    accessToken,
  );
  if (!mediaId) {
    console.warn(`[IG sync] Skipping post — ${failReason}`);
    return {
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      followers_gained: 0,
      skipped: true,
      skipReason: failReason,
    } as any;
  }

  const mediaUrl = new URL(`${META_GRAPH_API}/${mediaId}`);
  mediaUrl.searchParams.set(
    "fields",
    "id,like_count,comments_count,media_type,permalink",
  );
  mediaUrl.searchParams.set("access_token", accessToken);

  const mediaRes = await fetch(mediaUrl.toString());
  if (!mediaRes.ok)
    throw new Error(`Failed to fetch IG media: ${await mediaRes.text()}`);
  const media = await mediaRes.json();
  if (media.error) throw new Error(`IG media error: ${media.error.message}`);

  const mediaType: string = media.media_type || "IMAGE";
  const isReel = mediaType === "VIDEO" || postUrl.includes("/reel/");

  let views = 0;
  let shares = 0;
  let followers_gained = 0;

  const viewMetrics = isReel
    ? ["ig_reels_video_view_total_count", "reach", "plays"]
    : ["reach", "total_interactions"];

  async function fetchInsight(metric: string): Promise<number> {
    try {
      const url = new URL(`${META_GRAPH_API}/${mediaId}/insights`);
      url.searchParams.set("metric", metric);
      url.searchParams.set("access_token", accessToken);
      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.error) {
        const code = data.error.code;

        if (code === 100) {
          console.log(
            `[IG insights] metric "${metric}" unsupported for ${mediaId}, trying next`,
          );
        } else {
          console.warn(
            `[IG insights] error for "${metric}" on ${mediaId}: ${data.error.message}`,
          );
        }
        return 0;
      }
      const item = (data.data || []).find((d: any) => d.name === metric);
      return item?.values?.[0]?.value ?? item?.value ?? 0;
    } catch {
      return 0;
    }
  }

  for (const metric of viewMetrics) {
    const val = await fetchInsight(metric);
    if (val > 0) {
      views = val;
      break;
    }
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
