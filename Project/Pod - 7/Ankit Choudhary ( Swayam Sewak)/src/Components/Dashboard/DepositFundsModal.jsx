import React, { useState } from "react";
import { toast } from "react-toastify";

import { tezos } from "../../Utils/tezos";

import Button from "../Button";
import Loader from "../Loader";

export default function DepositFundsModal({
	shgId,
	setOpenDepositModal,
	setOpenRequestModal,
}) {
	const [loading, setLoading] = useState(false);
	const [amountToSend, setAmountToSend] = useState("");

	const OpenDepositFunds = async () => {
		try {
			const contractInstance = await tezos.wallet.at(
				"KT1PBdtCB3zJewqstimFAziSd1fj6Tn6p6rL"
			);
			const op = await contractInstance.methods.add_funds(shgId).send({
				amount: `${amountToSend * 1000000}`,
				mutez: true,
			});
			await op.confirmation(1);

			toast.success(`Funds deposited successfully!`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			setOpenDepositModal(false);
			setOpenRequestModal(false);
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
				setOpenDepositModal(false);
				setOpenRequestModal(false);
			}}
			className="absolute top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center bg-primaryBlack/90 sm: md:px-20"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col items-center px-20 py-[100px] gap-[50px] bg-primaryBlack border-[3px] border-white/50 rounded-30 lg:w-3/4"
			>
				{loading ? (
					<Loader varient="line" theme="dark" text={true} />
				) : (
					<>
						<h3 className="font-medium text-2xl text-white font-mammoth">
							Deposit Funds
						</h3>

						<div className="flex flex-col items-center p-0 gap-[20px] w-full lg:w-3/4">
							<input
								className="flex flex-row items-start px-20 py-10 bg-white/5 border-primaryWidth border-white/10 rounded-20 outline-none w-full font-medium text-sm text-white/80 placeholder:text-white/50"
								type="number"
								placeholder="Enter amount to deposit (in ꜩ)"
								value={amountToSend}
								onChange={(e) => setAmountToSend(e.target.value)}
							/>

							<div className="flex flex-row items-center justify-center w-full">
								<Button
									varient="light"
									gradient={true}
									weight={"bold"}
									style="w-full"
									onClick={OpenDepositFunds}
								>
									Deposit funds
								</Button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
