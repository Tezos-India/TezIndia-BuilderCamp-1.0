// TODO 8 - Fetch lottery contract storage

import axios from "axios";

export const fetchStorage = async () => {
  try{
  const res = await axios.get(
    "https://api.ghostnet.tzkt.io/v1/contracts/KT1XCMYEw6BD73cz3BNhVKZCdjEhLgYdyY2q/storage"
  );
  return res.data;
  }catch (err) {
    throw err;
  }
};
