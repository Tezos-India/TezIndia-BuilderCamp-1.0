import { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../utils/wallet";
import "./Navbar.css"

const Navbar = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  // TODO 4.a - Create onConnectWallet function
  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };

  return (
    <nav>
      <div className="logo">
         .
      </div>
      <div className="container">
        <a href="https://smartpy.io/explorer?address=KT1XCMYEw6BD73cz3BNhVKZCdjEhLgYdyY2q" className="navbar">
          Tezos Lottery
        </a>
      </div>
        <div className="acc">
          {/* TODO 4.b - Call connectWallet function onClick  */}
          <button onClick={onConnectWallet} className="btn3">
            {/* TODO 5.a - Show account address if wallet is connected */}
            {account !== "" ? account : "Connect Wallet"}
          </button>
        </div>
          
    </nav>
  );
};

export default Navbar;
