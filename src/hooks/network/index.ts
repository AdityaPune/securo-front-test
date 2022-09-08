// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getAddresses, TOKEN_LIST } from "../../constants/addresses";
// import { SUPPORTED_NETWORKS } from "../../constants/blockchain";
// import { loadContractAddress, loadTokenAddresses } from "../../store/slices/app-slice";
// import { switchNetwork } from "../../utils";
// import { useWeb3Context } from "../web3";

function useNetwork() {
    // const { providerChainID: networkID, connected } = useWeb3Context()
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     async function changeNetwork() {
    //         await switchNetwork(); 
    //     }
    //     if(connected) {
    //         if(networkID !== undefined && SUPPORTED_NETWORKS.includes(networkID)) {
    //             // Find contract addresses based on network ID
    //             const addresses = getAddresses(networkID)
    //             dispatch(loadContractAddress({contractAddresses: addresses}))
    
    //             const baseTokenList = TOKEN_LIST ;
    //             const tokens:any = baseTokenList.map((b:any) => {
    //                 const name: string= b.name
    //                 const tokenAddress = addresses[`${name.toUpperCase()}`]
    //                 return {...b, ...{tokenAddress}}
    //             });
    //             dispatch(loadTokenAddresses({ tokenAddresses: tokens}))
    //         } else {
    //             // Perform change network request
    //             changeNetwork()
    //         }
    //     }
    // }, [networkID, connected])
}

export default useNetwork;