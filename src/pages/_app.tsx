import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@mui/material";
import theme from "../mui/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
