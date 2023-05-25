// TODO 6 - Call mint entrypoint in the NFT contract
import { tezos } from "./tezos";
import {char2Bytes} from "@taquito/utils"

export const mintOperation = async (metadata) => {
  try {
    console.log("inside mint",char2Bytes("ipfs://" + metadata))
    const contractInstance = await tezos.wallet.at("KT1AQTuhEjSWY7UUs9SvzuZJHwEreVTdtMWz");
    const op = await contractInstance.methods.mint(char2Bytes("ipfs://" + metadata)).send();
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
};
