// lib/utils.js

/**
 * Deterministically map a student to a major using their id and categories length.
 * Returns both slug and name for consistency.
 */
export function assignMajorToStudent(student, categories) {
  if (!Array.isArray(categories) || categories.length === 0) {
    return { slug: "", name: "" };
  }

  const id = Number(student?.id || 0);
  const index = id % categories.length;
  const category = categories[index];

  // categories are objects { slug, name, url }
  return {
    slug: category.slug || "",
    name: category.name || "",
  };
}

/**
 * Enrich students with majors (slug + name).
 */
export function enrichStudentsWithMajors(students, categories) {
  return (students || []).map((s) => {
    const major = assignMajorToStudent(s, categories);
    return {
      ...s,
      major: major.slug,      // used for filtering
      majorName: major.name,  // used for display
    };
  });
}

/**
 * Convert rows to CSV string.
 */
export function toCSV(rows, headers) {
  const escape = (v) => {
    if (v == null) return "";
    const s = String(v);
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const head = headers.join(",");
  const body = rows
    .map((r) => headers.map((h) => escape(r[h])).join(","))
    .join("\n");

  return `${head}\n${body}`;
}
