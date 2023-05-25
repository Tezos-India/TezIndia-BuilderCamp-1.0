// TODO 2.a - Setup beacon wallet instance
import { BeaconWallet } from "@taquito/beacon-wallet";

export const wallet = new BeaconWallet({
  name: "Tezos HallMark Builder NFT",
  preferredNetwork: "ghostnet",
});

// TODO 2.b - Setup connectWallet function (on ghostnet)
export const connectWallet = async () => {
  await wallet.requestPermissions({ network: { type: "ghostnet" } });
};

export const disconnectWallet = async () => {
  await wallet.clearActiveAccount()
}

// TODO 2.c - Setup getAccount function
export const getAccount = async () => {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    return activeAccount.address;
  } else {
    return "";
  }
};