import dark from "./setting/dark";
import light from "./setting/light";

const themes = {
    dark, 
    light
}

export default function getTheme(theme) {
    return themes[theme];
}