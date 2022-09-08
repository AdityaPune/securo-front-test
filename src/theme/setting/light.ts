import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        // background: {
        //     default: "#F5F5F5"
        // },
        primary: {
            main: "#76D1BF"
        },
        secondary: {
            main: "rgba(118, 209, 191, 0.08)"
        },
        text: {
            primary: "#000000",
            disabled: "##EAEAEA"
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#ffffff",
                    // "&:hover": {
                    //     border: "2px solid #76D1BF"
                    // },
                    borderRadius: "10px",
                    boxShadow: "none",
                    fontWeight: 700,
                    padding: "12px"
                },
                outlined: {
                    borderColor: "#630AFF",
                    border: "2px solid",
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
                    marginBottom: "5px"
                }
            }
        }
    },
    typography: {
        fontFamily: 'OpenSans',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 990,
            lg: 1200,
            xl: 1400,
        },
    }
});

export default lightTheme;