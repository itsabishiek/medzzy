import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#27c399",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            fontWeight: 600,
            color: "white",
          },
        },
        {
          props: { variant: "text" },
          style: {
            fontWeight: 500,
            fontSize: "13px",
            paddingLeft: "15px",
            paddingRight: "15px",
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            fontWeight: 600,
          },
        },
      ],
    },
    MuiAvatar: {
      variants: [
        {
          props: { variant: "circular" },
          style: {
            backgroundColor: "#2d3748",
            color: "#a0aec0",
          },
        },
      ],
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2d3748",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          width: "185px",
          marginTop: 4,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2d3748",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: 700,
          background:
            "-webkit-linear-gradient(45deg, #008080 30%, #008040 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});

export default theme;
