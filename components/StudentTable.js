import { useEffect, useMemo, useState } from "react";
import { Table, Input, Select, Button, Space, message } from "antd";
import Link from "next/link";
import { toCSV } from "../lib/utils";

export default function StudentTable({ students = [], defaultMajor = "" }) {
  const [search, setSearch] = useState("");
  const [major, setMajor] = useState(defaultMajor || "");
  const [data, setData] = useState(students);
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    setData(students);
  }, [students]);

  useEffect(() => {
    async function fetchMajors() {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const json = await res.json();
        setMajors(json || []);
      } catch (err) {
        console.error("Failed to fetch majors", err);
        message.error("Could not load majors");
      }
    }
    fetchMajors();
  }, []);

  const filtered = useMemo(() => {
    return data.filter((s) => {
      const matchesSearch =
        s.firstName.toLowerCase().includes(search.toLowerCase()) ||
        s.lastName.toLowerCase().includes(search.toLowerCase());
      const matchesMajor = major ? s.major === major : true;
      return matchesSearch && matchesMajor;
    });
  }, [data, search, major]);

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "name",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "University", dataIndex: "university", key: "university" },
    { title: "Major", dataIndex: "major", key: "major" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Link href={`/students/${record.id}`}>
            <Button type="link">View details</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const handleExportCSV = () => {
    try {
      const csv = toCSV(filtered, [
        "id",
        "firstName",
        "lastName",
        "email",
        "university",
        "major",
      ]);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "students.csv";
      a.click();
      URL.revokeObjectURL(url);
      message.success("Exported CSV for filtered students");
    } catch (e) {
      message.error("Failed to export CSV");
    }
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="Search by name..."
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 240 }}
        />
        <Select
          allowClear
          placeholder="Filter by major"
          value={major || undefined}
          onChange={(v) => setMajor(v || "")}
          options={majors.map((m) => ({
            label: m.name,
            value: m.slug,
          }))}
          style={{ width: 240 }}
        />
        <Button onClick={handleExportCSV}>Export CSV</Button>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filtered}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}
