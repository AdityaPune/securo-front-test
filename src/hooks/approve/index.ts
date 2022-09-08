import Erc20Abi from '../../assets/abi/Erc20Abi.json';
import { useAppSelector } from "../../store/hooks";
import { useWeb3Context } from "../web3";
import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import { transactionCompleted, transactionError, transactionInitiated, transactionSuccess } from '../../store/slices/transaction-slice';
import { metamaskErrorWrap, sleep } from '../../utils';

const useApprove = (tokenType: string) => {
    // const { provider } = useWeb3Context();
    // const fWhaleContractAddress = useAppSelector(state => state.app.contractAddresses?.FOLOWHALE);
    // const tokenAddresses = useAppSelector(state => state.app.tokenAddresses);

    // const dispatch = useDispatch()

    // const approveFunction = async () => {
    //     try {
    //         const signer = provider.getSigner();
    //         const tokenObj = tokenAddresses?.find(token => token.name === tokenType);
    //         const { tokenAddress } = tokenObj!;

    //         const tokenContract = new ethers.Contract(tokenAddress!, Erc20Abi, signer);
    //         const tx = await tokenContract.approve(fWhaleContractAddress, ethers.constants.MaxUint256);

    //         dispatch(transactionInitiated({
    //             txnHash: tx.hash,
    //             type: 'approve'
    //         }))

    //         const receipt = await tx.wait();

    //         dispatch(transactionSuccess());

    //         return receipt
    //     } catch (err) {
    //         metamaskErrorWrap(err, dispatch);
    //         dispatch(transactionError({ type: 'approve' }));
    //     } finally {
    //         await sleep(2)
    //         dispatch(transactionCompleted())
    //     }
    // }

    // return approveFunction;
    return null
}

export default useApprove;