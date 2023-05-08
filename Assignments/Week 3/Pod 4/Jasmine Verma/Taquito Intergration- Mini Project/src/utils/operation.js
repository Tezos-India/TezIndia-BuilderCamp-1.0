// TODO 6 - Call buy_ticket entrypoint in the Lottery contract
import { tezos } from "./tezos";

export const buyTicketOperation = async (option) => {
  try {
    const contractInstance = await tezos.wallet.at("KT1LCMdQ69rkGmWKSzVn79eF5kudYNZ1bNDC");
    const op = await contractInstance.methods.default(parseInt(option)).send();
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
};

