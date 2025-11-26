import { AppProvider, useAppContext } from "../context/AppContext";
import { ConfigProvider, theme as AntTheme } from "antd";
import AppLayout from "../components/AppLayout";
import "../styles/globals.css";

function ThemedLayout({ children }) {
  const { theme } = useAppContext();
  const isDark = theme === "dark";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? AntTheme.darkAlgorithm : AntTheme.defaultAlgorithm
      }}
    >
      <AppLayout>{children}</AppLayout>
    </ConfigProvider>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <ThemedLayout>
        <Component {...pageProps} />
      </ThemedLayout>
    </AppProvider>
  );
}
