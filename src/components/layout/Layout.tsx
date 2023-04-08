import React from "react";
import Navbar from "../navbar/Navbar";
import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <>
      {!(pathname === "/login" || pathname === "/register") && <Navbar />}
      <main>{children}</main>
    </>
  );
};
export default Layout;
