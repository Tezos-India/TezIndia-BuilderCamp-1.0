import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { tezos } from "../../Utils/tezos";
import { fetchStorage } from "../../Utils/tzkt";
import { AuthContext } from "../../Utils/AuthProvider";

import Button from "../Button";
import Loader from "../Loader";

export default function ProposalModal({
	openProposalModal,
	setOpenDepositModal,
	setOpenRequestModal,
	setOpenProposalModal,
}) {
	const { address } = useContext(AuthContext);

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [proposalName, setProposalName] = useState("");
	const [proposalDesc, setProposalDesc] = useState("");
	const [amountAsked, setAmountAsked] = useState(0);
	const [timestamp, setTimestamp] = useState(0);
	const [proposer, setProposer] = useState("");
	const [inFavour, setInFavour] = useState(0);
	const [inAgainst, setInAgainst] = useState(0);

	const FormatFullDateString = (mill) => {
		const Day = new Date(mill).getDate();
		const Month = new Date(mill).toLocaleString("en-us", { month: "long" });
		const Year = new Date(mill).getFullYear();

		return Day + " " + Month + " " + Year;
	};

	useEffect(() => {
		(async () => {
			const storage = await fetchStorage();

			if (openProposalModal) {
				setProposalName(
					storage.proposalDetails[openProposalModal].proposalName
				);
				setProposalDesc(
					storage.proposalDetails[openProposalModal].proposalDescription
				);
				setAmountAsked(storage.proposalDetails[openProposalModal].amount);
				setProposer(storage.proposalDetails[openProposalModal].proposer);
				setTimestamp(storage.proposalDetails[openProposalModal].timeOfProposal);
				setInAgainst(storage.proposalDetails[openProposalModal].votesAgainst);
				setInFavour(storage.proposalDetails[openProposalModal].votesInFavour);
			}
		})();
	}, [openProposalModal]);

	const sendYes = async () => {
		try {
			const contractInstance = await tezos.wallet.at(
				"KT1PBdtCB3zJewqstimFAziSd1fj6Tn6p6rL"
			);

			const op = await contractInstance.methods
				.votingInFavour(openProposalModal)
				.send();
			await op.confirmation(1);

			toast.success(`Voting in favour done!`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			console.log("Voting in favour done");
		} catch (err) {
			throw err;
		}
	};

	const sendNo = async () => {
		try {
			const contractInstance = await tezos.wallet.at(
				"KT1PBdtCB3zJewqstimFAziSd1fj6Tn6p6rL"
			);

			const op = await contractInstance.methods
				.votingAgainst(openProposalModal)
				.send();
			await op.confirmation(1);

			toast.success(`Voting against it done!`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			console.log("Voting in favour done");
		} catch (err) {
			throw err;
		}
	};

	return (
		<div
			onClick={() => {
				setOpenDepositModal(false);
				setOpenRequestModal(false);
				setOpenProposalModal(null);
			}}
			className="absolute top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center bg-primaryBlack/90 sm: md:px-20"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col items-center px-20 py-[70px] gap-[70px] bg-primaryBlack border-[3px] border-white/50 rounded-30 lg:w-3/4"
			>
				{loading ? (
					<Loader varient="line" theme="dark" text={true} />
				) : (
					<>
						<h3 className="font-medium text-2xl text-white font-mammoth">
							Proposal Details
						</h3>

						<div className="flex flex-col items-center p-0 gap-[20px] w-full">
							<div className="flex flex-col items-center p-0 gap-[5px] w-full">
								<h4 className="font-medium text-xl text-white">
									{proposalName}
								</h4>
								<p className="font-medium text-xs text-center text-white/50 w-3/4">
									{proposalDesc}
								</p>
							</div>

							<div className="flex flex-row items-center justify-center gap-[50px]">
								<div>
									<p className="text-medium text-sm text-center text-white/30">
										Proposer:
									</p>
									<p
										title={proposer}
										className="text-medium text-sm text-center text-white/70 cursor-default"
									>
										{proposer.slice(0, 4) + "..." + proposer.slice(-4)}
									</p>
								</div>

								<div>
									<p className="text-medium text-sm text-center text-white/30">
										Proposed on:
									</p>
									<p className="text-medium text-sm text-center text-white/70">
										{FormatFullDateString(timestamp)}
									</p>
								</div>

								<div>
									<p className="text-medium text-sm text-center text-white/30">
										Votes in Favour:
									</p>
									<p className="text-medium text-sm text-center text-white/70">
										{inFavour}
									</p>
								</div>

								<div>
									<p className="text-medium text-sm text-center text-white/30">
										Votes Against:
									</p>
									<p className="text-medium text-sm text-center text-white/70">
										{inAgainst}
									</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col items-center p-0 gap-[20px] w-full lg:w-3/4">
							<div className="flex flex-row items-center justify-center w-full gap-[20px]">
								<Button
									varient="light"
									gradient={false}
									weight={"medium"}
									style="w-full bg-green-500/20 border-green-500/30 hover:bg-green-500/30"
									onClick={sendYes}
								>
									Vote in Favour
								</Button>
								<Button
									varient="light"
									gradient={false}
									weight={"medium"}
									style="w-full bg-red-500/20 border-red-500/30 hover:bg-red-500/30"
									onClick={sendNo}
								>
									Vote Against
								</Button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
