import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

type HeroSectionProps = {};

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <Flex
      align="center"
      justify="center"
      h="690px"
      padding="0px 35px"
      gap="50px"
    >
      <Stack flex={1} gap="25px">
        <Text fontSize="60px" fontWeight="bolder">
          Make your patients track their health.
        </Text>

        <Text color="text.100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
          error ipsum eaque perferendis alias inventore. Unde dolor deleniti
          perferendis asperiores eos inventore saepe. Fuga, quia! Quidem aperiam
          rem laudantium error!
        </Text>

        <Flex align="center" gap="15px" pt="15px">
          <Button variant="solid">Try Medzzy for free</Button>
          <Button variant="link">How it works</Button>
        </Flex>
      </Stack>

      <Box flex={1}>
        <Image src="/img/hero.svg" alt="" />
      </Box>
    </Flex>
  );
};
export default HeroSection;
