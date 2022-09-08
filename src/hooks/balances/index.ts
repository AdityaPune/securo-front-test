// import { useCallback, useEffect } from "react";
// import { ethers } from "ethers";
// import { useDispatch } from "react-redux";
// import { useWeb3Context } from "../web3";
// import { loadTokenBalances } from "../../store/slices/app-slice";
// import { FWHALETOKEN_LABEL, getAddresses, TOKEN_LIST } from "../../constants/addresses";
// import Erc20Abi from '../../assets/abi/Erc20Abi.json'
// import FolowhaleAbi from "../../assets/abi/Folowhale.json"
// import { formatUnits } from "ethers/lib/utils";
// import AggregatorV3InterfaceABI from '../../assets/abi/AggregatorV3InterfaceABI.json';
// import { IToken, ITokenBalance, IWithdrawableBalance } from "../../interfaces/blockchain";
// import { loadWithdrawalBalances } from "../../store/slices/app-slice";

const useContractBalanceFunctions = () => {
    // const { providerChainID: networkID, address, provider, connected } = useWeb3Context()

    // const checkFWhaleBalance = useCallback(async () => {
    //     try {
    //         const addresses = getAddresses(networkID)
    //         const fWhaleAddress = addresses.FOLOWHALE
    //         const signer = provider.getSigner()
    //         const folowhaleContract = new ethers.Contract(fWhaleAddress, FolowhaleAbi, signer)
    //         const balanceRaw = await folowhaleContract.balanceOf(address)
    //         const balance = formatUnits(balanceRaw, 18)

    //         const result = {
    //             tokenName: FWHALETOKEN_LABEL,
    //             balance,
    //             balanceRaw: balanceRaw.toString(),
    //             decimals: 18
    //         }

    //         return { "FOLOWHALE": result }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, [address, networkID, provider])

    // const checkWithdrawableBalance = useCallback(async () => {
    //     try {
    //         const addresses = getAddresses(networkID);
    //         const fWhaleContractAddress = addresses.FOLOWHALE;
    //         const BTC_USD_Address = addresses.BTC_USD;

    //         const signer = provider.getSigner();
    //         if(fWhaleContractAddress === "" || fWhaleContractAddress === undefined) throw new Error(`Missing fWhaleContractAddress`)
    //         const fWhaleTokenContract = new ethers.Contract(fWhaleContractAddress, Erc20Abi, signer);
    //         if(address === "" || address === undefined) throw new Error(`Missing user address`)
    //         const fWhaleTokenBalance = await fWhaleTokenContract.balanceOf(address);

    //         const folowhaleContract = new ethers.Contract(fWhaleContractAddress, FolowhaleAbi, signer);
    //         const sharePriceInUSD = await folowhaleContract.getPricePerFullShare();

    //         const fWhaleTokenBalanceValue = sharePriceInUSD.mul(fWhaleTokenBalance).div(ethers.utils.parseUnits("1", 18));
    //         const fWhaleTokenBalanceValueInUSD = ethers.utils.formatUnits(fWhaleTokenBalanceValue);

    //         const priceFeed = new ethers.Contract(BTC_USD_Address, AggregatorV3InterfaceABI, signer);
    //         const roundData = await priceFeed.latestRoundData();

    //         const fWhaleTokenBalanceValueInBTC = ethers.utils.formatUnits(fWhaleTokenBalanceValue.mul(ethers.utils.parseUnits("1", 8)).div(roundData.answer.toString()))

    //         const depositShare = await folowhaleContract.depositShare(address);

    //         const depositShareValue = sharePriceInUSD.mul(depositShare).div(ethers.utils.parseUnits("1", 18));
    //         const depositShareValueInUSD = ethers.utils.formatUnits(depositShareValue);
    //         const depositShareValueInBTC = ethers.utils.formatUnits(depositShareValue.mul(ethers.utils.parseUnits("1", 8)).div(roundData.answer.toString()))

    //         const tokens = TOKEN_LIST.map((token: IToken) => {
    //             if (token.name.toUpperCase() !== "FOLOWHALE") {
    //                 if (token.name === "renBTC" || token.name === "sBTC" || token.name === "wBTC") {
    //                     return {
    //                         name: token.name.toUpperCase(),
    //                         tokenAddress: addresses[token.name.toUpperCase()],
    //                         withdrawableFWhaleTokenBalance: fWhaleTokenBalanceValueInBTC,
    //                         withdrawableDepositShare: depositShareValueInBTC,
    //                         withdrawableDepositShareRaw: depositShare,
    //                         fWhaleTokenBalanceInUSD: fWhaleTokenBalanceValueInUSD,
    //                         fWhaleTokenBalance: ethers.utils.formatUnits(fWhaleTokenBalance)
    //                     }
    //                 } else {
    //                     return {
    //                         name: token.name.toUpperCase(),
    //                         tokenAddress: addresses[token.name.toUpperCase()],
    //                         withdrawableFWhaleTokenBalance: fWhaleTokenBalanceValueInUSD,
    //                         withdrawableDepositShare: depositShareValueInUSD,
    //                         withdrawableDepositShareRaw: depositShare,
    //                         fWhaleTokenBalanceInUSD: fWhaleTokenBalanceValueInUSD,
    //                         fWhaleTokenBalance: ethers.utils.formatUnits(fWhaleTokenBalance)
    //                     }
    //                 }
    //             }
    //         })

    //         let result: { [x: string]: IWithdrawableBalance } = {};
    //         tokens.forEach(token => {
    //             if (token !== undefined) {
    //                 result[token.name] = token;
    //             }
    //         })

    //         return result;
    //     } catch (e) {
    //         console.log(e)
    //     }

    // }, [address, networkID, provider]);

    // const CheckBalance = useCallback(async () => {
    //     try {
    //         const addresses = getAddresses(networkID);

    //         const tokens = TOKEN_LIST.map((token: IToken) => {
    //             return {
    //                 name: token.name.toUpperCase(),
    //                 tokenAddress: addresses[token.name.toUpperCase()],
    //                 decimals: token.decimals
    //             }
    //         })

    //         if(address === undefined || address === "") throw new Error("Missing address")

    //         const signer = provider.getSigner()
    
    //         const balances = await Promise.all(tokens.map(async (token: IToken) => {
    //             const { tokenAddress, name: tokenName, decimals } = token

    //             if (tokenAddress === undefined) {
    //                 return
    //             }

    //             const tokenContract = new ethers.Contract(tokenAddress, Erc20Abi, signer)

    //             const balanceRaw = await tokenContract.balanceOf(address)
    //             const balance = ethers.utils.formatUnits(balanceRaw, decimals)

    //             return {
    //                 tokenName,
    //                 balance,
    //                 balanceRaw: balanceRaw.toString(),
    //                 decimals
    //             }
    //         }))

    //         let result: { [x: string]: ITokenBalance } = {}

    //         balances.forEach(b => {
    //             if (b !== undefined) {
    //                 result[b.tokenName.toUpperCase()] = b
    //             }
    //         })

    //         return result;
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [address, networkID, provider])

    // return { checkFWhaleBalance, checkWithdrawableBalance, CheckBalance };
    return null
}

