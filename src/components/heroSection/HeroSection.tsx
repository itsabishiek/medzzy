import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type HeroSectionProps = {};

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <Flex
      flexDir={{ base: "column-reverse", md: "row" }}
      align="center"
      justify="center"
      h={{ base: "100%", md: "620px" }}
      padding={{ base: "10px 30px 35px 30px", md: "0px 35px" }}
      gap={{ base: "30px", md: "50px" }}
      transform="translateY(-15px)"
    >
      <Stack flex={1} gap={{ base: "15px", md: "25px" }}>
        <Text
          fontSize={{ base: "38px", md: "60px" }}
          fontWeight="bolder"
          bgGradient="linear(to-r, teal.500, green.500)"
          bgClip="text"
        >
          Make your patients track their health.
        </Text>

        <Text color="text.100" fontSize={{ base: "14px", md: "unset" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
          error ipsum eaque perferendis alias inventore. Unde dolor deleniti
          perferendis asperiores eos inventore saepe. Fuga, quia! Quidem aperiam
          rem laudantium error!
        </Text>

        <Flex align="center" gap="15px" pt="15px">
          <Link href="/register">
            <Button variant="solid">Try Medzzy for free</Button>
          </Link>
          <Link href="/">
            <Button variant="link" fontSize={{ base: "14px", md: "unset" }}>
              How it works
            </Button>
          </Link>
        </Flex>
      </Stack>

      <Box flex={1}>
        <Image
          h={{ base: "300px", md: "unset" }}
          objectFit="contain"
          src="/img/hero.svg"
          alt=""
        />
      </Box>
    </Flex>
  );
};
export default HeroSection;
