import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { tezos } from "../../Utils/tezos";
import { fetchStorage } from "../../Utils/tzkt";
import { AuthContext } from "../../Utils/AuthProvider";

import Button from "../Button";
import Loader from "../Loader";

export default function JoinShgModal({ shgId, setOpenJoinSHG, shgDetails }) {
	const { address } = useContext(AuthContext);

	const navigate = useNavigate();
	const [isAMember, setIsAMember] = useState(null);
	const [loading, setLoading] = useState(false);
	const [shgName, setShgName] = useState("...");
	const [shgDescription, setShgDescription] = useState("...");
	const [numberOfMembers, setNumberOfMembers] = useState("...");
	const [established, setEstablished] = useState("...");
	const [amountToDeposit, setAmountToDeposit] = useState("");

	useEffect(() => {
		if (shgDetails) {
			setShgName(shgDetails[shgId - 1].name);
			setShgDescription(shgDetails[shgId - 1].description);
			setShgDescription(shgDetails[shgId - 1].description);
			setNumberOfMembers(shgDetails[shgId - 1].members.length);
			setEstablished(shgDetails[shgId - 1].established);
		}
	}, [shgDetails]);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const storage = await fetchStorage();
			const shgId = storage.memberOfShg[`${address}`];
			if (shgId) {
				setIsAMember(shgId);
			} else {
				setIsAMember(null);
			}
			setLoading(false);
		})();
	}, []);

	const FormatFullDateString = (mill) => {
		const Day = new Date(mill).getDate();
		const Month = new Date(mill).toLocaleString("en-us", { month: "long" });
		const Year = new Date(mill).getFullYear();

		return Day + " " + Month + " " + Year;
	};

	const DepositJoinShg = async () => {
		try {
			const contractInstance = await tezos.wallet.at(
				"KT1PBdtCB3zJewqstimFAziSd1fj6Tn6p6rL"
			);
			const op = await contractInstance.methods.add_funds(shgId).send({
				amount: `${amountToDeposit * 1000000}`,
				mutez: true,
			});
			await op.confirmation(1);

			toast.success(
				`woohoo! Funds deposited successfully. You are now a member of an SHG`,
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

			navigate("/explore");
			setOpenJoinSHG(null);
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
				setOpenJoinSHG(null);
			}}
			className="absolute top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center bg-primaryBlack/90 sm: md:px-20"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col items-center px-20 py-[100px] gap-[50px] bg-primaryBlack border-[3px] border-white/50 rounded-30 lg:w-3/4"
			>
				{loading ? (
					<Loader varient="line" theme="dark" text={true} />
				) : isAMember ? (
					<>
						<h3 className="font-medium text-2xl text-white cursor-default">
							You are already a member of an SHG
						</h3>
						<Button
							varient="light"
							gradient={false}
							weight={"semibold"}
							style="w-1/3"
							onClick={() => {
								navigate("/explore");
								setOpenJoinSHG(null);
							}}
						>
							Close
						</Button>
					</>
				) : (
					<>
						<div className="flex flex-col items-center p-0 gap-[5px]">
							<h3 className="font-medium text-2xl text-white font-mammoth">
								{shgName}
							</h3>
							<p className="font-medium text-xs text-center text-white/50 w-3/4">
								{shgDescription}
							</p>
						</div>

						<div className="flex flex-row items-center justify-center gap-[50px]">
							<div>
								<p className="text-medium text-sm text-center text-white/30">
									Number of Members:
								</p>
								<p className="text-medium text-sm text-center text-white/70">
									{numberOfMembers} People
								</p>
							</div>

							<div>
								<p className="text-medium text-sm text-center text-white/30">
									SHG established on:
								</p>
								<p className="text-medium text-sm text-center text-white/70">
									{FormatFullDateString(established)}
								</p>
							</div>
						</div>

						<div className="flex flex-col items-center p-0 gap-[20px] w-full lg:w-3/4">
							<input
								className="flex flex-row items-start px-20 py-10 bg-white/5 border-primaryWidth border-white/10 rounded-20 outline-none w-full font-medium text-sm text-white/80 placeholder:text-white/50"
								type="number"
								placeholder="Enter amount to deposit (in ꜩ)"
								value={amountToDeposit}
								onChange={(e) => setAmountToDeposit(e.target.value)}
							/>

							<div className="flex flex-row items-center justify-center w-full">
								<Button
									varient="light"
									gradient={true}
									weight={"bold"}
									style="w-full"
									onClick={DepositJoinShg}
								>
									Deposit to Join SHG
								</Button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
