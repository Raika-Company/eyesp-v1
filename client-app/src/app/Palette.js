import { createTheme } from '@mui/material';


const darkPalette = {
    primary: {
        main: '#bb86fc',
    },
    secondary: {
        main: '#03dac6',
    },
    background: {
        default: '#17202A',
        paper: '#1f1f1f',
    },
    text: {
        primary: '#fff',
        secondary: '#aaa',
    },
};

export const lightTheme = createTheme({
    direction: "rtl",
    palette: {
        primary: {
            main: "#526D82"
        },
        secondary: {
            main: "#27374D"
        },
        background: {
            default: "#9DB2BF",
            paper: "white", // Set the default background color for Paper components
        },
    },
    typography: {
        h1: {
            fontFamily: "IranianSans, serif",
        },
        h2: {
            fontFamily: "IranianSans, serif",
        },
        h3: {
            fontFamily: "IranYekan, serif",
            fontSize: "36px"
        },
        h4: {
            fontFamily: "IranYekan, serif",
        },
        h5: {
            fontFamily: "IranYekan, serif",
        },
        h6: {
            fontFamily: "IranYekan, serif",
        },
        body1: {
            fontFamily: "Harmattan, sans-serif",
            fontSize: 18
        },
        body2: {
            fontFamily: "Harmattan, sans-serif",
        },
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
    },
});


export const darkTheme = createTheme({
    palette: darkPalette,
    direction: 'rtl',
});