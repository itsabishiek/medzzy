import React from "react";
import Navbar from "../navbar/Navbar";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../sidebar/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <>
      {!(
        pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/dashboard" ||
        pathname === "/patients"
      ) && <Navbar />}

      {pathname === "/dashboard" || pathname === "/patients" ? (
        <Flex>
          <Box flex={1}>
            <Sidebar />
          </Box>
          <Box flex={5}>
            <main>{children}</main>
          </Box>
        </Flex>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
};
export default Layout;
