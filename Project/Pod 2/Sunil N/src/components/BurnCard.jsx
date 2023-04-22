import { useState } from "react";
import { Burn } from "../utils/wallet";

export default function BurnCard(props) {
    const [amount, setAmount] = useState("");
  
    return (
      <div className="flex">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount}
        />
        <button
          onClick={() => {
            Burn(amount);
          }}
          className="bg-red-500 px-6 py-2 rounded-sm text-xs font-semibold uppercase text-white cursor-pointer"
        >
          Burn
        </button>
      </div>
    );
  }