
import { tezos } from "./tezos";

export const vote = async(_address) => {
    try{
        const contractInstance = await tezos.wallet.at(process.env.REACT_APP_DVOTE_CONTRACT_ADDRESS);
        const op = await contractInstance.methods.vote(_address).send();

        await op.confirmation(1);
    }catch(err){
        throw err;
    }
}

export const addCandidate = async(_address) => {
    try{
        const contractInstance = await tezos.wallet.at(process.env.REACT_APP_DVOTE_CONTRACT_ADDRESS);
        const op = await contractInstance.methods.add_candidate(_address).send();

        await op.confirmation(1);
    }catch(err){
        throw err;
    }
}
export const endElection = async() => {
    try{
        const contractInstance = await tezos.wallet.at(process.env.REACT_APP_DVOTE_CONTRACT_ADDRESS);
        const op = await contractInstance.methods.endElection().send();

        await op.confirmation(1);
    }catch(err){
        throw err;
    }
}
export const startElection = async() => {
    try{
        const contractInstance = await tezos.wallet.at(process.env.REACT_APP_DVOTE_CONTRACT_ADDRESS);
        const op = await contractInstance.methods.startElection().send();

        await op.confirmation(1);
    }catch(err){
        throw err;
    }
}