import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { auth } from "../../firebase/clientApp";

type HospitalMenuProps = {
  children: React.ReactNode;
};

const HospitalMenu: React.FC<HospitalMenuProps> = ({ children }) => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Menu>
      <MenuButton>{children}</MenuButton>

      <MenuList minWidth="180px">
        <Link href="/dashboard">
          <MenuItem fontWeight={600} fontSize="14px">
            Dashboard
          </MenuItem>
        </Link>

        <MenuItem fontWeight={600} fontSize="14px" onClick={logout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default HospitalMenu;
