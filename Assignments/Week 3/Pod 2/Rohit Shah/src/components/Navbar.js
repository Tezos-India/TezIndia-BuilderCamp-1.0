import { useEffect, useState } from "react";
import { connectWallet, getAccount,disconnectWallet } from "../utils/wallet"
const Navbar = ({
  account,
  setAccount
}) => {
  
  useEffect(() => {
    (async () => {
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  // connect to wallet
  const connectYourWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };

  const disconnectYourWallet = async () => {
      await disconnectWallet();
      setAccount("");
  }

  return (
    <div className="navbar navbar-dark bg-dark fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand">
          Tezos DVOTE
        </a>
        <div className="d-flex">
          <button className="btn btn-outline-info" onClick={connectYourWallet}>
            {account ? account : "Connect Wallet"}
          </button>
          {account ? <button className="btn btn-outline-info" onClick={disconnectYourWallet}>Disconnect</button> : ""}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
