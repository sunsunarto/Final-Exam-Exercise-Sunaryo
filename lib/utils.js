export function assignMajorToStudent(student, categories) {
  if (!Array.isArray(categories) || categories.length === 0) {
    return { slug: "", name: "" };
  }

  const id = Number(student?.id || 0);
  const index = id % categories.length;
  const category = categories[index];

  return {
    slug: category.slug || "",
    name: category.name || "",
  };
}

export function enrichStudentsWithMajors(students, categories) {
  return (students || []).map((s) => {
    const major = assignMajorToStudent(s, categories);
    return {
      ...s,
      major: major.slug,  
      majorName: major.name, 
    };
  });
}

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
