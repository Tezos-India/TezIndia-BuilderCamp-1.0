import axios from "axios";

export const fetchStorage = async () => {
  const res = await axios.get(
    "https://api.ghostnet.tzkt.io/v1/contracts/KT1Curd4boToSc3nHzQLxHiLsJhpZMSxRG6k/storage"
  );
  const response = await axios.get(`https://api.ghostnet.tzkt.io/v1/contracts/KT1Curd4boToSc3nHzQLxHiLsJhpZMSxRG6k/bigmaps/${res.data.owner_to_ideas}`);
  console.log(response)
};