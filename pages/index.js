import { Typography, Card } from "antd";

export default function Home() {
  return (
    <>
      <Typography.Title level={2}>Home</Typography.Title>
      <Card>
        <Typography.Paragraph>
          Explore:
          <br />- Students list with SSR, filter, search, pagination
          <br />- Student detail with SSG and edit/delete simulation
          <br />- Dashboard with SSR + SSG + client-side fetch
          <br />- Global theme, user info, and selected major filter via Context
        </Typography.Paragraph>
      </Card>
    </>
  );
}
