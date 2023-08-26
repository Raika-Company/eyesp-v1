import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
    direction: "rtl",
    palette: {
        primary: {
            main: "#126AED"
        },
        secondary: {
            main: "#DB7F12"
        },
        background: {
            default: "linear-gradient(195deg, #FCFCFF 24.09%, #EBEBEB 100%)",
            paper: "white",
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
            fontSize: "36px"
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
            fontSize: 25
        },
        body1: {
            fontFamily: "PeydaMedium, sans-serif",
            fontSize: 18
        },
        body2: {
            fontFamily: "PeydaMedium, sans-serif",
            fontSize: 16
        },
        subtitle1: {
            fontFamily: "PeydaMedium, sans-serif",
            fontSize: 16,
            opacity: 0.3,
            color: "#000"
        }
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    left: "inherit",
                    right: "1rem",
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
                    direction: "rtl", 
                },
            },
        },
    },
});

// const darkPalette = {
//     primary: {
//         main: '#bb86fc',
//     },
//     secondary: {
//         main: '#03dac6',
//     },
//     background: {
//         default: '#17202A',
//         paper: '#1f1f1f',
//     },
//     text: {
//         primary: '#fff',
//         secondary: '#aaa',
//     },
// };

// export const darkTheme = createTheme({
//     palette: darkPalette,
//     direction: 'rtl',
// });