import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#27c399",
      200: "rgba(48, 140, 122, 0.3)",
    },
    bg: {
      100: "#1a202c",
    },
    text: {
      100: "#A0AEC0",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "#1a202c",
        color: "#edf2f7",
      },
    }),
  },
  components: {
    Button,
  },
});
