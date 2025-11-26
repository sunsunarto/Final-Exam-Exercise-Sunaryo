import { Layout, Menu, Switch } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";

const { Sider } = Layout;

export default function Sidebar() {
  const router = useRouter();
  const { theme, setTheme, userName } = useAppContext();
  const isDark = theme === "dark";

  return (
    <Sider collapsible theme={isDark ? "dark" : "light"}>
      <div style={{ color: isDark ? "#fff" : "#000", padding: "16px", fontWeight: 600 }}>
        {userName ? `Welcome, ${userName}` : "Dashboard"}
      </div>
      <Menu
        theme={isDark ? "dark" : "light"}
        selectedKeys={[router.pathname]}
        items={[
          { key: "/", label: <Link href="/">Home</Link> },
          { key: "/dashboard", label: <Link href="/dashboard">Dashboard</Link> },
          { key: "/students", label: <Link href="/students">Students</Link> }
        ]}
      />
      <div style={{ padding: "16px" }}>
        <span style={{ marginRight: 8 }}>Theme</span>
        <Switch checked={isDark} onChange={(checked) => setTheme(checked ? "dark" : "light")} />
      </div>
    </Sider>
  );
}
