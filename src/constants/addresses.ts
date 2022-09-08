import { IToken } from "../interfaces/blockchain"
import { Networks } from "./blockchain"

import wbtcIcon from "../assets/images/tokens/wBtc.png";
import renBtcIcon from "../assets/images/tokens/renBtc.png";
import sBtcIcon from "../assets/images/tokens/sBtc.png";
import daiIcon from "../assets/images/tokens/dai.png";
import usdtIcon from "../assets/images/tokens/usdt.png";
import usdcIcon from "../assets/images/tokens/usdc.png";

export const FWHALETOKEN_LABEL = "fWhale"

const ETHEREUM_ADDRESSES: any = {
    WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
    SBTC: "0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6",
    RENBTC: "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D",
    FOLOWHALE: "",
    BTC_USD: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c"
}

const RINKEDBY_ADDRESS: any = {
    WBTC: "0x577D296678535e4903D59A4C929B718e1D575e0A",
    USDC: "0xDf5324ebe6F6b852Ff5cBf73627eE137e9075276",
    USDT: "0xb9C2513f73d570c18e121Bba86077e15fC6fDc38",
    DAI: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    SBTC: "0xe96a94AdA89d50A90DA6a1A4BD84d7A0277055e7",
    RENBTC: "0xdD1411eCa747977f789C041bf4Dc4fDDdE630CD1",
    FOLOWHALE: "0x747b9e31F87a3dd3FD9Bfa8317C15e1C8c35eC20",
    BTC_USD: "0xECe365B379E1dD183B20fc5f022230C044d51404"
}

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.ETHEREUM) return ETHEREUM_ADDRESSES
    if (networkID === Networks.RINKEDBY) return RINKEDBY_ADDRESS

    throw Error(`Network not supported`)
}

export const TOKEN_LIST: IToken[] = [
    { name: "wBTC", decimals: 8, icon: wbtcIcon },
    { name: "USDC", decimals: 6, icon: usdcIcon },
    { name: "USDT", decimals: 6, icon: usdtIcon },
    { name: "DAI", decimals: 18, icon: daiIcon },
    { name: "sBTC", decimals: 18, icon: sBtcIcon },
    { name: "renBTC", decimals: 8, icon: renBtcIcon },
]
