// TODO 8 - Fetch storage of the Lottery by completing fetchStorage
import axios from "axios";

export const fetchStorage = async () => {
  try {
    const res = await axios.get(
      "https://api.ghostnet.tzkt.io/v1/contracts/KT1HoDTDDvmXsPpFJkTTXs4T4bffZk7rxkBy/storage"
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Api for our cont
// https://api.ghostnet.tzkt.io/v1/contracts/KT1HoDTDDvmXsPpFJkTTXs4T4bffZk7rxkBy/storage
