import { createHash } from "node:crypto";

const META_GRAPH_API = "https://graph.facebook.com/v19.0";

export type MetaPostMetrics = {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  followers_gained: number;
};

export async function exchangeForLongLivedToken(shortToken: string): Promise<string> {
  const url = new URL(`${META_GRAPH_API}/oauth/access_token`);
  url.searchParams.set("grant_type", "fb_exchange_token");
  url.searchParams.set("client_id", process.env.FACEBOOK_APP_ID!);
  url.searchParams.set("client_secret", process.env.FACEBOOK_APP_SECRET!);
  url.searchParams.set("fb_exchange_token", shortToken);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Token exchange failed: ${await res.text()}`);
  const data = await res.json();
  if (!data.access_token) throw new Error("No access_token in exchange response");
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

export async function getUserPages(longLivedToken: string): Promise<MetaPage[]> {
  const url = new URL(`${META_GRAPH_API}/me/accounts`);
  url.searchParams.set("fields", "id,name,access_token,instagram_business_account");
  url.searchParams.set("access_token", longLivedToken);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to get pages: ${await res.text()}`);
  const data = await res.json();
  return data.data || [];
}

export async function getPageDetails(pageId: string, pageToken: string): Promise<Pick<MetaPage, "id" | "name" | "link" | "username">> {
  const url = new URL(`${META_GRAPH_API}/${pageId}`);
  url.searchParams.set("fields", "id,name,link,username");
  url.searchParams.set("access_token", pageToken);

  const res = await fetch(url.toString());
  if (!res.ok) return { id: pageId, name: pageId };
  return res.json();
}


export function parseFbPostId(postUrl: string): { postId: string | null; pageId: string | null } {
  try {
    const u = new URL(postUrl);
    const pathname = u.pathname;

    
    const reelMatch = pathname.match(/\/reel\/(\d+)/);
    if (reelMatch) return { postId: reelMatch[1], pageId: null };

    
    const fbid = u.searchParams.get("fbid");
    const pageIdFromQuery = u.searchParams.get("id");
    if (fbid && pathname.includes("photo")) return { postId: fbid, pageId: pageIdFromQuery };

    
    const storyFbid = u.searchParams.get("story_fbid");
    if (storyFbid) return { postId: storyFbid, pageId: pageIdFromQuery };

    
    const videoId = u.searchParams.get("v");
    if (videoId) return { postId: videoId, pageId: null };

    
    const pathMatch = pathname.match(/\/[^/]+\/(posts|videos|photos|notes)\/([^/?]+)/);
    if (pathMatch) return { postId: pathMatch[2], pageId: null };

  } catch {
    
  }
  return { postId: null, pageId: null };
}

export async function fetchFbPostMetrics(
  postUrl: string,
  pageId: string,
  pageAccessToken: string,
): Promise<MetaPostMetrics> {
  const { postId } = parseFbPostId(postUrl);
  if (!postId) throw new Error("Could not extract post ID from URL: " + postUrl);

  const graphId = `${pageId}_${postId}`;

  
  const engUrl = new URL(`${META_GRAPH_API}/${graphId}`);
  engUrl.searchParams.set(
    "fields",
    "id,reactions.summary(true).limit(0),likes.summary(true).limit(0),comments.summary(true).limit(0),shares",
  );
  engUrl.searchParams.set("access_token", pageAccessToken);

  let eng: any = null;
  const engRes = await fetch(engUrl.toString());
  if (engRes.ok) {
    eng = await engRes.json();
  } else {
    
    const fallbackUrl = new URL(`${META_GRAPH_API}/${postId}`);
    fallbackUrl.searchParams.set(
      "fields",
      "id,reactions.summary(true).limit(0),likes.summary(true).limit(0),comments.summary(true).limit(0),shares",
    );
    fallbackUrl.searchParams.set("access_token", pageAccessToken);
    const fbRes = await fetch(fallbackUrl.toString());
    if (!fbRes.ok) throw new Error(`Failed to fetch post metrics: ${await fbRes.text()}`);
    eng = await fbRes.json();
  }

  
  let views = 0;
  try {
    const insightUrl = new URL(`${META_GRAPH_API}/${graphId}/insights`);
    insightUrl.searchParams.set("metric", "post_impressions_unique");
    insightUrl.searchParams.set("access_token", pageAccessToken);
    const insightRes = await fetch(insightUrl.toString());
    if (insightRes.ok) {
      const insightData = await insightRes.json();
      const metric = (insightData.data || []).find((d: any) => d.name === "post_impressions_unique");
      views = metric?.values?.[0]?.value ?? metric?.value ?? 0;
    }
  } catch {
    
  }

  return {
    views,
    likes: eng?.reactions?.summary?.total_count ?? eng?.likes?.summary?.total_count ?? 0,
    comments: eng?.comments?.summary?.total_count ?? 0,
    shares: eng?.shares?.count ?? 0,
    followers_gained: 0, 
  };
}

