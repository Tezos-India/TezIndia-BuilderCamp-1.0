import Image from 'next/image'
import { Inter, Poppins } from '@next/font/google'
import { tezos } from "../utils/tezoz";
import { connectWallet, getAccount } from "../utils/wallet";
import { useState } from 'react';
const poppins = Poppins({ subsets: ['latin'], weight: ['500', '300', '800'], })
export default function Navbar() {
    const [currentUser,setCurrentUser]=useState("");
    return (
        <div className="w-full p-2 mt-4">
            <div className='w-full max-w-[1600px] mx-auto flex justify-between'>
                <h1 className="text-white text-2xl font-extrabold "  >
                    Patent-India <span className=''>🇮🇳</span>
                </h1>
                <button
                    className=" rounded-md inline-flex items-center justify-center text-white border p-2 shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-pointer outline-none"
                    aria-label="Update dimensions"
                    onClick={async () => {
                        await connectWallet()
                        let address = await getAccount();
                        setCurrentUser(address);
                    }}
                >
                    {currentUser ? currentUser.toString().slice(0,10) + "..." + currentUser.toString().slice(30) : "Wallet Connection"}
                </button>
            </div>
        </div>
    )
}