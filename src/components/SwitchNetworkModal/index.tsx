import { useState } from "react"
import Modal, { IModalProps } from "../Modal"
import ErrorIcon from '@mui/icons-material/Error';
import { Button } from "@mui/material";

function SwitchNetworkModal () {
    const [open, setOpen] = useState(false)
    
    const content = <div className="flex-row flex-content-center">
        <ErrorIcon/>
        <span>Folowhale App only works on Ethereum Mainnet</span>
        <Button>Swith to Ethereum</Button>
    </div>

    const modalProps: IModalProps = {
        open: open,
        handleOpen: setOpen,
        titleMain: `Wrong network`,
        content,
    }

    return <Modal {...modalProps} />
}

export default SwitchNetworkModal