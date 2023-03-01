// ! fetch the storage of the contract DVOTE
import axios from "axios";
export const fetchStorage = async () => {
    console.log("url", `https://api.ghostnet.tzkt.io/v1/contracts/KT1PBvGManQUdZzdZyCmQ8vQJaZJE8sUCxCN/storage`)
    const res = await axios.get(
        `https://api.ghostnet.tzkt.io/v1/contracts/KT1PBvGManQUdZzdZyCmQ8vQJaZJE8sUCxCN/storage`
    )
    return res.data;
}