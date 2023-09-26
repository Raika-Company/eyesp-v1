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
    ...['h1', 'h2'].reduce((acc, variant) => {
      acc[variant] = {
        ...commonTypography('18px', '24px'),
        fontFamily: "PeydaSemiBold",
      };
      return acc;
    }, {}),
    ...['h3', 'h4'].reduce((acc, variant) => {
      acc[variant] = {
        ...commonTypography('14px', '20px'),
        fontFamily: variant === 'h3' ? "PeydaRegular" : "PeydaSemiBold",
      };
      return acc;
    }, {}),
    ...['h5', 'h6', 'body1', 'body2', 'button'].reduce((acc, variant) => {
      acc[variant] = {
        ...commonTypography('14px', '16px'),
        fontFamily: "Peyda",
      };
      return acc;
    }, {}),
    subtitle1: {
      fontSize: '14px',
      fontFamily: "PeydaRegular",
    },
    subtitle2: {
      fontSize: '14px',
      fontFamily: "PeydaLight",
    },
    mainDigits: {
      ...commonTypography('24px', '40px'),
      fontFamily: "PeydaSemiBold",
    },
    chartTitle: {
      ...commonTypography('16px', '20px'),
      fontFamily: "PeydaLight",
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
    border: {
      main: "#E3E3E6",
      dark: "#9e9ea1",
      light: "#e8e8eb"
    },
    textColor: {
      main: "#A4A4A4",
      light: "#b6b6b8",
      dark: "#5E5E5E",
      subTitle: "#dcdcdc"
    },
    background: {
      default: "linear-gradient(195deg, #FCFCFF 24.09%, #EBEBEB 100%)",
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
    border: {
      main: "#9e9ea1",
      dark: "#6b6b6e",
      light: "#b4b4b8"
    },
    background: {
      default: "#181D23",
    },
    textColor: {
      main: "#b6b6b8",
      light: "#b6b6b8",
      dark: "#5E5E5E",
      subTitle: "#5E5E5E"

    },
    text: {
      primary: "#FFF",
      secondary: "#BBB",
    },
  },
});