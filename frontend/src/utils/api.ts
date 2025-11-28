export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";


function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
}


export async function apiPost(endpoint: string, body: any) {
  const headers: any = { ...getAuthHeaders() };

  const options: any = {
    method: "POST",
    headers,
  };

  if (body instanceof FormData) {

    options.body = body;
  } else {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro POST: ${text}`);
  }

  return res.json();
}


export async function apiGet(endpoint: string) {
  const headers = getAuthHeaders();

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro GET: ${text}`);
  }

  return res.json();
}


export async function apiPatch(endpoint: string, body?: any) {
  const headers: any = { ...getAuthHeaders() };

  const options: any = {
    method: "PATCH",
    headers,
  };

  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro PATCH: ${text}`);
  }

  return res.json();
}


export async function getPets() {
  return apiGet("/pets");
}
