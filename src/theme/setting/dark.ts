import { createTheme } from "@mui/material/styles";
// import { border } from "@mui/system";

const darkTheme = createTheme({
    palette: {
        background: {
            default: "#230695"
        },
        primary: {
            main: "#630AFF"
        },
        secondary: {
            main: "#9E67FF"
        },
        text: {
            primary: "#ffffff",
            disabled: "#9E67FF"
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#ffffff",
                    // "&:hover": {
                    //     border: "2px solid #ffffff"
                    // },
                    borderRadius: "0px",
                    boxShadow: "none"
                },
                outlined: {
                    border: "2px solid"
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    background: "#ffffff",
                    // border: "1px solid #000000"
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: "#230695"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: "#ffffff",
                    color: "#000000"
                }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    marginTop: 0,
                    height: 0,
                }
            }
        }
    },
    typography: {
        fontFamily: 'BitBold',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 990,
            lg: 1200,
            xl: 1400,
        },
    },
});

export default darkTheme;