async function resolveIgMediaId(
  permalink: string,
  igAccountId: string,
  accessToken: string,
): Promise<string | null> {
  
  try {
    const oembedUrl = new URL(`${META_GRAPH_API}/instagram_oembed`);
    oembedUrl.searchParams.set("url", permalink);
    oembedUrl.searchParams.set("access_token", accessToken);
    const oembedRes = await fetch(oembedUrl.toString());
    if (oembedRes.ok) {
      const data = await oembedRes.json();
      if (data.media_id) return data.media_id;
    }
  } catch {
    
  }

  
  const normalised = permalink.replace(/\/$/, "").toLowerCase();
  let after: string | null = null;

  for (let page = 0; page < 3; page++) {
    const url = new URL(`${META_GRAPH_API}/${igAccountId}/media`);
    url.searchParams.set("fields", "id,permalink");
    url.searchParams.set("limit", "50");
    url.searchParams.set("access_token", accessToken);
    if (after) url.searchParams.set("after", after);

    const res = await fetch(url.toString());
    if (!res.ok) break;
    const data = await res.json();

    for (const item of data.data || []) {
      if ((item.permalink || "").replace(/\/$/, "").toLowerCase() === normalised) {
        return item.id;
      }
    }

    after = data.paging?.cursors?.after;
    if (!after) break;
  }

  return null;
}

// ─── Lead Ads ──────────────────────────────────────────────────────────────

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
  id: string; // 15–17 digit Meta lead ID
  created_time: string;
  field_data: FbLeadField[];
}

/** List all Lead Ad forms under an Ad Account (e.g. act_123456789) */
export async function getLeadAdForms(
  adAccountId: string,
  accessToken: string,
): Promise<LeadAdForm[]> {
  // Ensure act_ prefix
  const accountId = adAccountId.startsWith("act_") ? adAccountId : `act_${adAccountId}`;
  const url = new URL(`${META_GRAPH_API}/${accountId}/leadgen_forms`);
  url.searchParams.set("fields", "id,name,status,created_time,leads_count");
  url.searchParams.set("access_token", accessToken);

  let rawText = "";
  try {
    const res = await fetch(url.toString());
    rawText = await res.text();
    const data = JSON.parse(rawText);
    if (data.error) {
      // Return friendly FB error: code + message
      const fbMsg = data.error.message || JSON.stringify(data.error);
      const fbCode = data.error.code ? ` (code ${data.error.code})` : "";
      throw new Error(`Facebook API: ${fbMsg}${fbCode}`);
    }
    return data.data || [];
  } catch (e: any) {
    // Re-throw FB errors as-is; wrap unexpected errors
    if (e.message?.startsWith("Facebook API:")) throw e;
    throw new Error(`Failed to fetch lead forms: ${rawText || e.message}`);
  }
}

/** Fetch all leads from a specific Lead Ad form (handles pagination) */
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
      JSON.stringify([{ field: "time_created", operator: "GREATER_THAN", value: since }]),
    );
  }

  let nextUrl: string | null = initialUrl.toString();
  while (nextUrl) {
    const url = nextUrl;
    // eslint-disable-next-line no-await-in-loop
    const response: Response = await fetch(url);
    if (!response.ok) break;
    // eslint-disable-next-line no-await-in-loop
    const pageData: { data?: FbLead[]; error?: unknown; paging?: { next?: string } } = await response.json();
    if (pageData.error) break;
    leads.push(...(pageData.data || []));
    nextUrl = pageData.paging?.next || null;
  }
  return leads;
}

// ─── Conversions API (Conversion Leads) ────────────────────────────────────

/** SHA-256 hash a value (lowercase+trim) as required by Meta */
export function hashForMeta(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export interface ConversionEvent {
  event_name: string;       // e.g. "Lead", "interested", "meeting booked"
  event_time: number;       // Unix timestamp
  hashed_email?: string;    // already SHA-256 hashed
  hashed_phone?: string;    // already SHA-256 hashed
  lead_id?: string;         // Meta's lead ID stored on the lead
  lead_event_source?: string;
}

/**
 * Send CRM stage-change events to Meta's Conversions API.
 * datasetId comes from the client's fbAdsConnections.datasetId field.
 */
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
  if (!res.ok) throw new Error(`Conversions API error: ${JSON.stringify(result)}`);
  return result;
}

// ─── Instagram metrics ──────────────────────────────────────────────────────

export async function fetchIgMediaMetrics(
  postUrl: string,
  igAccountId: string,
  accessToken: string,
): Promise<MetaPostMetrics> {
  const mediaId = await resolveIgMediaId(postUrl, igAccountId, accessToken);
  if (!mediaId) throw new Error("Could not find Instagram media for this URL");

  
  const mediaUrl = new URL(`${META_GRAPH_API}/${mediaId}`);
  mediaUrl.searchParams.set("fields", "id,like_count,comments_count,permalink");
  mediaUrl.searchParams.set("access_token", accessToken);

  const mediaRes = await fetch(mediaUrl.toString());
  if (!mediaRes.ok) throw new Error(`Failed to fetch IG media: ${await mediaRes.text()}`);
  const media = await mediaRes.json();

  let views = 0;
  let shares = 0;
  let followers_gained = 0;

  try {
    const insightUrl = new URL(`${META_GRAPH_API}/${mediaId}/insights`);
    insightUrl.searchParams.set("metric", "impressions,reach,shares,follows");
    insightUrl.searchParams.set("access_token", accessToken);
    const insightRes = await fetch(insightUrl.toString());
    if (insightRes.ok) {
      const insightData = await insightRes.json();
      for (const item of insightData.data || []) {
        const val = item.values?.[0]?.value ?? item.value ?? 0;
        if (item.name === "impressions") views = val;
        if (item.name === "shares") shares = val;
        if (item.name === "follows") followers_gained = val;
      }
    }
  } catch {
    
  }

  return {
    views,
    likes: media.like_count ?? 0,
    comments: media.comments_count ?? 0,
    shares,
    followers_gained,
  };
}
