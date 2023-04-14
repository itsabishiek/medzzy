import { Box, Stack, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type HeroSectionProps = {};

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        transform: "translateY(-15px)",
        height: { xs: "650px", md: "620px" },
        padding: { xs: "10px 30px 35px 30px", md: "0px 35px" },
        gap: { xs: "30px", md: "50px" },
        flexDirection: { xs: "column-reverse", md: "row" },
      }}
    >
      <Stack flex={1} sx={{ gap: { xs: "15px", md: "25px" } }}>
        <Typography
          sx={{
            fontSize: { xs: "38px", md: "60px" },
          }}
          variant="h1"
        >
          Make your patients track their health.
        </Typography>

        <Typography color="text.100" fontSize={{ xs: "14px", md: "unset" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
          error ipsum eaque perferendis alias inventore. Unde dolor deleniti
          perferendis asperiores eos inventore saepe. Fuga, quia! Quidem aperiam
          rem laudantium error!
        </Typography>

        <Stack flexDirection="row" alignItems="center" gap="15px" pt="15px">
          <Link href="/register">
            <Button variant="contained">Try Medzzy for free</Button>
          </Link>
          <Link href="/">
            <Button variant="text">How it works</Button>
          </Link>
        </Stack>
      </Stack>

      <Box
        flex={1}
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          mt: { xs: "25px", md: "unset" },
        }}
      >
        <Image
          fill
          src="/img/hero.svg"
          alt=""
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Stack>
  );
};
export default HeroSection;
