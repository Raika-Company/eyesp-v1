import {
  createTheme
} from "@mui/material";

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
    start: {
      fontSize: "1.5rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "1.75rem",
      },
      fontFamily: "YekanBakhRegular",
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
      main: "#00A4FF",
      light: "#85CCF4",
      dark: "#259FDA"
    },
    secondary: {
      main: "#D5E3F1",
      light: "#D8D8D8",
      dark: "#6A6861"
    },
    error: {
      main: "#B40000",
      ligh: "#FF7A79",
      dark: "#B72D2B"

    },
    warning: {
      main: "#FCD2B3",
      light: "#F9CA32",
      dark: "#7D6C41"
    },
    info: {
      main: "#C4E9FE",
    },
    success: {
      main: "#CAE4C4",
      light: "#97C771",
      dark: "#589627"
    },
    text: {
      main: "#676767",
      textBlack: "#2C2C2C",
      textInfo: "#3E6389",
      subTitle: "#878787",
      subHeading: "#454545",
      chartTitleColor: "#7D93AA",
    },
    background: {
      default: "#E9E9E9",
    },
    hover: {
      main: "#E8E8E8",
    },
    button: {
      main: "#0C6087"
    },
    border: {
      main: "#434544"
    }
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
      main: "#008EDD",
      light: "#0C6087",
      dark: "#259FDA"
    },
    secondary: {
      main: "#1A2D3A",
    },
    error: {
      main: "#FF5A00",
    },
    warning: {
      main: "#FFA341",
    },
    info: {
      main: "#86BBD8",
    },
    success: {
      main: "#83A673",
    },
    text: {
      main: "#fff",
      textBlack: "#FFF",
      textInfo: "#434544",
      subTitle: "#FFF",
    },
    background: {
      default: "#262626",
    },
    hover: {
      main: "#182633",
    },
    button: {
      main: "#0C6087"
    },
    border: {
      main: "#fff"
    }
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