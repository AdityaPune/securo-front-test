import { useContext, useEffect, useState } from "react";
import { CustomThemeContext } from "../../theme/CustomThemeProvider";

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function IconThemeSwitcher() {
    const { currentTheme, setTheme } = useContext(CustomThemeContext);
    const [icon, setIcon] = useState(<LightModeIcon/>)

    const changeTheme = () => {
        setTheme(currentTheme === 'light' ? 'dark' : 'light')
    }

    // Listen to current theme change
    useEffect(() => {
        setIcon(currentTheme === 'light' ? <DarkModeIcon/> : <LightModeIcon/>)
    }, [currentTheme])

    return <div style={{ cursor: "pointer" }} onClick={() => changeTheme()}>
        {icon}
    </div>
}

export default IconThemeSwitcher