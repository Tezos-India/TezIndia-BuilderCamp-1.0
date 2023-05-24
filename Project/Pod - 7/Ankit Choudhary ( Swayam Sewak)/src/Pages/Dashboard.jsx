import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { tezos } from "../Utils/tezos";

import Button from "../Components/Button";
import Loader from "../Components/Loader";
import RequestFundsModal from "../Components/Dashboard/RequestFundsModal";
import DepositFundsModal from "../Components/Dashboard/DepositFundsModal";
import ProposalModal from "../Components/Dashboard/ProposalModal";

import { AuthContext } from "../Utils/AuthProvider";
import { fetchStorage } from "../Utils/tzkt";
import { CgArrowLongRight } from "react-icons/cg";

export default function Dashboard() {
	const navigate = useNavigate();

	const { address, connected, connectWallet } = useContext(AuthContext);

	const [loading, setLoading] = useState(false);
	const [isAMember, setIsAMember] = useState(false);
	const [activityLoading, setActivityLoading] = useState(false);
	const [collectingLoading, setCollectingLoading] = useState(false);
	const [openDepositModal, setOpenDepositModal] = useState(false);
	const [openRequestModal, setOpenRequestModal] = useState(false);
	const [openProposalModal, setOpenProposalModal] = useState(null);

	const [shgId, setShgId] = useState(null);
	const [shgName, setShgName] = useState("---");
	const [shgDesc, setShgDesc] = useState("---");
	const [shgEst, setShgEst] = useState("---");
	const [activity, setActivity] = useState([]);
	const [numberOfMembers, setNumberOfMembers] = useState(0);
	const [members, setMembers] = useState([]);
	const [shgBalance, setShgBalance] = useState(0);
	const [yourFunds, setYourFunds] = useState(0);

	useEffect(() => {
		updateData();
		fetchActivity();
	}, [address, connected]);

	// On toggle of Modal, change the scroll mode of body
	useEffect(() => {
		if (openRequestModal || openDepositModal || openProposalModal) {
			window.scroll(0, 0);
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "scroll";
		}
	}, [openRequestModal, openDepositModal, openProposalModal]);

	const updateData = async () => {
		setLoading(true);

		const storage = await fetchStorage();
		const shgId = storage.memberOfShg[`${address}`];

		// User is a member of a SHG
		if (shgId) {
			setShgId(shgId);
			setShgName(storage.shgDetails[shgId].shgName);
			setShgDesc(storage.shgDetails[shgId].shgDescription);
			setShgEst(storage.shgDetails[shgId].timeOfCreation);
			setNumberOfMembers(storage.shgDetails[shgId].numberOfFunders);
			setMembers(storage.shgDetails[shgId].funders);
			setShgBalance(storage.shgDetails[shgId].balance);
			setYourFunds(storage.shgDetails[shgId].funderDetails[`${address}`]);
			setIsAMember(true);
		}
		// User is not a member of any SHG
		else {
			setIsAMember(false);
		}

		setLoading(false);
	};

	const fetchActivity = async () => {
		setActivityLoading(true);

		const storage = await fetchStorage();
		const shgId = storage.memberOfShg[`${address}`];

		const ProposalIds = storage.proposalIdInShg[shgId];

		if (ProposalIds) {
			const AllProposals = [];

			ProposalIds.forEach((item) => {
				const proposalData = {};

				proposalData.id = item;
				proposalData.name = storage.proposalDetails[item].proposalName;
				proposalData.desc = storage.proposalDetails[item].proposalDescription;
				proposalData.amount = storage.proposalDetails[item].amount;
				proposalData.proposerAddress = storage.proposalDetails[item].proposer;
				proposalData.minifiedAddress =
					storage.proposalDetails[item].proposer.slice(0, 4) +
					"..." +
					address.slice(-4);
				proposalData.timestamp = storage.proposalDetails[item].timeOfProposal;
				proposalData.votesAgainst = storage.proposalDetails[item].votesAgainst;
				proposalData.votesInFavour =
					storage.proposalDetails[item].votesInFavour;

				AllProposals.push(proposalData);
			});

			setActivity(AllProposals);
		}

		setActivityLoading(false);
	};

	const onConnectWallet = async () => {
		await connectWallet();

		navigator.clipboard.writeText(address);
		toast.success(
			`${
				address && address.slice(0, 5) + "..." + address.slice(-5)
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

	// Implement the logic for collecting loan amount
	const CollectLoanAmount = async () => {
		setCollectingLoading(true);

		// activeProposal.id  --> proposal id
		// activeProposal.votesAgainst --> as name suggests
		// activeProposal.votesInFavour --> as name suggests
		// shgId --> shg ki id

		try {
			const storage = await fetchStorage();
			const proposalId = storage.proposalIdInShg[`${shgId}`];
			const votesInFavour =
				storage.proposalDetails[`${proposalId}`].votesInFavour;
			const votesAgainst =
				storage.proposalDetails[`${proposalId}`].votesAgainst;

			if (votesInFavour > votesAgainst) {
				const contractInstance = await tezos.wallet.at(
					"KT1PBdtCB3zJewqstimFAziSd1fj6Tn6p6rL"
				);

				const op = await contractInstance.methods
					.claimFund(proposalId, shgId)
					.send();
				await op.confirmation(1);
				// Yes logon ne jyada vote kiya hai no se
			} else {
				// Logon ne mostly mana kiya hai
				toast.error(
					`Can't claim! Members have decided not to lend tokens to you.`,
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
				setCollectingLoading(false);
			}

			toast.success(`Loan amount collected successfully!`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			setCollectingLoading(false);
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
			setCollectingLoading(false);
			throw err;
		}
	};

	const CopyAddress = () => {
		navigator.clipboard.writeText(address);
		toast.success(`Address copied to clipboard!`, {
			position: "top-center",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	};

	const FormatFullDateString = (mill) => {
		const Day = new Date(mill).getDate();
		const Month = new Date(mill).toLocaleString("en-us", { month: "long" });
		const Year = new Date(mill).getFullYear();

		return Day + " " + Month + " " + Year;
	};

	const handleOpenProposalModal = (id) => {
		setOpenProposalModal(id);
	};

	return loading ? (
		<div className="flex flex-col justify-center items-center gap-[20px] w-full h-full flex-1 px-10 lg:px-20 z-[inherit]">
			<Loader varient="line" theme="light" text={true} />
		</div>
	) : connected ? (
		isAMember ? (
			<div className="flex flex-col justify-center items-center gap-[20px] w-full h-full flex-1 px-10 lg:px-20 z-[inherit]">
				<h2 className="font-mammoth text-primaryBlack font-medium text-3xl text-center">
					GM (
					<span
						onClick={CopyAddress}
						className="text-primaryBlack/90 cursor-pointer"
					>
						{address && address.length
							? address.slice(0, 2) + "..." + address.slice(-2)
							: "---"}
					</span>
					) <span className="font-primary"> &#128075;</span>
				</h2>
				<div className="flex flex-col px-10 lg:px-30 w-full z-[inherit] flex-1">
					<div
						data-aos="fade-up"
						data-aos-anchor-placement="top-center"
						data-aos-duration={1000}
						data-aos-delay={200}
						data-aos-once={true}
						className="flex flex-col items-center flex-1 px-15 md:px-30 lg:px-50 py-20 gap-[30px] bg-primaryBlack rounded-30 w-full h-[600px] min-h-[600px] max-h-[600px] z-[inherit]"
					>
						<div className="flex flex-col items-center p-0 gap-[5px]">
							<h3 className="font-bold text-2xl text-white">{shgName}</h3>
							<p className="font-medium text-xs text-center text-white/50 w-3/4">
								{shgDesc}
							</p>
						</div>

						<hr className="w-4/5" />

						<div className="w-full h-full max-h-[430px] flex-1 flex flex-col lg:flex-row justify-center p-0 gap-[50px]">
							<div className="flex flex-col items-center p-0 gap-[20px] w-1/4 flex-1">
								<h4 className="font-medium text-xl text-white/80">Options:</h4>

								<div className="flex flex-col items-center p-0 gap-[10px] h-1/2">
									<button
										onClick={() => setOpenDepositModal(true)}
										className="cursor-pointer flex items-center justify-center py-10 px-20 border-primaryWidth rounded-[15px] bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105 transition font-primary font-medium text-[15px] leading-5 text-white/70 hover:text-white w-full"
									>
										Deposit funds
									</button>
									<button
										onClick={() => setOpenRequestModal(true)}
										className="cursor-pointer flex items-center justify-center py-10 px-20 border-primaryWidth rounded-[15px] bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105 transition font-primary font-medium text-[15px] leading-5 text-white/70 hover:text-white w-full"
									>
										Request for loan
									</button>
									<button
										onClick={CollectLoanAmount}
										className="cursor-pointer flex items-center justify-center py-10 px-20 border-primaryWidth rounded-[15px] bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105 transition font-primary font-medium text-[15px] leading-5 text-white/70 hover:text-white w-full"
									>
										{collectingLoading ? "Loading ..." : "Collect loan amount"}
									</button>
								</div>

								<div>
									<p className="text-medium text-sm text-center text-white/30">
										Your funds:
									</p>
									<p className="text-medium text-sm text-center text-white/70">
										{yourFunds / 1000000} ꜩ
									</p>
								</div>

								<div>
									<p className="text-medium text-sm text-center text-white/30">
										SHG Balance:
									</p>
									<p className="text-medium text-sm text-center text-white/70">
										{shgBalance / 1000000} ꜩ
									</p>
								</div>

								<div>
									<p className="text-medium text-sm text-center text-white/30">
										SHG established on:
									</p>
									<p className="text-medium text-sm text-center text-white/70">
										{FormatFullDateString(shgEst)}
									</p>
								</div>
							</div>

							<div className="flex flex-col items-center p-0 gap-[20px] w-1/2 flex-2">
								<h4 className="font-medium text-xl text-white/80">
									Recent Activity:
								</h4>

								<div
									className={`flex flex-col items-center p-0 gap-[10px] w-full h-full max-h-[365px] overflow-x-hidden overflow-y-auto pr-2 ${
										activityLoading
											? "justify-center"
											: (!activity || !activity.length) && "justify-center"
									}`}
								>
									{activityLoading ? (
										<Loader varient="line" theme="dark" text={true} />
									) : activity && activity.length ? (
										<>
											{activity.map((item) => {
												return (
													<p
														onClick={() => handleOpenProposalModal(item.id)}
														title="Click to view proposal"
														className="cursor-pointer text-center py-[7px] px-20 border-primaryWidth rounded-[15px] bg-white/5 border-white/10 hover:bg-white/10 transition text-[15px] leading-5 text-white/50 hover:text-white/80 w-full"
													>
														<span className="text-white mr-2">
															{item.proposerAddress === address && "You ("}{" "}
															{item.minifiedAddress}{" "}
															{item.proposerAddress === address && ")"}
														</span>
														<span>created a proposal for</span>
														<span className="text-white mx-2">
															{item.amount / 1000000}
														</span>
														<span>ꜩ on</span>
														<span className="text-white ml-2">
															{FormatFullDateString(item.timestamp)}
														</span>
													</p>
												);
											})}
											<p className="mt-7 text-center text-sm text-white/30 w-full">
												No more activity found
											</p>
										</>
									) : (
										<p className="text-center text-sm text-white/30 w-full">
											No activity found
										</p>
									)}
								</div>
							</div>

							<div className="flex flex-col items-center p-0 gap-[20px] w-1/4 flex-1">
								<h4 className="font-medium text-xl text-white/80">Members:</h4>

								<div className="flex flex-col items-stretch p-0 pr-2 gap-[10px] max-h-[380px] overflow-y-auto">
									{members.map((item, index) => {
										return (
											<p
												key={index}
												title="You"
												className={`
                                                    cursor-pointer text-center py-[7px] px-20 border-primaryWidth rounded-[15px] transition text-[15px] leading-5 w-full 
                                                    ${
																											item === address
																												? "bg-white/10 border-white/20 hover:bg-white/20 text-white/60 hover:text-white/90"
																												: "bg-white/5 border-white/10 hover:bg-white/10 text-white/50 hover:text-white/80"
																										}`}
											>
												{item === address
													? "You (" +
													  item.slice(0, 4) +
													  " ... " +
													  item.slice(-4) +
													  ")"
													: item.slice(0, 6) + " ... " + item.slice(-6)}
											</p>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>

				{openDepositModal && (
					<DepositFundsModal
						shgId={shgId}
						setOpenDepositModal={setOpenDepositModal}
						setOpenRequestModal={setOpenRequestModal}
						setOpenProposalModal={setOpenProposalModal}
					/>
				)}
				{openRequestModal && (
					<RequestFundsModal
						shgId={shgId}
						setOpenDepositModal={setOpenDepositModal}
						setOpenRequestModal={setOpenRequestModal}
						setOpenProposalModal={setOpenProposalModal}
					/>
				)}
				{openProposalModal && (
					<ProposalModal
						openProposalModal={openProposalModal}
						setOpenDepositModal={setOpenDepositModal}
						setOpenRequestModal={setOpenRequestModal}
						setOpenProposalModal={setOpenProposalModal}
					/>
				)}
			</div>
		) : (
			<div className="border-box w-screen min-h-[calc(100vh-250px)] max-h-[calc(100vh-250px)] gap-5 lg:gap-10 flex flex-col justify-center items-center">
				<p className="font-mammoth text-primaryBlack/90 text-5xl font-bold text-center">
					OOPS!
				</p>
				<p className="text-primaryBlack/70 text-2xl font-medium lg:w-1/2 text-center">
					Looks like you are not a member of any SHG. Either create an SHG or
					Join an existing SHG
				</p>

				<Button
					varient="dark"
					gradient={false}
					weight={"bold"}
					onClick={() => navigate("/explore")}
				>
					Find SHGs
					<CgArrowLongRight className="ml-1 text-xl text-white/80" />
				</Button>
			</div>
		)
	) : (
		<div className="border-box w-screen min-h-[calc(100vh-250px)] max-h-[calc(100vh-250px)] gap-5 lg:gap-10 flex flex-col justify-center items-center">
			<p className="font-mammoth text-primaryBlack/90 text-5xl font-bold text-center">
				OOPS!
			</p>
			<p className="text-primaryBlack/70 text-2xl font-medium lg:w-1/2 text-center">
				Looks like you are not connected with your wallet. Connect with your
				wallet to view your SHG dashboard.
			</p>

			<Button
				varient="dark"
				gradient={true}
				weight={"bold"}
				onClick={onConnectWallet}
			>
				Connect Wallet
			</Button>
		</div>
	);
}
