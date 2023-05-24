import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import config from "../config";
import { b58cencode, b58cdecode, prefix } from '@taquito/utils';


const preferredNetwork = "ghostnet";
const options = {
  name: "NFT",
  iconUrl: "https://tezostaquito.io/img/favicon.png",
  preferredNetwork: preferredNetwork,
};
const rpcURL = "https://ghostnet.smartpy.io";
const wallet = new BeaconWallet(options);

const getActiveAccount = async () => {
  return await wallet.client.getActiveAccount();
};


const connectWallet = async () => {
  let account = await wallet.client.getActiveAccount();

  if (!account) {
    await wallet.requestPermissions({
      network: { type: preferredNetwork },
    });
    account = await wallet.client.getActiveAccount();
  }
  return { success: true, wallet: account.address };
};

const disconnectWallet = async () => {
  await wallet.disconnect();
  return { success: true, wallet: null };
};

const checkIfWalletConnected = async (wallet) => {
  try {
    const activeAccount = await wallet.client.getActiveAccount();
    if (!activeAccount) {
      await wallet.client.requestPermissions({
        type: { network: preferredNetwork },
      });
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const createBusinessCard = async (name, title, company, email, number) => {
  const wallet = new BeaconWallet(options);
  const response = await checkIfWalletConnected(wallet);
  const activeAccount = await wallet.client.getActiveAccount();
  const decodedAddress = b58cdecode(activeAccount.address, prefix.tz1);
  const address = b58cencode(decodedAddress, prefix.tz1);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
    const operation = await contract.methods.mint(address, name, title, company, email, number).send();
    const result = await operation.confirmation();
    console.log(result);
  }
};

export const Burn = async (amount) => {
  const wallet = new BeaconWallet(options);
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
    const operation = await contract.methods.burn(amount).send();
    const result = await operation.confirmation();
    console.log(result);
  }
};

export const Transfer = async (address, amount) => {
  const wallet = new BeaconWallet(options);
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
    const operation = await contract.methods.transfer(amount, address).send();
    const result = await operation.confirmation();
    console.log(result);
  }
};

export {
  connectWallet,
  disconnectWallet,
  getActiveAccount,
  checkIfWalletConnected,
};
