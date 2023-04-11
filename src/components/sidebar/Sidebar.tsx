import { Box, Flex, Image, Link, Stack, Text } from "@chakra-ui/react";
import { RxDashboard } from "react-icons/rx";
import { BsPersonLinesFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { GiDoctorFace, GiHealthNormal } from "react-icons/gi";
import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { auth } from "../../firebase/clientApp";
import { signOut } from "firebase/auth";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const router = useRouter();
  const pathname = router.pathname;

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <Stack
      pos="relative"
      h="100vh"
      borderRight="0.5px solid"
      borderColor="brand.200"
      p="15px"
      bg="rgba(48, 140, 122, 0.15)"
      borderRadius="0px 30px 30px 0px"
    >
      <Flex align="center" justify="center" gap="10px" mb="40px">
        <Image src="/img/logo.svg" alt="" h="45px" />
        <Flex align="center">
          <Text color="brand.100">MED</Text>
          <Text color="text.100">ZZY!</Text>
        </Flex>
      </Flex>

      <Stack gap="15px" align="center">
        <Link
          as={NextLink}
          style={{ textDecoration: "none" }}
          href="/dashboard"
          w="100%"
          transition="all 0.3s ease"
          bg={pathname === "/dashboard" ? "brand.100" : "unset"}
          borderRadius="15px"
          _hover={{ bg: "brand.200" }}
        >
          <Flex
            align="center"
            justify="flex-start"
            gap="15px"
            w="100%"
            p="15px 20px"
            borderRadius="15px"
            cursor="pointer"
            color={pathname === "/dashboard" ? "white" : "text.100"}
          >
            <RxDashboard />
            <Text fontWeight="bold" fontSize="15px">
              DASHBOARD
            </Text>
          </Flex>
        </Link>

        <Link
          as={NextLink}
          href="/patients"
          style={{ textDecoration: "none" }}
          w="100%"
          bg={pathname === "/patients" ? "brand.100" : "unset"}
          borderRadius="15px"
          _hover={{ bg: "brand.200" }}
        >
          <Flex
            align="center"
            justify="flex-start"
            gap="15px"
            w="100%"
            p="15px 20px"
            borderRadius="15px"
            cursor="pointer"
            color={pathname === "/patients" ? "white" : "text.100"}
          >
            <BsPersonLinesFill />
            <Text fontWeight="bold" fontSize="15px">
              PATIENTS
            </Text>
          </Flex>
        </Link>

        <Link
          as={NextLink}
          href="/"
          style={{ textDecoration: "none" }}
          w="100%"
          bg={pathname === "/doctors" ? "brand.100" : "unset"}
          borderRadius="15px"
          _hover={{ bg: "brand.200" }}
        >
          <Flex
            align="center"
            justify="flex-start"
            gap="15px"
            w="100%"
            p="15px 20px"
            borderRadius="15px"
            cursor="pointer"
            color={pathname === "/doctors" ? "white" : "text.100"}
          >
            <GiDoctorFace />
            <Text fontWeight="bold" fontSize="15px">
              DOCTORS
            </Text>
          </Flex>
        </Link>

        <Link
          as={NextLink}
          href="/"
          style={{ textDecoration: "none" }}
          w="100%"
          bg={pathname === "/healthcare" ? "brand.100" : "unset"}
          borderRadius="15px"
          _hover={{ bg: "brand.200" }}
        >
          <Flex
            align="center"
            justify="flex-start"
            gap="15px"
            w="100%"
            p="15px 20px"
            borderRadius="15px"
            cursor="pointer"
            color={pathname === "/healthcare" ? "white" : "text.100"}
          >
            <GiHealthNormal />
            <Text fontWeight="bold" fontSize="15px">
              HEALTHCARE
            </Text>
          </Flex>
        </Link>
      </Stack>

      <Box p="0px 15px" pos="absolute" bottom="15px" left="0px" w="100%">
        <Flex
          alignItems="center"
          justify="flex-start"
          gap="15px"
          w="100%"
          p="15px 20px"
          borderRadius="15px"
          cursor="pointer"
          color={pathname === "/healthcare" ? "white" : "text.100"}
          bg={pathname === "/healthcare" ? "brand.100" : "unset"}
          _hover={{ bg: "brand.200" }}
          onClick={logout}
        >
          <HiOutlineLogout />
          <Text fontWeight="bold" fontSize="15px">
            LOGOUT
          </Text>
        </Flex>
      </Box>
    </Stack>
  );
};
export default Sidebar;
