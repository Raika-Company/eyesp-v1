import { createTheme } from "@mui/material";

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
const createTypography = (fontSize, fontWeight) => ({
  ...commonTypography,
  fontSize,
  fontWeight,
});

/**
 * Base theme configuration.
 * @type {Object}
 */
const baseTheme = {
  typography: {
    h1: createTypography("2.45744rem", 700),
    h2: createTypography("1.90656rem", 600),
    h3: createTypography("1.5625rem", 700),
    h4: createTypography("2.58025rem", 700),
    h5: createTypography("2.3125rem", 700),
    h6: createTypography("1.67806rem", 800),
    body1: {
      ...commonTypography,
      textAlign: "right",
      textLeadingTrim: "both",
      textEdge: "cap",
      fontSize: "1.51394rem",
      fontWeight: 600,
    },
    body2: {
      fontFamily: "Peyda, sans-serif",
      fontSize: 16,
    },
    subtitle1: createTypography("1.83331rem", 600),
    subtitle2: createTypography("1.65rem", 600),
    button: createTypography("2.05794rem", 500),
    caption: createTypography("1.65rem", 600),
    overline: createTypography("1.12656rem", 600),
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
    text: {
      primary: "#FFF",
      secondary: "#BBB",
    },
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
