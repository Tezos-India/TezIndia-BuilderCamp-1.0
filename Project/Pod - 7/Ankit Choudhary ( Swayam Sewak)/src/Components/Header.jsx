import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../Utils/AuthProvider";

import Button from "./Button";
import Logo from "../Assets/LogoWhiteFilled.svg";

const Header = () => {
	const { address, connectWallet, disconnectWallet } = useContext(AuthContext);

	const [minifiedAddress, setMinifiedAddress] = useState("...");

	const onConnectWallet = async () => {
		await connectWallet();
		address && navigator.clipboard.writeText(address);
		address &&
			toast.success(
				`${
					address.slice(0, 5) + "..." + address.slice(-5)
				} connected successfully. Address copied to clipboard`,
				{
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				}
			);
	};

	const onDisconnectWallet = async () => {
		await disconnectWallet();

		setMinifiedAddress("...");
		toast.success(`Wallet disconnected!`, {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	};

	useEffect(() => {
		if (address) {
			setMinifiedAddress(address.slice(0, 5) + "..." + address.slice(-5));
		}
	}, [address]);

	return (
		<div className="bg-[#232323] flex flex-col gap-[15px] md:gap-0 md:flex-row justify-between items-center py-10 px-30 border-primaryWidth border-white/10 rounded-50 md:sticky top-[20px] z-50 mx-[20px] mb-[30px] box-border">
			<NavLink to="/" replace={true}>
				<div className="flex flex-row items-center justify-center gap-[15px]">
					<img
						src={Logo}
						className="h-[40px] w-[40px] rounded-full"
						alt="Logo"
					/>
					<h1 className="text-white font-normal text-[25px] leading-[42px] text-center gotu">
						स्वयंसेवक
					</h1>
				</div>
			</NavLink>
			<ul className="flex flex-wrap gap-[15px]">
				<NavLink to="/" replace={true}>
					<li className="text-white/70 font-medium text-[12px] leading-[18px] cursor-pointer hover:text-white transition selected:text-black">
						Home
					</li>
				</NavLink>
				<NavLink to="/explore" replace={true}>
					<li className="text-white/70 font-medium text-[12px] leading-[18px] cursor-pointer hover:text-white transition selected:text-black">
						Explore
					</li>
				</NavLink>
				<NavLink to="/dashboard" replace={true}>
					<li className="text-white/70 font-medium text-[12px] leading-[18px] cursor-pointer hover:text-white transition selected:text-black">
						Dashboard
					</li>
				</NavLink>
			</ul>
			<Button
				varient="light"
				gradient={true}
				weight={"bold"}
				style={"md:w-auto w-full"}
				onClick={address ? onDisconnectWallet : onConnectWallet}
			>
				{address ? minifiedAddress : "Connect Wallet"}
			</Button>
		</div>
	);
};

export default Header;
