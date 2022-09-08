import Erc20Abi from '../../assets/abi/Erc20Abi.json';
import { useAppSelector } from "../../store/hooks";
import { useWeb3Context } from "../web3";
import { ethers } from 'ethers';

const useAllowance = (tokenType: string) => {
    // const { address, provider, connected } = useWeb3Context();
    // const fWhaleContractAddress = useAppSelector(state => state.app.contractAddresses?.FOLOWHALE);
    // const tokenAddresses = useAppSelector(state => state.app.tokenAddresses);

    // const getAllowance = async () => {
    //     try {
    //         const signer = provider.getSigner();
    //         if(tokenAddresses === undefined || tokenAddresses?.length <= 0) throw new Error(`tokenAddresses empty`)
    //         const tokenObj = tokenAddresses?.find(token => token.name.toUpperCase() === tokenType.toUpperCase());
    //         if(tokenObj === undefined) throw new Error(`tokenObj not found`)
    //         const { tokenAddress, decimals } = tokenObj!;

    //         const tokenContract = new ethers.Contract(tokenAddress!, Erc20Abi, signer);
    //         const allowanceRaw = await tokenContract.allowance(address, fWhaleContractAddress);
    //         const allowance = ethers.utils.formatUnits(allowanceRaw, decimals);

    //         return allowance;
    //     } catch (e) {
    //         console.log(e);
    //         return "";
    //     }
    // }

    // return getAllowance;
    return null
}

export default useAllowance;