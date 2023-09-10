import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#126AED",
      dark: "#0C4AA5",
      light: "#4187f0"
    },
    secondary: {
      main: "#DB7F12",
      dark: "#6c6c6c",
      light: "#afafaf"
    },
    error: {
      main: "#EE0B0B",
      dark: "#a60707",
      light: "#a60707",
    },
    warning: {
      main: "#FF630B",
      dark: "#FF630B",
      light: "#ff823b"
    },
    info: {
      main: "#126AED",
      dark: "#0C4AA5",
      light: "#4187f0"
    },
    success: {
      main: "#14A784",
      dark: "#0e745c",
      light: "#0e745c"
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
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          paddingTop: "6px",
        },
      }
    }
  },
});

export const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    mode: "dark",
    primary: {
      main: "#6798f8",
      dark: "#527bcd",
      light: "#8bb2fa"
    },
    secondary: {
      main: "#f8a665",
      dark: "#bfbfbf",
      light: "#e0e0e0"
    },
    error: {
      main: "#f77676",
      dark: "#d36565",
      light: "#d36565"
    },
    warning: {
      main: "#FF8E4D",
      dark: "#FF8E4D",
      light: "#ffa56d"
    },
    info: {
      main: "#6798f8",
      dark: "#527bcd",
      light: "#8bb2fa"
    },
    success: {
      main: "#4ecdab",
      dark: "#3fb391",
      light: "#3fb391"
    },
    background: {
      default: "linear-gradient(195deg, #1D1D1F 24.09%, #2B2B2B 100%)",
    },
    text: {
      primary: "#FFF",
      secondary: "#BBB",
    },
  },
  typography :{
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
      color: "#fff",
    },
    fontFamily: "PeydaMedium",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#171717"
        },
      },
    },
  },
});
