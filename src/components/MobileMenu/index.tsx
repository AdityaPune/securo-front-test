import { Drawer, IconButton, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles";

import '../app.scss'
import './mobile-menu.scss'
import Sidebar from "../Sidebar";

import CloseIcon from '@mui/icons-material/Close';
import ConnectMenu from "../Connect/connectButton";

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        [theme.breakpoints.up("md")]: {
            // width: "30vw",
            // flexShrink: 0,
        }
    },
    drawerPaper: {
        backgroundColor: theme.palette.background.default,
        height: "100vh"
    },
    closeIcon: {
        color: theme.palette.text.primary
    }
}));

export interface IMobileMenuProps {
    open: boolean,
    handleOpen: any
}

function MobileMenu({ open, handleOpen }: IMobileMenuProps) {
    const classes = useStyles();

    return <>
        <nav>
            <Drawer
                variant="temporary"
                anchor="left"
                open={open}
                onClose={() => handleOpen(false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                style={{ width: "60%" }}
            >
                <div className="flex-column flex-space-between menu-container">
                    {/* <div className="flex-row flex-end">
                        <IconButton onClick={() => handleOpen(false)} size="large">
                            <CloseIcon className={classes.closeIcon} />
                        </IconButton>
                    </div> */}

                    {/* <ConnectMenu /> */}
                    <Sidebar />
                </div>

            </Drawer>
        </nav>
    </>;
}

export default MobileMenu