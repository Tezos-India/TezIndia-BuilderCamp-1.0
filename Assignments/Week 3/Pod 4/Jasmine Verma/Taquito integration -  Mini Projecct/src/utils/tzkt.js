

import axios from "axios";

export const fetchStorage = async () => {
  const res = await axios.get(
    "https://api.ghostnet.tzkt.io/v1/contracts/KT1LCMdQ69rkGmWKSzVn79eF5kudYNZ1bNDC/storage"
  );
  return res.data;
};
