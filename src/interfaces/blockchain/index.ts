import { ethers } from "ethers"

export interface IToken {
    name: string,
    decimals: number,
    tokenAddress?: string,
    icon?: any
}

export interface ITokenBalance {
    balance: string,
    balanceRaw: string,
    decimals: number,
    tokenName: string
}

export interface IWithdraw {
    currencyType: string,
    amount: string,
}

export interface IWithdrawableBalance {
    name: string,
    tokenAddress: string,
    withdrawableFWhaleTokenBalance: string,
    withdrawableDepositShare: string,
    withdrawableDepositShareRaw: ethers.BigNumber,
    fWhaleTokenBalanceInUSD: string,
    fWhaleTokenBalance: string
}