import { TezosToolkit } from "@taquito/taquito";
import { wallet } from "./wallet";

export const tezos = new TezosToolkit(process.env.REACT_APP_GHOSTNET_RPC_URL)
tezos.setWalletProvider(wallet);
