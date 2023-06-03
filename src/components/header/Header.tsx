import { Add, ExpandMore, Menu } from "@mui/icons-material";
import { Typography, Stack, Avatar, IconButton, Button } from "@mui/material";
import React from "react";
import HospitalMenu from "../menus/HospitalMenu";
import NewMenu from "../menus/NewMenu";
import useHospitalData from "../../hooks/useHospitalData";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { globalState } from "../../atoms/globalAtom";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;
  const setSidebarShow = useSetRecoilState(globalState);

  const toggleSidebar = () => {
    setSidebarShow((prev) => ({
      ...prev,
      sidebarShow: !prev.sidebarShow,
    }));
  };

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        sx={{
          fontSize: "25px",
        }}
        variant="h1"
      >
        {title}
      </Typography>

      <Stack flexDirection="row" alignItems="center" gap="5px">
        <HospitalMenu>
          <Stack
            flexDirection="row"
            alignItems="center"
            sx={{ cursor: "pointer", gap: { xs: "2px", md: "10px" } }}
            bgcolor="var(--bg-overlay)"
            borderRadius="30px"
            padding="5px"
          >
            <Avatar
              src={hospitalData?.imageURL}
              sx={{ width: "30px", height: "30px" }}
            />
            <Stack flexDirection="row" alignItems="center">
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

        <NewMenu>
          <Button
            endIcon={<Add />}
            sx={{
              backgroundImage: "var(--bg-gradient)",
              color: "white",
              fontWeight: 600,
              borderRadius: "25px",
            }}
          >
            New
          </Button>
        </NewMenu>

        <IconButton
          sx={{ display: { xs: "unset", lg: "none" } }}
          onClick={toggleSidebar}
        >
          <Menu />
        </IconButton>
      </Stack>
    </Stack>
  );
};
export default Header;
