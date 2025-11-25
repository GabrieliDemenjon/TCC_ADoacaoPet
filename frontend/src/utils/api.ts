export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export async function apiPost(endpoint: string, body: any) {
  let options: any = {
    method: "POST",
  };


  if (body instanceof FormData) {
    options.body = body;
  } else {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, options);

  if (!res.ok) {
    throw new Error("Erro na requisição");
  }

  return res.json();
}
