// TODO 6 - Call buy_ticket entrypoint in the Lottery contract
import { tezos } from "./tezos";


// TODO 10 - Call end_game entrypoint in the Lottery contract
export const sellPlotCustomer = async (_houseId, _address, _amount) => {
  try {
    const contractInstance = await tezos.wallet.at("KT1QP42c4na2UxfPiuXTRRW7xeHAFgSsADc6");
    const op = await contractInstance.methods.sellPlotCustomer(_address, _amount, _houseId).send({
        amount: _amount,
        mutez : true
    });
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
};