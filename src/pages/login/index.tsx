import { Box, Button, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { useRouter } from "next/router";
import { FIREBASE_ERRORS } from "../../firebase/errors";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const [signInWithEmailAndPassword, user, userLoading, userError] =
    useSignInWithEmailAndPassword(auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(loginForm.email, loginForm.password);
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Login - Medzzy!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>

      <Flex align="center" h="100vh">
        <Box flex={1} h="100%" display={{ base: "none", md: "unset" }}>
          <Image h="100%" objectFit="cover" src="/img/pattern.png" alt="" />
        </Box>

        <Stack align="center" justify="center" flex={1} padding="0px 35px">
          <Box w={{ base: "100%", md: "420px" }}>
            <form onSubmit={handleSubmit}>
              <Stack align="center" gap="20px" w="100%">
                <Text fontWeight={600} fontSize="28px" color="brand.100">
                  Login
                </Text>

                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  height="50px"
                  width="100%"
                  _focus={{ border: "1px solid #27c399" }}
                  onChange={handleChange}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  height="50px"
                  width="100%"
                  _focus={{ border: "1px solid #27c399" }}
                  onChange={handleChange}
                />

                <Flex align="center" gap="5px">
                  <Text>Not have an account?</Text>
                  <Link href="/register">
                    <Button variant="link">Create one</Button>
                  </Link>
                </Flex>

                {userError && (
                  <Text fontSize="11pt" color="red.200">
                    {
                      FIREBASE_ERRORS[
                        userError?.message as keyof typeof FIREBASE_ERRORS
                      ]
                    }
                  </Text>
                )}

                <Button w="100%" type="submit" isLoading={userLoading}>
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
export default Login;
