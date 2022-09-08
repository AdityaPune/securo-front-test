import React, { useState } from 'react';
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from './base';

export const CustomThemeContext = React.createContext(
    {
        currentTheme: 'light',
        setTheme: (color) => {},
    },
)

const CustomThemeProvider = (props) => {
    const { children } = props; 
    const currentTheme = localStorage.getItem("appTheme") || 'light';
    const [themeName, _setThemeName] = useState(currentTheme);
    const theme = getTheme(themeName);

    const setThemeName = (name) => {
        localStorage.setItem('appTheme', name);
        _setThemeName(name);
    }
    const contextValue = {
        currentTheme: themeName,
        setTheme: setThemeName
    }

    return (
        <CustomThemeContext.Provider value={contextValue}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </StyledEngineProvider>
        </CustomThemeContext.Provider>
    );
 } 

 export default CustomThemeProvider;
