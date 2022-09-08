import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TextLabel = styled(Typography)(({ theme }) => ({
    fontFamily: "Inter", 
    color: theme.palette.primary.main
}));

export const HighlightText = styled(Typography)(({ theme }) => ({
    color: '#e76c6c',
    fontWeight: 'bold'
}))

export const BasicButton = styled(Button)(({theme}) => ({
    borderRadius: "13px",
    height: "52px", 
    border: `1px solid ${theme.palette.primary.main }` 
}));

export const BasicBox  = styled(Box)(({theme}) => ({
    borderRadius: "13px",
    width: "100%",
    padding: "8px",
    border: `1px solid ${theme.palette.primary.main }` 
}));

export const ContentWrapper = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "row", 
    justifyContent: "center",
    paddingTop: "140px",
    paddingLeft: "32px",
    paddingRight: "32px",
    [theme.breakpoints.down("md")] :{
        paddingTop: "80px",
        paddingLeft: "16px",
        paddingRight: "16px",
    }
}));

export const ContentBox = styled(Box)(({theme}) => ({
    width: "100%",
    [theme.breakpoints.up("md")]:{
        maxWidth: "1280px",
    }
}));

export const FlexRow = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "row",
}));


export const FlexColumn = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
}));


export const FlexRowCenter = styled(FlexRow)(({theme}) => ({
    alignItems: "center"
}));

export const MainContentWrapper = styled(Box)(({theme}) => ({
    paddingTop: "140px"
}));