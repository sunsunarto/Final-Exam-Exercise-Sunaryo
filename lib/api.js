
const BASE = "https://dummyjson.com";

export async function fetchStudents({ limit = 100, select = [] } = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  if (select.length) params.set("select", select.join(","));

  const res = await fetch(`${BASE}/users?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch students");

  const data = await res.json();
  return data?.users || [];
}

export async function fetchStudentById(id) {
  const res = await fetch(`${BASE}/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch student by id");
  return res.json();
}

export async function fetchMajors() {
  const res = await fetch(`${BASE}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch majors");

  const data = await res.json();

  return (data || []).map((c) => ({
    slug: c.slug,
    name: c.name,
    url: c.url,
  }));
}

export async function fetchRandomStudent() {
  const res = await fetch(`${BASE}/users?limit=100`);
  if (!res.ok) throw new Error("Failed to fetch random student pool");

  const data = await res.json();
  const users = data?.users || [];
  if (!users.length) return null;

  const idx = Math.floor(Math.random() * users.length);
  return users[idx];
}
