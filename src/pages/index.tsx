import { Input } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import HeroSection from "../components/heroSection/HeroSection";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Medzzy!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>

      <HeroSection />
    </>
  );
};

export default Home;
