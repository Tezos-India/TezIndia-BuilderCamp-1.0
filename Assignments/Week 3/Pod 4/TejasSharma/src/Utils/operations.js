// ! all the contract functions are called from here

import { tezos } from "./tezos";

export const RegisterCompany = async(address) => {
    try{
        console.log(address)
        const contractInstance = await tezos.wallet.at("KT1PBvGManQUdZzdZyCmQ8vQJaZJE8sUCxCN");
        const op = await contractInstance.methods.register(address).send();

        await op.confirmation(1);
    }catch(err){
        throw err;
    }
}

// ! admin fn below - only admin = ME can call these functions, for now
export const sendTez = async(_name) => {
    try{
        const contractInstance = await tezos.wallet.at("KT1PBvGManQUdZzdZyCmQ8vQJaZJE8sUCxCN");
        const op = await contractInstance.methods.send_money(_name).send({
            amount: 1,
            mutez: false,
        });

        await op.confirmation(1);
    }catch(err){
        throw err;
    }
}
export const remove_charity = async(_name) => {
    try{
        const contractInstance = await tezos.wallet.at("KT1PBvGManQUdZzdZyCmQ8vQJaZJE8sUCxCN");
        const op = await contractInstance.methods.remove_charity(_name).send();

        await op.confirmation(1);
    }catch(err){
        throw err;
    }
}
// export const startElection = async() => {
//     try{
//         const contractInstance = await tezos.wallet.at(process.env.REACT_APP_DVOTE_CONTRACT_ADDRESS);
//         const op = await contractInstance.methods.startElection().send();

//         await op.confirmation(1);
//     }catch(err){
//         throw err;
//     }
// }