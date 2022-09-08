export enum Networks {
    ETHEREUM = 1,
    RINKEDBY = 4
}

export enum NetworkBlockExplores {
    ETHEREUM = "https://etherscan.io/",
    RINKEDBY = "https://rinkeby.etherscan.io/"
}

export const DEFAULT_NETWORK = Networks.ETHEREUM;

export const SUPPORTED_NETWORKS = [
    Networks.ETHEREUM,
    Networks.RINKEDBY
]

export const getBlockExplorerUrl = (networkID: number) => {
    if(networkID === Networks.ETHEREUM) return "https://etherscan.io/tx/"
    if(networkID === Networks.RINKEDBY) return "https://rinkeby.etherscan.io/tx/"

    throw Error(`Network not supported`)
}