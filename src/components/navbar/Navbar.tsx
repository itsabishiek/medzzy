import { Button, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      padding="0px 35px"
      h="70px"
      w="100%"
      bg="bg.100"
      pos="sticky"
      top={0}
      zIndex={100}
    >
      <Link href="/">
        <Flex align="center" gap="10px">
          <Image height="45px" src="/img/logo.svg" alt="" />
          <Flex align="center">
            <Text color="brand.100">MED</Text>
            <Text color="text.100">ZZY!</Text>
          </Flex>
        </Flex>
      </Link>

      <Flex align="center" gap="10px">
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline">Get started</Button>
        </Link>
      </Flex>
    </Flex>
  );
};
export default Navbar;
