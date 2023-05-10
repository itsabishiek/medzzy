import React from "react";
import Navbar from "../navbar/Navbar";
import { useRouter } from "next/router";
import { Stack, Box } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

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
        pathname === "/patients" ||
        pathname === "/patient/new" ||
        pathname === "/patient/[patientId]" ||
        pathname === "/patient/[patientId]/edit" ||
        pathname === "/doctors" ||
        pathname === "/doctor/new" ||
        pathname === "/doctor/[doctorId]" ||
        pathname === "/doctor/[doctorId]/edit"
      ) && <Navbar />}

      {pathname === "/dashboard" ||
      pathname === "/patients" ||
      pathname === "/patient/new" ||
      pathname === "/patient/[patientId]" ||
      pathname === "/patient/[patientId]/edit" ||
      pathname === "/doctors" ||
      pathname === "/doctor/new" ||
      pathname === "/doctor/[doctorId]" ||
      pathname === "/doctor/[doctorId]/edit" ? (
        <Stack flexDirection="row">
          <Box sx={{ flex: { xs: 0, md: 1 }, width: "100%" }}>
            <Sidebar />
          </Box>
          <Stack
            sx={{ flex: { xs: 1, md: 5 }, width: "100%", minHeight: "100vh" }}
            padding="30px"
          >
            <Header title="Dashboard" />

            <main>{children}</main>
          </Stack>
        </Stack>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
};
export default Layout;
