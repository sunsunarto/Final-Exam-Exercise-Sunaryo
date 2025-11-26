import { Typography, Card, Row, Col } from "antd";
import RandomStudentCard from "../../components/RandomStudentCard";
import { fetchStudents } from "../../lib/api";

export default function DashboardSSR({ totalStudents }) {
  return (
    <>
      <Typography.Title level={2}>Dashboard (SSR)</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="Total Students (SSR)">
            <Typography.Title level={4} style={{ margin: 0 }}>{totalStudents}</Typography.Title>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <RandomStudentCard />
        </Col>
      </Row>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const students = await fetchStudents({ limit: 100 });
    return { props: { totalStudents: students.length } };
  } catch {
    return { props: { totalStudents: 0 } };
  }
}
