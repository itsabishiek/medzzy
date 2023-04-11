import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, Flex, Text } from "@chakra-ui/react";
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
    <Flex align="center" justify="space-between">
      <Text
        fontSize="20px"
        fontWeight="extrabold"
        bgGradient="linear(to-r, teal.500, green.500)"
        bgClip="text"
      >
        {title}
      </Text>

      <HospitalMenu>
        <Flex
          align="center"
          gap={{ base: "2px", md: "10px" }}
          bg="gray.700"
          borderRadius="30px"
          padding="5px"
        >
          <Avatar src={hospitalData?.imageURL} boxSize="30px" />
          <Flex align="center">
            <Text
              fontWeight={600}
              color="brand.100"
              display={{ base: "none", md: "unset" }}
            >
              {hospitalData.name}
            </Text>
            <ChevronDownIcon fontSize="2xl" color="text.100" />
          </Flex>
        </Flex>
      </HospitalMenu>
    </Flex>
  );
};
export default Header;
