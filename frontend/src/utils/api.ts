
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';
export async function getPets() {
  const res = await fetch(`${API_BASE}/pets`);
  return res.json();
}
