import { Box, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React from "react";

type HospitalMenuProps = {
  children: React.ReactNode;
};

const HospitalMenu: React.FC<HospitalMenuProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box onClick={handleClick}>{children}</Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Link href="/patient/new">
          <MenuItem
            sx={{ fontWeight: 600, fontSize: "14px" }}
            onClick={handleClose}
          >
            Add Patient
          </MenuItem>
        </Link>

        <Link href="/doctor/new">
          <MenuItem
            sx={{ fontWeight: 600, fontSize: "14px" }}
            onClick={handleClose}
          >
            Add Doctor
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};
export default HospitalMenu;
