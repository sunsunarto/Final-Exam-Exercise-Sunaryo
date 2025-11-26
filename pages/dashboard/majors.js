import { Typography, Card, List } from "antd";
import RandomStudentCard from "../../components/RandomStudentCard";
import { fetchMajors } from "../../lib/api";

export default function DashboardSSG({ majors }) {
  return (
    <>
      <Typography.Title level={2}>Dashboard (SSG)</Typography.Title>
      <Card title="Majors (SSG)">
        <List
          dataSource={majors}
          renderItem={(item) => (
            <List.Item>
              {item.name} {/* show human-readable name */}
            </List.Item>
          )}
          bordered
          style={{ maxHeight: 300, overflow: "auto" }}
        />
      </Card>
      <RandomStudentCard />
    </>
  );
}

export async function getStaticProps() {
  try {
    const majors = await fetchMajors();
    return { props: { majors }, revalidate: 300 };
  } catch {
    return { props: { majors: [] }, revalidate: 300 };
  }
}