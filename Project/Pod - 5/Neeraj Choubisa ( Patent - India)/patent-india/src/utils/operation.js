import { tezos } from "./tezoz";

export const registerIdea = async (desc, name, url) => {
  try {
    const contractInstance = await tezos.wallet.at(
      "KT1Curd4boToSc3nHzQLxHiLsJhpZMSxRG6k"
    );
    const op = await contractInstance.methods
      .patentYourIdea(name, desc, url)
      .send({
        amount: 200,
        mutez: true,
      });
    await op.confirmation(5);
  } catch (err) {
    throw err;
  }
};
