import { JsonRpcProvider, StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers"
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ReactElement, useCallback, useState, useMemo, useContext } from "react"
import { useDispatch } from "react-redux"
import { DEFAULT_NETWORK, Networks, SUPPORTED_NETWORKS } from "../../constants/blockchain"
import { messages } from "../../constants/messages";
import { switchNetwork } from "../../utils";
import React from "react";

type onChainProvider = {
    connect: () => Promise<Web3Provider>;
    disconnect: () => void;
    checkWrongNetwork: () => Promise<boolean>;
    provider: JsonRpcProvider;
    address: string;
    connected: Boolean;
    web3Modal: Web3Modal;
    chainID: number;
    web3?: any;
    providerChainID: number;
    hasCachedProvider: () => boolean;
};

export const getMainnetURI = (): string | undefined => {
    return process.env.REACT_APP_ETHEREUM_RPC_ENDPOINT
}

export type Web3ContextData = {
    onChainProvider: onChainProvider;
} | null;

const Web3Context = React.createContext<Web3ContextData>(null);

export const useAddress = () => {
    const { address } = useWeb3Context();
    return address;
};

export const useWeb3Context = () => {
    const web3Context = useContext(Web3Context);
    if (!web3Context) {
        throw new Error("useWeb3Context() can only be used inside of <Web3ContextProvider />, " + "please declare it at a higher level.");
    }
    const { onChainProvider } = web3Context;
    return useMemo(() => {
        return { ...onChainProvider };
    }, [web3Context]);
};

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
    const dispatch = useDispatch()
    
    const [connected, setConnected] = useState(false)
    const [chainID, setChainID] = useState(DEFAULT_NETWORK);
    const [providerChainID, setProviderChainID] = useState(DEFAULT_NETWORK);
    const [address, setAddress] = useState("");

    const [uri, setUri] = useState(getMainnetURI());
    const [provider, setProvider] = useState<JsonRpcProvider>(new StaticJsonRpcProvider(uri))

    const [web3Modal] = useState<Web3Modal>(
        new Web3Modal({
            cacheProvider: true,
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        rpc: {
                            [Networks.ETHEREUM]: getMainnetURI(),
                        },
                    },
                },
            },
        }),
    );

    const hasCachedProvider = (): boolean => {
        if (!web3Modal) return false;
        if (!web3Modal.cachedProvider) return false;
        return true;
    };

    const _initListeners = useCallback(
        (rawProvider: JsonRpcProvider) => {
            if (!rawProvider.on) {
                return;
            }

            rawProvider.on("accountsChanged", () => setTimeout(() => window.location.reload(), 1));

            rawProvider.on("chainChanged", async (chain: number) => {
                changeNetwork(chain);
            });

            rawProvider.on("network", (_newNetwork, oldNetwork) => {
                if (!oldNetwork) return;
                window.location.reload();
            });
        },
        [provider],
    );

    const changeNetwork = async (otherChainID: number) => {
        const network = Number(otherChainID);

        setProviderChainID(network);
    };

    const connect = useCallback(async() => {
        try {
            const rawProvider = await web3Modal.connect();

            _initListeners(rawProvider);
    
            // Create provider
            const connectedProvider = new Web3Provider(rawProvider, "any");
    
            const chainId = await connectedProvider.getNetwork().then(network => Number(network.chainId));
            const connectedAddress = await connectedProvider.getSigner().getAddress();
    
            setAddress(connectedAddress);
    
            setProviderChainID(chainId);
    
            setProvider(connectedProvider);
    
            setConnected(true);
    
            return connectedProvider;
        } catch (err) {
            console.log(`Error in connect`, err)
        }
       

    }, [provider, web3Modal, connected])


    // Check Wrong Network
    const checkWrongNetwork = async (): Promise<boolean> => {
        if (!SUPPORTED_NETWORKS.includes(providerChainID)) {
            const shouldSwitch = window.confirm(messages.switch_to_ethereum);
            if (shouldSwitch) {
                await switchNetwork();
                window.location.reload();
            }
            return true;
        }

        return false;
    };


    const disconnect = useCallback(async () => {
        web3Modal.clearCachedProvider();
        setConnected(false);

        setTimeout(() => {
            window.location.reload();
        }, 1);
    }, [provider, web3Modal, connected]);


    const onChainProvider = useMemo(
        () => ({
            connect,
            disconnect,
            hasCachedProvider,
            provider,
            connected,
            address,
            chainID,
            web3Modal,
            providerChainID,
            checkWrongNetwork,
        }),
        [connect, disconnect, hasCachedProvider, provider, connected, address, chainID, web3Modal, providerChainID],
    );

    //@ts-ignore
    return <Web3Context.Provider value={{ onChainProvider }}>{children}</Web3Context.Provider>;
}
