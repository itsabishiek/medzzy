import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import useHospitalData from "../../hooks/useHospitalData";
import HospitalMenu from "../menus/HospitalMenu";
import { Stack, Button, Typography, Avatar } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Image from "next/image";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [user] = useAuthState(auth);
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        padding: { xs: "0px 25px", md: "0px 35px" },
      }}
      height="70px"
      width="100%"
      bgcolor="var(--bg-color)"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Link href="/">
        <Stack flexDirection="row" alignItems="center" gap="10px">
          <Image height="45" width="45" src="/img/logo.png" alt="" />
          <Stack flexDirection="row" alignItems="center">
            <Typography color="var(--accent-color)">MED</Typography>
            <Typography color="var(--text-sec)">ZZY!</Typography>
          </Stack>
        </Stack>
      </Link>

      {!user ? (
        <Stack flexDirection="row" alignItems="center" gap="10px">
          <Link href="/login">
            <Button variant="text">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outlined">Get started</Button>
          </Link>
        </Stack>
      ) : (
        <HospitalMenu>
          <Stack
            flexDirection="row"
            alignItems="center"
            bgcolor="var(--bg-overlay)"
            borderRadius="30px"
            padding="5px"
            sx={{ cursor: "pointer", gap: { xs: "2px", md: "10px" } }}
          >
            <Avatar
              src={hospitalData?.imageURL}
              sx={{ width: "30px", height: "30px" }}
              alt=""
            />
            <Stack alignItems="center" flexDirection="row">
              <Typography
                fontWeight={600}
                color="brand.100"
                sx={{ display: { xs: "none", md: "unset" } }}
              >
                {hospitalData?.name}
              </Typography>
              <ExpandMore sx={{ color: "var(--text-sec)" }} />
            </Stack>
          </Stack>
        </HospitalMenu>
      )}
    </Stack>
  );
};
export default Navbar;
