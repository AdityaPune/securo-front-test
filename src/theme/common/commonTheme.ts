export const typography = () => {
    const fontFamily = [
        "Inter",
        "BitBold"
    ].join(",");

    return {
        fontFamily,
        h1: {
            fontSize: "48px",
            fontWeight: "600",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            lineHeight: 1.2,
        },
        h2: {
            fontSize: "36px",
            fontWeight: "600",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            lineHeight: 1.2,
        },
        h3: {
            fontSize: "22px",
            fontWeight: "600",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            lineHeight: 1.2,
        },
        h4: {
            fontSize: "16px",
            fontWeight: "600",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            lineHeight: 1.2,
        },
        h5: {
            fontSize: "14px",
            fontWeight: "600",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            lineHeight: 1.2,
        },
        body1: {
            fontSize: "16px",
            fontWeight: "300",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
        },
        body2: {
            fontSize: "16px",
            fontWeight: "300",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
        },
        button: {
            textTransform: "none"
        }
    }
}

export const breakpoints = () => {
    return {
        values: {
            xs: 0,
            sm: 600,
            md: 990,
            lg: 1200,
            xl: 1400,
        },
    }
}