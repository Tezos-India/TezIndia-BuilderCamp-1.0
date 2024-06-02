// TODO 8 - Fetch lottery contract storage

import axios from "axios";

export const fetchStorage = async () => {
  const res = await axios.get(
    "https://api.jakartanet.tzkt.io/v1/contracts/KT1JGp6cyFQPKprgJmHdfx1BKCAWvcscz6sR/storage"
  );
  return res.data;
};
