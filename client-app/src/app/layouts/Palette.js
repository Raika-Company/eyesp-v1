import { createTheme } from "@mui/material";

var theme = createTheme();

const commonTypography = (fontSize, fontSizeMd) => ({
  fontSize,
  [theme.breakpoints.up("md")]: {
    fontSize: fontSizeMd,
  },
});

/**
 * Base theme configuration.
 * @type {Object}
 */
const baseTheme = createTheme({
  typography: {
    h1: {
      fontSize: "18px",
      [theme.breakpoints.up("md")]: {
        fontSize: "28px",
      },
      fontFamily: "YekanBakhSemibold",
    },
    h2: {
      fontSize: "18px",
      [theme.breakpoints.up("md")]: {
        fontSize: "24px",
      },
      fontFamily: "YekanBakhRegular",
    },
    h3: {
      fontSize: "14px",
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
      },
      fontFamily: "YekanBakhRegular",
    },
    h4: {
      fontSize: "14px",
      [theme.breakpoints.up("md")]: {
        fontSize: "16px",
      },
      fontFamily: "YekanBakhSemibold",
    },
    h5: {
      fontSize: "14px",
      [theme.breakpoints.up("md")]: {
        fontSize: "16px",
      },
      fontFamily: "YekanBakhLight",
    },
    h6: {
      fontSize: "14px",
      [theme.breakpoints.up("md")]: {
        fontSize: "16px",
      },
      fontFamily: "YekanBakhRegular",
    },
    body1: {
      fontSize: "14px",
      [theme.breakpoints.up("md")]: {
        fontSize: "16px",
      },
      fontFamily: "YekanBakh",
    },
    body2: {
      fontSize: "12px",
      [theme.breakpoints.up("md")]: {
        fontSize: "14px",
      },
      fontFamily: "YekanBakh",
    },
    subtitle1: {
      fontSize: "12px",
      fontFamily: "YekanBakhRegular",
    },
    subtitle2: {
      fontSize: "10px",
      fontFamily: "YekanBakhLight",
    },
    button: {
      fontSize: "14px",
      [theme.breakpoints.up("md")]: {
        fontSize: "16px",
      },
      fontFamily: "YekanBakhSemibold",
    },
    button1: {
      fontSize: "16px",
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
      },
      fontFamily: "YekanBakhBold",
    },
    mainDigits: {
      fontSize: "24px",
      [theme.breakpoints.up("md")]: {
        fontSize: "40px",
      },
      fontFamily: "YekanBakhSemibold",
    },
    chartTitle: {
      fontSize: "16px",
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
      },
      fontFamily: "YekanBakhLight",
    },
    logo: {
      fontSize: "20px",
      [theme.breakpoints.up("md")]: {
        fontSize: "24px",
      },
      fontFamily: "TrenchThin",
    },
    AI: {
      fontSize: "20px",
      [theme.breakpoints.up("md")]: {
        fontSize: "24px",
      },
      fontFamily: "PeydaBold",
    },
    start: {
      fontSize: "1.5rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "1.75rem",
      },
      fontFamily: "YekanBakhRegular",
    },
    boxValue: {
      fontSize: "1.75rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "2.25rem",
      },
      fontFamily: "YekanBakhBold",
    },
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
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          paddingTop: "6px",
        },
      },
    },
  },
});

/**
 * Light theme configuration.
 *
 * @type {Object}
 * @constant
 */
export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#326589",
      light: "#0C6087",
      dark: "#0C6087",
    },
    secondary: {
      main: "#B3B3B3",
      light: "#D8D8D8",
      dark: "#6A6861",
    },
    thirdly: {
      main: "#683C94",
    },
    error: {
      main: "#9A0B0B",
      light: "#FF7A79",
      dark: "#B72D2B",
    },
    warning: {
      main: "#F9CA32",
      light: "#7D6C41",
      dark: "#6F4D25",
    },
    info: {
      main: "#C4E9FE",
      light: "#00C2FF",
    },
    success: {
      main: "#97C771",
      light: "#589627",
    },
    text: {
      main: "#434544",
      blueText: "#0C6087",
      textBlack: "#2C2C2C",
      textInfo: "#3E6389",
      subTitle: "#878787",
      subHeading: "#434544",
      chartTitleColor: "#7D93AA",
      number: "#47A100",
    },
    background: {
      default: "#E9E9E9",
    },
    hover: {
      main: "#E8E8E8",
    },
    button: {
      main: "#0C6087",
    },
    border: {
      main: "#434544",
    },
    Box: {
      main: "#FFF",
    },
  },
});

/**
 * Dark theme configuration.
 *
 * @type {Object}
 * @constant
 */
export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#326589",
      light: "#85CCF4",
      dark: "#00C2FF",
    },
    secondary: {
      main: "#B3B3B3",
      light: "#404040",
      dark: "#6A6861",
    },
    thirdly: {
      main: "#7342A3",
    },
    error: {
      main: "#9A0B0B",
      light: "#FF7A79",
      dark: "#FE4543",
    },
    warning: {
      main: "#F9CA32",
      light: "#7D6C41",
      dark: "#6F4D25",
    },
    info: {
      main: "#86BBD8",
      light: "#0C6087",
    },
    success: {
      main: "#97C771",
      light: "#70FF00",
    },
    text: {
      main: "#fff",
      blueText: "#85CCF4",
      secondary: "#FFF",
      textBlack: "#FFF",
      textInfo: "#FFF",
      subTitle: "#FFF",
      number: "#70FF00",
    },
    background: {
      default: "#262626",
    },
    hover: {
      main: "#182633",
    },
    button: {
      main: "#0C6087",
    },
    border: {
      main: "#fff",
    },
    Box: {
      main: "#1A1A1A",
    },
  },
  // components: {
  //   MuiDrawer: {
  //     styleOverrides: {
  //       paper: {
  //         backgroundColor: "white",
  //       },
  //     },
  //   },
  // },
});
