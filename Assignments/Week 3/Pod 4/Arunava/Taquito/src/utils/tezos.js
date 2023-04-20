// TODO 1 - Setup Tezos Toolkit
import {TezosToolkit} from "@taquito/taquito";
export const tezoss = new TezosToolkit("https://jakartanet.smartpy.io");

// TODO 3 - Specify wallet provider for Tezos instance
tezoss.setWalletProvider(wallet); 