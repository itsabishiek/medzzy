import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "5px",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  variants: {
    solid: {
      bg: "brand.100",
      color: "white",
      _hover: {
        bg: "#19c8a5d5",
      },
    },
    outline: {
      border: "1px solid #27c399 !important",
      color: "brand.100",
      _hover: { bg: "brand.200" },
    },
    ghost: {
      color: "#27c399",
      _hover: { bg: "brand.200" },
    },
    link: {
      _hover: {
        color: "brand.100",
        textDecorationColor: "brand.100",
      },
    },
  },
};
