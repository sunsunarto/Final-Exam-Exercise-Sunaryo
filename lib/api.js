// lib/api.js
const BASE = "https://dummyjson.com";

/**
 * Fetch a list of students (users).
 */
export async function fetchStudents({ limit = 100, select = [] } = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  if (select.length) params.set("select", select.join(","));

  const res = await fetch(`${BASE}/users?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch students");

  const data = await res.json();
  return data?.users || [];
}

/**
 * Fetch a single student by ID.
 */
export async function fetchStudentById(id) {
  const res = await fetch(`${BASE}/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch student by id");
  return res.json();
}

/**
 * Fetch majors (categories) from DummyJSON products API.
 * Normalized into objects with slug + name for easier use in UI.
 */
export async function fetchMajors() {
  const res = await fetch(`${BASE}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch majors");

  const data = await res.json();

  // API returns array of objects: { slug, name, url }
  // Normalize to ensure consistent shape
  return (data || []).map((c) => ({
    slug: c.slug,
    name: c.name,
    url: c.url,
  }));
}

/**
 * Fetch a random student from the pool.
 */
export async function fetchRandomStudent() {
  const res = await fetch(`${BASE}/users?limit=100`);
  if (!res.ok) throw new Error("Failed to fetch random student pool");

  const data = await res.json();
  const users = data?.users || [];
  if (!users.length) return null;

  const idx = Math.floor(Math.random() * users.length);
  return users[idx];
}
