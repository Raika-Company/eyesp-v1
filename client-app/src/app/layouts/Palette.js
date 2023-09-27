import {
  createTheme
} from "@mui/material";

var theme = createTheme();

const commonTypography = (fontSize, fontSizeMd) => ({
  fontSize,
  [theme.breakpoints.up('md')]: {
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
      fontSize: '18px',
      [theme.breakpoints.up('md')]: {
        fontSize: '24px',
      },
      fontFamily: "PeydaSemiBold"
    },
    h2: {
      fontSize: '18px',
      [theme.breakpoints.up('md')]: {
        fontSize: '24px',
      },
      fontFamily: "PeydaLight"
    },
    h3: {
      fontSize: '14px',
      [theme.breakpoints.up('md')]: {
        fontSize: '20px',
      },
      fontFamily: "PeydaRegular"
    },
    h4: {
      fontSize: '14px',
      [theme.breakpoints.up('md')]: {
        fontSize: '16px',
      },
      fontFamily: "PeydaSemiBold"
    },
    h5: {
      fontSize: '14px',
      [theme.breakpoints.up('md')]: {
        fontSize: '16px',
      },
      fontFamily: "PeydaLight"
    },
    h6: {
      fontSize: '14px',
      [theme.breakpoints.up('md')]: {
        fontSize: '16px',
      },
      fontFamily: "PeydaRegular"
    },
    body1: {
      fontSize: '14px',
      [theme.breakpoints.up('md')]: {
        fontSize: '16px',
      },
      fontFamily: "Peyda"
    },
    body2: {
      fontSize: '14px',
      [theme.breakpoints.up('md')]: {
        fontSize: '16px',
      },
      fontFamily: "Peyda"
    },
    subtitle1: {
      fontSize: '14px',
      fontFamily: "PeydaRegular"
    },
    subtitle2: {
      fontSize: '14px',
      fontFamily: "PeydaLight"
    },
    button: {
      fontSize: '14px',
      [theme.breakpoints.up('md')]: {
        fontSize: '16px',
      },
      fontFamily: "PeydaSemiBold"
    },
    mainDigits: {
      fontSize: '24px',
      [theme.breakpoints.up('md')]: {
        fontSize: '40px',
      },
      fontFamily: "PeydaSemiBold"
    },
    chartTitle: {
      fontSize: '16px',
      [theme.breakpoints.up('md')]: {
        fontSize: '20px',
      },
      fontFamily: "PeydaLight"
    },
    fontFamily: "Peyda",
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
      }
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
      main: "#008EDD",
    },
    secondary: {
      main: "#D5E3F1",
    },
    error: {
      main: "#FF8A35",
    },
    warning: {
      main: "#FCD2B3",
    },
    info: {
      main: "#C4E9FE",
    },
    success: {
      main: "#CAE4C4",
    },
    text: {
      main: "#676767",
      textBlack: "#2C2C2C",
      textInfo: "#3E6389",
      subTitle: "#878787",
      chartTitleColor: "#7D93AA"
    },
    background: {
      default: "#E8F1F9",
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
      main: "#005A99",
    },
    secondary: {
      main: "#1A2D3A"
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
      main: "#C0C0C0",
      textBlack: "#E0E0E0",
      textInfo: "#9EB5C1",
      subTitle: "#A0A0A0"
    },
    background: {
      default: "#121212",
    },
  },
});