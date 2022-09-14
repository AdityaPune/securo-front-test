import { Paper } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

import './style.scss';

export interface IModalProps {
  open: boolean;
  handleOpen: (openModal: boolean) => void;
  titleMain: string;
  subTitle?: string;
  content: any;
  isNotBackdrop?: boolean;
  showCloseButton?: boolean;
  closeFunction?: () => void;
}

function CustomModal(props: Partial<IModalProps>) {
  const {
    handleOpen,
    content,
    isNotBackdrop,
    showCloseButton,
    closeFunction,
    open = false,
  } = props;

  const handleClose = (event: any, reason?: any) => {
    if (reason === 'backdropClick' && isNotBackdrop) {
      return;
    }

    if (reason === 'clickaway') {
      return;
    }

    if (closeFunction) {
      closeFunction();
    }

    if (handleOpen) {
      handleOpen(false);
    }
  };

  return (
    <Modal
      onClose={handleClose}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper className="modal-paper">
        {showCloseButton && <CloseIcon onClick={handleClose} />}

        <div className="modal-content">{content}</div>
      </Paper>
    </Modal>
  );
}

export default CustomModal;
