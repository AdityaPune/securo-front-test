// import { ethers } from "ethers";
// import { useCallback } from "react";
// import { IWithdraw } from "../../interfaces/blockchain";
// import { useWeb3Context } from "../web3";
// import Folowhale from '../../assets/abi/Folowhale.json';
// import { useAppSelector } from "../../store/hooks";
// import { useDispatch } from "react-redux";
// import { transactionCompleted, transactionError, transactionInitiated, transactionSuccess } from '../../store/slices/transaction-slice';
// import { metamaskErrorWrap, sleep } from '../../utils';

function useWithdraw() {
    // const dispatch = useDispatch();
    // const { provider, chainID } = useWeb3Context();
    // const fWhaleContractAddress = useAppSelector(state => state.app.contractAddresses?.FOLOWHALE);
    // const tokenAddresses = useAppSelector(state => state.app.tokenAddresses);

    // const withdraw = useCallback(async ({ amount, currencyType }: IWithdraw) => {
    //     try {
    //         // Get contract detail
    //         const tokenObj = tokenAddresses?.find(token => token.name === currencyType);
    //         const { decimals, tokenAddress } = tokenObj!;

    //         // Create contract
    //         const signer = provider.getSigner()
    //         const contract = new ethers.Contract(fWhaleContractAddress, Folowhale, signer)

    //         // Transaction begin
    //         const transaction = await contract.withdraw(amount, tokenAddress)
    //         dispatch(transactionInitiated({
    //             txnHash: transaction.hash,
    //             type: 'withdraw'
    //         }))

    //         const receipt = await transaction.wait();

    //         dispatch(transactionSuccess());

    //         return receipt;
    //     } catch (e) {
    //         metamaskErrorWrap(e, dispatch);
    //         dispatch(transactionError({ type: 'withdraw' }));
    //     } finally {
    //         await sleep(4)
    //         dispatch(transactionCompleted())
    //     }
    // }, [provider])

    // return withdraw;
}

export default useWithdraw;