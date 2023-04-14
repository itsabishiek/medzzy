import { Typography, Stack, Box } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { auth } from "../../firebase/clientApp";
import { signOut } from "firebase/auth";
import {
  Dashboard,
  Diversity1,
  Logout,
  MedicalInformation,
  Person2,
  Tune,
} from "@mui/icons-material";
import Image from "next/image";

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
      position="relative"
      height="100vh"
      borderRight="0.5px solid #308c7a4d"
      padding="15px"
      bgcolor="rgba(48, 140, 122, 0.15)"
      borderRadius="0px 30px 30px 0px"
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        marginBottom="40px"
      >
        <Image src="/img/logo.svg" alt="" height="45" width="45" />
        <Stack flexDirection="row" alignItems="center">
          <Typography color="var(--accent-color)">MED</Typography>
          <Typography color="var(--text-sec)">ZZY!</Typography>
        </Stack>
      </Stack>

      <Stack gap="20px" alignItems="center">
        <Link
          href="/dashboard"
          style={{
            width: "100%",
          }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            gap="15px"
            width="100%"
            padding="15px 20px"
            borderRadius="15px"
            color={pathname === "/dashboard" ? "white" : "var(--text-sec)"}
            sx={{
              transition: "all 0.3s ease",
              backgroundColor:
                pathname === "/dashboard" ? "var(--accent-color)" : "unset",
              borderRadius: "15px",
              "&:hover": { backgroundColor: "var(--accent-light)" },
              cursor: "pointer",
            }}
          >
            <Dashboard />
            <Typography fontWeight="bold" fontSize="15px">
              DASHBOARD
            </Typography>
          </Stack>
        </Link>

        <Link
          href="/patients"
          style={{
            width: "100%",
          }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            gap="15px"
            width="100%"
            padding="15px 20px"
            borderRadius="15px"
            sx={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              bgcolor:
                pathname === "/patients" ? "var(--accent-color)" : "unset",
              borderRadius: "15px",
              "&:hover": { bgcolor: "var(--accent-light)" },
            }}
            color={pathname === "/patients" ? "white" : "var(--text-sec)"}
          >
            <Person2 />
            <Typography fontWeight="bold" fontSize="15px">
              PATIENTS
            </Typography>
          </Stack>
        </Link>

        <Link
          href="/"
          style={{
            width: "100%",
          }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            gap="15px"
            width="100%"
            padding="15px 20px"
            borderRadius="15px"
            sx={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              bgcolor:
                pathname === "/doctors" ? "var(--accent-color)" : "unset",
              borderRadius: "15px",
              "&:hover": { bgcolor: "var(--accent-light)" },
            }}
            color={pathname === "/doctors" ? "white" : "var(--text-sec)"}
          >
            <Diversity1 />
            <Typography fontWeight="bold" fontSize="15px">
              DOCTORS
            </Typography>
          </Stack>
        </Link>

        <Link
          href="/"
          style={{
            width: "100%",
          }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            gap="15px"
            width="100%"
            padding="15px 20px"
            borderRadius="15px"
            sx={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              bgcolor:
                pathname === "/healthcare" ? "var(--accent-color)" : "unset",
              borderRadius: "15px",
              "&:hover": { bgcolor: "var(--accent-light)" },
            }}
            color={pathname === "/healthcare" ? "white" : "var(--text-sec)"}
          >
            <MedicalInformation />
            <Typography fontWeight="bold" fontSize="15px">
              HEALTHCARE
            </Typography>
          </Stack>
        </Link>

        <Link
          href="/"
          style={{
            width: "100%",
          }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            gap="15px"
            width="100%"
            padding="15px 20px"
            borderRadius="15px"
            sx={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              bgcolor:
                pathname === "/settings" ? "var(--accent-color)" : "unset",
              borderRadius: "15px",
              "&:hover": { bgcolor: "var(--accent-light)" },
            }}
            color={pathname === "/settings" ? "white" : "var(--text-sec)"}
          >
            <Tune />
            <Typography fontWeight="bold" fontSize="15px">
              SETTINGS
            </Typography>
          </Stack>
        </Link>
      </Stack>

      <Box
        p="0px 15px"
        position="absolute"
        bottom="15px"
        left="0px"
        width="100%"
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          gap="15px"
          width="100%"
          padding="15px 20px"
          borderRadius="15px"
          color={pathname === "/healthcare" ? "white" : "var(--text-sec)"}
          bgcolor={pathname === "/healthcare" ? "var(--accent-color)" : "unset"}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "var(--accent-light)",
            },
          }}
          onClick={logout}
        >
          <Logout />
          <Typography fontWeight="bold" fontSize="15px">
            LOGOUT
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};
export default Sidebar;
