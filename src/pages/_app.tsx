import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import Layout from "../components/layout/Layout";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <DarkMode>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DarkMode>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
