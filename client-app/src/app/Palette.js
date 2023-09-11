import {
  createTheme
} from "@mui/material";

/**
 * Common typography settings.
 * @type {Object}
 */
const commonTypography = {
  fontFamily: "Peyda",
  fontStyle: "normal",
  lineHeight: "normal",
};

/**
 * Create typography style with given font size and weight.
 *
 * @function
 * @param {string} fontSize - The font size.
 * @param {number} fontWeight - The font weight.
 * @returns {Object} A typography style object.
 */
const createTypography = (fontSize) => ({
  ...commonTypography,
  fontSize,
});

/**
 * Base theme configuration.
 * @type {Object}
 */
const baseTheme = {
  typography: {
    h1: createTypography("clamp(1.3rem,1.3rem + 3vw, 2.2rem)"),
    h2: createTypography("clamp(1rem,1rem + 3vw, 1.6rem)"),
    h3: createTypography("clamp(1rem,1rem + 3vw, 1.3rem)"),
    h4: createTypography("clamp(1rem,1rem + 3vw, 1.2rem)"),
    h5: createTypography("clamp(0.5rem,0.5rem + 3vw, 1.1rem)"),
    h6: createTypography("clamp(0.8rem,1rem + 3vw, 1rem)"),
    body1: {
      ...commonTypography,
      textAlign: "right",
      textLeadingTrim: "both",
      textEdge: "cap",
      fontSize: "1.51394rem",
    },
    body2: {
      fontFamily: "Peyda, sans-serif",
      fontSize: 16,
    },
    subtitle1: createTypography("clamp(0.4rem,0.4rem + 3vw, 1.6rem)"),
    subtitle2: createTypography("clamp(0.01rem,0.01rem + 3vw, 1.3rem)"),
    button: createTypography("clamp(0.6rem,0.6rem + 3vw, 1.1rem)"),
    caption: createTypography("1.65rem"),
    overline: createTypography("clamp(1rem,1rem + 3vw,0.5rem)"),
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
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 28.442747116088867px 0px rgba(0, 0, 0, 0.03)",
          borderRadius: 20,
          background: "#E8E8E8",
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
    MuiTableCell: {
      styleOverrides: {
        root: createTypography("1.65rem", 600),
      },
    },
  },
};


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
  components: {
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
  typography: {
    h1: {
      fontFamily: "Peyda, serif",
    },
    h2: {
      fontFamily: "Peyda, serif",
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
      fontFamily: "Peyda, serif",
      fontWeight: 700,
      fontSize: 25,
      lineHeight: "normal",
      fontStyle: "normal",
    },
    h6: {
      fontFamily: "Peyda, serif",
      fontSize: 25,
    },
    body1: {
      fontFamily: "Peyda, sans-serif",
      fontSize: 18,
    },
    body2: {
      fontFamily: "Peyda, sans-serif",
      fontSize: 16,
    },
    subtitle1: {
      fontFamily: "Peyda, sans-serif",
      fontSize: "1.35rem",
      fontWeight: 500,
      opacity: 0.5,
    },
    subtitle2: {
      fontFamily: "Peyda, sans-serif",
      fontSize: "1rem",
      fontWeight: 500,
      opacity: 0.3,
    },
    fontFamily: "Peyda",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#171717",
          boxShadow: "0px 0px 28.442747116088867px 0px rgba(0, 0, 0, 0.03)",
          borderRadius: 20,
        },
      },
    },
  },
});