// TODO 1 - Setup Tezos toolkit
import { TezosToolkit } from "@taquito/taquito";
import { wallet } from "./wallet";

export const tezos = new TezosToolkit("https://ghostnet.ecadinfra.com");

// TODO 3 - Specify wallet provider for Tezos instance
tezos.setWalletProvider(wallet);
