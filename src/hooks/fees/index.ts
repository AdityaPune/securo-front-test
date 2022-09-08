// import Folowhale from '../../assets/abi/Folowhale.json';
// import AggregatorV3InterfaceABI from '../../assets/abi/AggregatorV3InterfaceABI.json';
// import { useAppSelector } from "../../store/hooks";
// import { useWeb3Context } from "../web3";
// import { ethers } from 'ethers';
// import { getAddresses } from '../../constants/addresses';

const useFees = (tokenType: string, amountValue: string) => {
    // const { providerChainID: networkID, address, provider } = useWeb3Context();
    // const fWhaleContractAddress = useAppSelector(state => state.app.contractAddresses?.FOLOWHALE);
    // const tokenAddresses = useAppSelector(state => state.app.tokenAddresses);
    // const BTC_USD_Address = getAddresses(networkID).BTC_USD;

    // const getFees = async () => {
    //     try {
    //         const signer = provider.getSigner();
    //         const tokenObj = tokenAddresses?.find(token => token.name === tokenType);
    //         const { decimals, name } = tokenObj!;

    //         const fWhaleContract = new ethers.Contract(fWhaleContractAddress, Folowhale, signer);
    //         const priceFeed = new ethers.Contract(BTC_USD_Address, AggregatorV3InterfaceABI, signer);

    //         const roundData = await priceFeed.latestRoundData();
    //         let inputValue;

    //         if (name === "renBTC" || name === "sBTC" || name === "wBTC") {
    //             inputValue = ethers.utils.parseUnits(amountValue, 18).mul(roundData.answer.toString()).div(ethers.utils.parseUnits("1", 8));
    //         } else {
    //             inputValue = ethers.utils.parseUnits(amountValue, 18);
    //         }

    //         const networkFeeTier3_BN = await Promise.all([fWhaleContract.networkFeeTier3(0), fWhaleContract.networkFeeTier3(1), fWhaleContract.networkFeeTier3(2)])
    //         const networkFeePerc_BN = await Promise.all([fWhaleContract.networkFeePerc(0), fWhaleContract.networkFeePerc(1), fWhaleContract.networkFeePerc(2), fWhaleContract.networkFeePerc(3)])

    //         let feePercent;

    //         if (inputValue.lte(networkFeeTier3_BN[0])) {
    //             feePercent = networkFeePerc_BN[0];
    //         } else if (inputValue.lte(networkFeeTier3_BN[1])) {
    //             feePercent = networkFeePerc_BN[1];
    //         } else if (inputValue.lte(networkFeeTier3_BN[2])) {
    //             feePercent = networkFeePerc_BN[2];
    //         } else {
    //             feePercent = networkFeePerc_BN[3];
    //         }

    //         let _fee = inputValue.mul(ethers.utils.parseUnits(feePercent.toString())).div(ethers.utils.parseUnits("10000"));
    //         let _depositAfterFee;

    //         if (name === "renBTC" || name === "sBTC" || name === "wBTC") {
    //             _depositAfterFee = ethers.utils.formatUnits(inputValue.sub(_fee).mul(ethers.utils.parseUnits("1", 8).div(roundData.answer.toString())), 18);
    //         } else {
    //             _depositAfterFee = ethers.utils.formatUnits(inputValue.sub(_fee), 18);
    //         }

    //         let depositAfterFeeInString = _depositAfterFee.toString();

    //         return { depositAfterFee: Math.floor(parseFloat(depositAfterFeeInString) * 10000) / 10000, feePercent: feePercent.toNumber() / 100 }

    //     } catch (e) {
    //         console.log(e);
    //         return { depositAfterFee: 0, feePercent: 0 };
    //     }
    // }

    // return getFees;
}

export default useFees;