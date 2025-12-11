export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");

  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function handleErrors(res: Response) {
  if (res.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Erro na requisição");
  }
}

export async function apiPost(endpoint: string, body: any) {
  const headers: any = { ...getAuthHeaders() };

  const options: any = { method: "POST", headers };

  if (body instanceof FormData) {
    options.body = body;
  } else {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, options);
  await handleErrors(res);
  return res.json();
}

export async function apiGet(endpoint: string) {
  const headers = getAuthHeaders();

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers,
  });

  await handleErrors(res);
  return res.json();
}

export async function apiPatch(endpoint: string, body?: any) {
  const headers: any = { ...getAuthHeaders() };

  const options: any = { method: "PATCH", headers };

  if (body) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, options);
  await handleErrors(res);
  return res.json();
}

export async function apiDelete(endpoint: string) {
  const headers = getAuthHeaders();

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "DELETE",
    headers,
  });

  await handleErrors(res);
  return res.json();
}

export async function getPets() {
  return apiGet("/pets");
}
