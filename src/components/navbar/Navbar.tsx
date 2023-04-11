import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, Button, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import useHospitalData from "../../hooks/useHospitalData";
import HospitalMenu from "../menus/HospitalMenu";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [user] = useAuthState(auth);
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;

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
        <HospitalMenu>
          <Flex
            align="center"
            gap={{ base: "2px", md: "10px" }}
            bg="gray.700"
            borderRadius="30px"
            padding="5px"
          >
            <Avatar src={hospitalData?.imageURL} boxSize="30px" />
            <Flex align="center">
              <Text
                fontWeight={600}
                color="brand.100"
                display={{ base: "none", md: "unset" }}
              >
                {hospitalData.name}
              </Text>
              <ChevronDownIcon fontSize="2xl" color="text.100" />
            </Flex>
          </Flex>
        </HospitalMenu>
      )}
    </Flex>
  );
};
export default Navbar;
