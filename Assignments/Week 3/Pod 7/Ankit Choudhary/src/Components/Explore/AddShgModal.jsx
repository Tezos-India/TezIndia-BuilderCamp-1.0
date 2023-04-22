import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { tezos } from "../../Utils/tezos";
import { AuthContext } from "../../Utils/AuthProvider";

import Button from "../Button";

export default function AddShgModal({ setOpenAddSHG }) {
	const { address, connectWallet, disconnectWallet, connected } =
		useContext(AuthContext);

	const navigate = useNavigate();
	const [shgName, setShgName] = useState("");
	const [shgDescription, setShgDescription] = useState("");

	const addShg = async () => {
		try {
			const contractInstance = await tezos.wallet.at(
				"KT1PBdtCB3zJewqstimFAziSd1fj6Tn6p6rL"
			);
			const op = await contractInstance.methods
				.add_shg(shgDescription, shgName)
				.send();
			await op.confirmation(1);

			toast.success(`SHG created successfully!`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			setOpenAddSHG(false);
			navigate("/dashboard");
		} catch (err) {
			toast.error(`An unknown error occured!`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			throw err;
		}
	};

	return (
		<div
			onClick={() => {
				navigate("/explore");
				setOpenAddSHG(false);
			}}
			className="absolute top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center bg-primaryBlack/90 sm: md:px-20"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col items-center px-20 py-[100px] gap-[50px] bg-primaryBlack border-[3px] border-white/50 rounded-30 lg:w-3/4"
			>
				<h2 className="font-mammoth text-3xl tracking-wider text-white">
					Create your own SHG
				</h2>

				<div className="flex flex-col items-center p-0 gap-[20px] w-full lg:w-3/4">
					<input
						className="flex flex-row items-start px-20 py-10 bg-white/5 border-primaryWidth border-white/10 rounded-20 outline-none w-full font-medium text-sm text-white/70 placeholder:text-white/50"
						type="text"
						placeholder="Enter SHG name"
						value={shgName}
						onChange={(e) => setShgName(e.target.value)}
					/>
					<input
						className="flex flex-row items-start px-20 py-10 bg-white/5 border-primaryWidth border-white/10 rounded-20 outline-none w-full font-medium text-sm text-white/70 placeholder:text-white/50"
						type="text"
						placeholder="Enter SHG use case"
						value={shgDescription}
						onChange={(e) => setShgDescription(e.target.value)}
					/>

					<div className="flex flex-row items-center justify-center gap-[20px] w-full">
						{address ? (
							<>
								<p className="flex flex-row items-start px-20 py-10 bg-white/5 border-primaryWidth border-white/10 rounded-20 outline-none w-full font-medium text-sm text-white/70 text-center cursor-default">
									{"Your address - "}{" "}
									<span className="text-white">
										({address.slice(0, 5) + "..." + address.slice(-5)})
									</span>
								</p>
								<Button
									varient="light"
									gradient={false}
									weight={"medium"}
									style="w-full"
									onClick={async () => await disconnectWallet()}
								>
									Click to change your address
								</Button>
							</>
						) : (
							<Button
								varient="light"
								gradient={true}
								weight={"bold"}
								style="w-full"
								onClick={async () => await connectWallet()}
							>
								Connect Wallet
							</Button>
						)}
						<Button
							varient="light"
							gradient={true}
							weight={"bold"}
							style="w-full"
							onClick={addShg}
						>
							Submit
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
