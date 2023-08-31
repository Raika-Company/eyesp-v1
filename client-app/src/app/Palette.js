import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#126AED",
    },
    secondary: {
      main: "#DB7F12",
    },
    background: {
      default: "linear-gradient(195deg, #FCFCFF 24.09%, #EBEBEB 100%)",
    },
  },
  typography: {
    h1: {
      fontFamily: "PeidaBold, serif",
    },
    h2: {
      fontFamily: "PeidaBold, serif",
    },
    h3: {
      fontFamily: "PeydaSemiBold, serif",
      fontSize: "36px",
    },
    h4: {
      fontFamily: "PeydaSemiBold, serif",
      textEdge: "cap",
      leadingTrim: "both",
      fontSize: 30,
      fontWeight: 600,
      lineHeight: "normal",
      fontStyle: "normal",
    },
    h5: {
      fontFamily: "PeydaMedium, serif",
      color: "#A4A4A4",
      fontWeight: 700,
      fontSize: 25,
      lineHeight: "normal",
      fontStyle: "normal",
    },
    h6: {
      fontFamily: "PeydaMedium, serif",
      fontSize: 25,
    },
    body1: {
      fontFamily: "PeydaMedium, sans-serif",
      fontSize: 18,
    },
    body2: {
      fontFamily: "PeydaMedium, sans-serif",
      fontSize: 16,
    },
    subtitle1: {
      fontFamily: "PeydaMedium, sans-serif",
      fontSize: "1.35rem",
      fontWeight: 500,
      opacity: 0.5,
      color: "#5E5E5E",
    },
    subtitle2: {
      fontFamily: "PeydaMedium, sans-serif",
      fontSize: "1rem",
      fontWeight: 500,
      opacity: 0.3,
      color: "#000",
    },
    fontFamily: "PeydaMedium",
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          left: "inherit",
          right: "1.7rem",
          transformOrigin: "right",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          textAlign: "right",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          direction: "ltr",
        },
        paper: {
          position: "absolute",
          left: 0,
          transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          "&.MuiDrawer-open": {
            transform: "translateX(0)",
          },
          "&:not(.MuiDrawer-open)": {
            transform: "translateX(-100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 28.442747116088867px 0px rgba(0, 0, 0, 0.03)",
          borderRadius: 20,
          background: "#E8E8E8"
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    mode: "dark",
    primary: {
      main: "#315A9E",
    },
    secondary: {
      main: "#B0680F",
    },
    background: {
      default: "#181D23", // Set the background color to black
    },
    text: {
      primary: "#FFF",
      secondary: "#BBB",
    },
  },
});
