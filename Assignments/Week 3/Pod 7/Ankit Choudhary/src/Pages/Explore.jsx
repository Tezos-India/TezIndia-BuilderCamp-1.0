import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchStorage } from "../Utils/tzkt";

import SHGListItem from "../Components/Explore/SHGListItem";
import AddShgModal from "../Components/Explore/AddShgModal";
import JoinShgModal from "../Components/Explore/JoinShgModal";

import Loader from "../Components/Loader";
import Button from "../Components/Button";

import AOS from "aos";
AOS.init();

export default function Explore() {
	const { search } = useLocation();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [openAddSHG, setOpenAddSHG] = useState(false);
	const [openJoinSHG, setOpenJoinSHG] = useState(null);
	const [allShgDetails, setAllShgDetails] = useState(null);

	// Checking and setting if Add SHG is in URL Params
	useEffect(() => {
		setOpenAddSHG(search.includes("add-shg=true"));
		setOpenJoinSHG(
			search.includes("join-shg=") ? search.split("join-shg=")[1] : null
		);
	}, [search]);

	// On toggle of Modal, change the scroll mode of body
	useEffect(() => {
		if (openAddSHG || openJoinSHG) {
			window.scroll(0, 0);
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "scroll";
		}
	}, [openAddSHG, openJoinSHG]);

	// Fetch the SHG details from Tezos
	const FetchTheData = async () => {
		const storage = await fetchStorage();
		const numberOfShg = storage.shgId;
		const Data = [];
		for (let i = 1; i <= numberOfShg; i++) {
			const fetchedObject = {
				name: storage.shgDetails[i].shgName,
				description: storage.shgDetails[i].shgDescription,
				// members: ["1", "2", "3"],
				members: storage.shgDetails[i].funders,
				established: Date.parse(storage.shgDetails[i].timeOfCreation),
				shgId: i,
			};

			Data.push(fetchedObject);
		}

		return Data;
	};

	// Call the function upon first render
	useEffect(() => {
		setLoading(true);

		FetchTheData().then((data) => {
			setAllShgDetails(data);
		});

		setLoading(false);
	}, []);

	return (
		<div className="flex flex-col justify-center items-center w-full h-full flex-1 px-20">
			<div className="flex flex-col items-center gap-[30px] w-full flex-1 z-[inherit]">
				<h2 className="font-mammoth text-primaryBlack font-medium text-3xl text-center">
					Find SHGs
				</h2>

				<div
					data-aos="fade-down"
					data-aos-anchor-placement="top-center"
					data-aos-duration={500}
					data-aos-delay={0}
					className="flex flex-col justify-start items-center px-15 md:px-[50px] xl:px-[100px] gap-[20px]"
				>
					{loading ? (
						<div className="w-full h-full flex-1 grid place-content-center">
							<Loader varient="full" theme="light" />
							<p className="text-primaryBlack/50 text-xl font-medium mt-3">
								Loading...
							</p>
						</div>
					) : allShgDetails && allShgDetails.length ? (
						allShgDetails.map((item, index) => {
							return (
								<SHGListItem
									key={index}
									ShgName={item.name}
									ShgDesc={item.description}
									members={item.members}
									established={item.established}
									slug={item.shgId}
								/>
							);
						})
					) : (
						"No SHGs Found"
					)}
				</div>

				<div className="flex flex-col justify-center items-center gap-[10px]">
					<p className="font-semibold text-lg text-primaryBlack/50">
						Unable to find SHG for your needs?
					</p>
					<Button
						varient="dark"
						gradient={true}
						weight={"bold"}
						onClick={() => navigate("/explore?add-shg=true")}
					>
						Create your own SHG
					</Button>
				</div>
			</div>

			{openAddSHG && <AddShgModal setOpenAddSHG={setOpenAddSHG} />}
			{openJoinSHG && (
				<JoinShgModal
					shgId={openJoinSHG}
					setOpenJoinSHG={setOpenJoinSHG}
					shgDetails={allShgDetails}
				/>
			)}
		</div>
	);
}
