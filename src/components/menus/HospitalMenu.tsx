import { signOut } from "firebase/auth";
import { Box, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React from "react";
import { auth } from "../../firebase/clientApp";

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

  const logout = async () => {
    await signOut(auth);
    handleClose();
  };

  return (
    <>
      <Box onClick={handleClick}>{children}</Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Link href="/dashboard">
          <MenuItem
            sx={{ fontWeight: 600, fontSize: "14px" }}
            onClick={handleClose}
          >
            Dashboard
          </MenuItem>
        </Link>

        <MenuItem sx={{ fontWeight: 600, fontSize: "14px" }} onClick={logout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
export default HospitalMenu;
