import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

import { useEffect, useState } from "react";
import { connectWallet, getAccount, disconnectWallet } from "/home/tejas/Desktop/temp/TezIndia-BuilderCamp-1.0/Project/TejasSharma/final/src/utils/wallet.js";


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
  
	const disconnectYourWallet = async () => {
	  await disconnectWallet();
	  setAccount("");
  }
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/buyPlot' activeStyle>
			Buy Plot
		</NavLink>
		<NavLink to='/plots' activeStyle>
			Plots
		</NavLink>
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<NavBtn onClick={onConnectWallet} className="btn btn-outline-info">
          {/* TODO 5.a - Show account address if wallet is connected */}
          {account ? account : "Connect Wallet"}
		</NavBtn>
		{account ? <NavBtn onClick={disconnectYourWallet}>Disconnect</NavBtn> : ""}
	</Nav>
	</>
);
};

export default Navbar;
