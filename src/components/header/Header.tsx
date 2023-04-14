import { ExpandMore } from "@mui/icons-material";
import { Typography, Stack, Avatar } from "@mui/material";
import React from "react";
import HospitalMenu from "../menus/HospitalMenu";
import useHospitalData from "../../hooks/useHospitalData";
import { hospitalDataState } from "../../atoms/hospitalDataAtom";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { hospitalStateValue } = useHospitalData();
  const hospitalData = hospitalStateValue.hospitalData;

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
              display={{ base: "none", md: "unset" }}
            >
              {hospitalData.name}
            </Typography>
            <ExpandMore sx={{ color: "var(--text-sec)" }} />
          </Stack>
        </Stack>
      </HospitalMenu>
    </Stack>
  );
};
export default Header;
