// import Folowhale from '../../assets/abi/Folowhale.json'
// import { useAppSelector } from "../../store/hooks";
// import { useWeb3Context } from "../web3";
// import { ethers } from 'ethers';
// import { transactionCompleted, transactionError, transactionInitiated, transactionSuccess } from '../../store/slices/transaction-slice';
// import { useDispatch } from 'react-redux';
// import { metamaskErrorWrap, sleep } from '../../utils';

const useDeposit = (tokenType: string, amountValue: string) => {
    // const { provider } = useWeb3Context();
    // const fWhaleContractAddress = useAppSelector(state => state.app.contractAddresses?.FOLOWHALE);
    // const tokenAddresses = useAppSelector(state => state.app.tokenAddresses);

    // const dispatch = useDispatch()

    // const depositFunction = async () => {
    //     try {
    //         const signer = provider.getSigner();
    //         const tokenObj = tokenAddresses?.find(token => token.name === tokenType);
    //         const { decimals, tokenAddress } = tokenObj!;

    //         const inputValue = ethers.utils.parseUnits(amountValue, decimals);

    //         const fWhaleContract = new ethers.Contract(fWhaleContractAddress, Folowhale, signer);
    //         const tx = await fWhaleContract.deposit(inputValue, tokenAddress);

    //         dispatch(transactionInitiated({
    //             txnHash: tx.hash,
    //             type: 'deposit'
    //         }))

    //         const receipt = await tx.wait();

    //         dispatch(transactionSuccess());

    //         return receipt;

    //     } catch (err) {
    //         metamaskErrorWrap(err, dispatch);
    //         dispatch(transactionError({ type: 'deposit' }));
    //     } finally {
    //         await sleep(4)
    //         dispatch(transactionCompleted())
    //     }
    // }

    // return depositFunction;
}

export default useDeposit;