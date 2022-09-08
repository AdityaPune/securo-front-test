import { Paper } from "@mui/material";
import Modal from '@mui/material/Modal';

import './modal.scss'

export interface IModalProps {
    open: boolean;
    handleOpen: (openModal: boolean) => void
    titleMain: string;
    subTitle?: string
    content: any;
    isNotBackdrop?:boolean
}

function CustomModal(props: IModalProps) {
    const {
        open,
        handleOpen,
        content,
        isNotBackdrop
    } = props;

    const handleClose = (event: any, reason?: any) => {
        if (reason === 'backdropClick' && isNotBackdrop) {
            return;
        }

        if (reason === 'clickaway') {
            return;
        }

        handleOpen(false);
    }

    return <Modal
            onClose={handleClose}
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper className="modal-paper">
                <div onClick={handleClose} className="cancel-setting" />
                <div className="modal-content">
                   {content}
                </div>
            </Paper>
        </Modal>
}

export default CustomModal;