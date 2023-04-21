// TODO 2.a - Setup a Beacon Wallet instance'
import {BeaconWallet} from "@taquito/beacon-wallet"

const wallet = new BeaconWallet({
    name: "Tezos Lottery Dapp",
    preferredNetwork: "jakartanet",
});

// TODO 2.b - Complete connectWallet function (for ithacanet)
export const connectWallet = async () => {
    await wallet.requestPermissions({network: {type: "jakartanet"}})
};

// TODO 2.c - Complete getAccount function
export const getAccount = async () => {
    const currentAccount = await wallet.client.getActiveAccount();

    if (currentAccount) {
        return currentAccount.address;
    } else {
        return ""
    }
};
