import axios from "axios";

export const fetchStorage = async () => {
	try {
		const res = await axios.get(
			"https://api.ghostnet.tzkt.io/v1/contracts/KT1PBdtCB3zJewqstimFAziSd1fj6Tn6p6rL/storage"
		);
		return res.data;
	} catch (err) {
		throw err;
	}
};
