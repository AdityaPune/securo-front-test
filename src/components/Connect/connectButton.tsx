import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { SUPPORTED_NETWORKS } from "../../constants/blockchain";
import { useWeb3Context } from "../../hooks/web3";
import "./connect-button.scss"

// This is a connect button for web3Modal plugin
function ConnectMenu() {
    const { connect, disconnect, connected, web3, providerChainID, checkWrongNetwork } = useWeb3Context();
    const [isConnected, setConnected] = useState(connected);

    let buttonText = "Connect Wallet";
    let clickFunc: any = connect;
    const wrongNetwork = isConnected && !SUPPORTED_NETWORKS.includes(providerChainID)

    if (isConnected) {
        buttonText = "Disconnect";
        clickFunc = disconnect;
    }

    // let pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
    //     return state.pendingTransactions;
    // });

    // if (pendingTransactions && pendingTransactions.length > 0) {
    //     buttonText = `${pendingTransactions.length} Pending `;
    //     clickFunc = () => {};
    // }

    if (wrongNetwork) {
        buttonText = "Wrong network";
        clickFunc = () => {
            checkWrongNetwork();
        };
    }

    useEffect(() => {
        setConnected(connected);
    }, [web3, connected]);

    return (
        <div className="connect-button" >
            <Button variant='outlined' className={wrongNetwork?`alert`: ``}onClick={clickFunc}>{buttonText}</Button>
            {/* {pendingTransactions.length > 0 && (
                <div className="connect-button-progress">
                    <CircularProgress size={15} color="inherit" />
                </div>
            )} */}
        </div>
    );
}

export default ConnectMenu;