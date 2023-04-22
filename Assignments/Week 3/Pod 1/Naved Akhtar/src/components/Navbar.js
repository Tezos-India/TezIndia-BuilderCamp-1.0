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

  const connectUserWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };

  const disconnectUserWallet = async () => {
      await disconnectWallet();
      setAccount("");
  }

  return (
    <div className="navbar navbar-dark bg-light fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand">
          Tezos Voting
        </a>
        <div className="d-flex">
          <button className="btn btn-secondary" onClick={connectUserWallet}>
            {account ? account : "Connect Wallet"}
          </button>
          {account ? <button className="btn btn-danger" onClick={disconnectUserWallet}>Disconnect</button> : ""}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