async function useBalances() {
    // const dispatch = useDispatch()
    // const { providerChainID: networkID, address, provider, connected } = useWeb3Context()
    // const tokenAddresses = getAddresses(networkID);
    // const { checkFWhaleBalance, checkWithdrawableBalance, CheckBalance } = useContractBalanceFunctions();

    // useEffect(() => {
    //     let timer: any;

    //     const fetchBalances = async () => {
    //         let fWhaleResult = await checkFWhaleBalance();
    //         let result = await CheckBalance();
    //         result = { ...result, ...fWhaleResult };

    //         const withrawalBalanceResult = await checkWithdrawableBalance();
    //         dispatch(loadTokenBalances({ balances: result }))
    //         dispatch(loadWithdrawalBalances(withrawalBalanceResult));
    //     }

    //     if (networkID !== undefined &&
    //         address !== undefined &&
    //         provider !== undefined &&
    //         tokenAddresses !== undefined &&
    //         connected) {
    //         // Check balance
    //         fetchBalances()

    //         // Update balance for every 10s
    //         timer = setInterval(() => {
    //             fetchBalances()
    //         }, 10000)
    //     }

    //     return () => {
    //         clearInterval(timer)
    //     }

    // }, [networkID, address, provider, tokenAddresses, dispatch, connected])
}

export { useBalances, useContractBalanceFunctions };
