import { fetchRandomStudent } from "../../lib/api";

export default async function handler(req, res) {
  try {
    const student = await fetchRandomStudent();
    res.status(200).json(student || null);
  } catch {
    res.status(500).json({ error: "Failed to load random student" });
  }
}
