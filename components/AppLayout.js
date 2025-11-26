import { Layout } from "antd";
import Sidebar from "./Sidebar";

const { Content } = Layout;

export default function AppLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content style={{ margin: "24px", background: "transparent" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
