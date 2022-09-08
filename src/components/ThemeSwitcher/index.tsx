import { useContext } from "react";
import { Switch } from "@mui/material";
import { CustomThemeContext } from "../../theme/CustomThemeProvider";

function ThemeSwitcher() {
    const { currentTheme, setTheme } = useContext(CustomThemeContext);

    const handleChange = (event: any) => {
        const checked = event.target.checked;
        const theme = currentTheme === "dark" ? "light" : "dark";
        setTheme(theme);
    };

    return <Switch onChange={handleChange}/>

}

export default ThemeSwitcher;