import React, { useEffect, useState } from "react";
import "./view-base.scss";
import { useMediaQuery } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';
import { DRAWER_WIDTH, TRANSITION_DURATION } from "../../constants/style";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Titles } from "../Header";
import { useAuth } from "../../services/auth/authProvider";

interface IViewBaseProps {
    children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        [theme.breakpoints.up("md")]: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
    content: {
        width: "100vw",
        // padding: theme.spacing(1),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: TRANSITION_DURATION,
        }),
        height: "100%",
        overflow: "auto",
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: TRANSITION_DURATION,
        }),
        marginLeft: 0,
    },
}));

/** Handling for smaller screen size */
function ViewBase({ children }: IViewBaseProps) {
    const classes = useStyles();
    const isSmallerScreen = useMediaQuery("(max-width: 960px)")

    const { user } = useAuth()
    // useEffect(() => {
    //     console.log(`view base user`, user, !!user);
    // }, [user])

    return (
        <div className={`view-base-root ${!!user ? '' : 'not-authorized'}`}>
            {!!user && !isSmallerScreen && <Sidebar />}

            <div className={`${classes.content} ${isSmallerScreen && classes.contentShift}`} id="overall-content">
                <Header />
                <Titles />
                {children}
            </div>
        </div>
    );
}

export default ViewBase;