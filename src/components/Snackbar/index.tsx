import { Alert, AlertColor, Snackbar } from "@mui/material";

export interface SnackBarProps {
    open: boolean, 
    handleOpen: any,
    autoHideDuration?: number, 
    message?: string,
    action?: any
    type: AlertColor; // `error`, `warning`, `info`, `success`
}

function ThemedSnackBar(props: SnackBarProps) {
    const {
        open,
        handleOpen,
        message,
        autoHideDuration,
        action,
        type
    } = props;

    const handleClose = (event: any, reason?: any) => {
        if (reason === 'clickaway') {
            return;
        }
      
        handleOpen(false);
    }

    return <>
        <Snackbar
            onClose={handleClose}
            open={open}
            action={action}
            autoHideDuration={autoHideDuration || 5000}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Alert 
                severity={type}
                sx={{ width: '100%' }}
                onClose={handleClose}>
                    {message}
            </Alert>
        </Snackbar>
    </>;
}

export default ThemedSnackBar;