export function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function apiFetch(
  url: string,
  init: RequestInit = {},
): Promise<Response> {
  const headers = {
    ...getAuthHeaders(),
    ...((init.headers as Record<string, string>) || {}),
  };
  return fetch(url, { ...init, headers });
}
