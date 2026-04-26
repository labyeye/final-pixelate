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
