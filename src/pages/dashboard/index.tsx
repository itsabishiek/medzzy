import Head from "next/head";
import React from "react";
import { Stack } from "@mui/material";

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <>
      <Head>
        <title>Dashboard - Medzzy!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>
    </>
  );
};

export default Dashboard;
