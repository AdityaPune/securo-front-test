import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ICON from "../../assets/images/alert/ICON.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from '../../services/auth/authProvider';
import { updateInactivityStatus } from "../../store/slices/inactivity-slice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        paper: {
            width: "700px",
            height: "230px"
        },
        expireMessage: {
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "33px",
            letterSpacing: "0.0015em"
        },
        loginAgainMessage: {
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "27.24px",
            letterSpacing: "0.0015em",
            marginBottom: "20px"
        },
        okButton: {
            width: "130.15px",
            height: "34px",
            backgroundColor: "#76D1BF",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "27px",
            textAlign: "center",
            color: "white",
            '&:hover': {
                backgroundColor: "#53cdb4"
            }
        }
    }),
);

function AlertBox() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    let { logout } = useAuth()
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        dispatch(updateInactivityStatus(false))
        logout();
        navigate("/");
    };

    return (
        <div>
            <Backdrop className={classes.backdrop} open={open}>
                <Dialog open={open} classes={{ paper: classes.paper }}>
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Box><img src={ICON} /></Box>
                    </Box>
                    <Box display="flex" justifyContent="center" className={classes.expireMessage}>
                        <Box>User Session is expired!</Box>
                    </Box>
                    <Box display="flex" justifyContent="center" className={classes.loginAgainMessage}>
                        <Box>Please try to login again.</Box>
                    </Box>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Box>
                            <Button onClick={handleClose} className={classes.okButton}>
                                OK
                            </Button>
                        </Box>
                    </Box>
                </Dialog>
            </Backdrop>
        </div >
    );
}
export default AlertBox;