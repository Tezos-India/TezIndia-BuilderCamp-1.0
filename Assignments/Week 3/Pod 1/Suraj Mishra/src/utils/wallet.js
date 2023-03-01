// TODO 2.a - Setup a Beacon Wallet instance
import {BeaconWallet} from "@taquito/beacon-wallet";

export const wallet = new BeaconWallet({
    name: " Tezos First dapp",
    preferredNetwork : "ghostnet"
});


// TODO 2.b - Complete connectWallet function (for ghostnet)
export const connectWallet = async () => {
    // request
    await wallet.requestPermissions({network:{type:"ghostnet"}});
};

// TODO 2.c - Complete getAccount function
export const getAccount = async () => {
    // active acc
    const activeAccount = await wallet.client.getActiveAccount();
    
    if(activeAccount){
        return activeAccount.address;
    }
    else{
        return "";
    }
};
