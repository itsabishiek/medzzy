import { Button, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { auth } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [user] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      padding={{ base: "0px 25px", md: "0px 35px" }}
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

      {!user ? (
        <Flex align="center" gap="10px">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Get started</Button>
          </Link>
        </Flex>
      ) : (
        <>
          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        </>
      )}
    </Flex>
  );
};
export default Navbar;
