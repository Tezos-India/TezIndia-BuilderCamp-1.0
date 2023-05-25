import { useState } from "react";
import { Transfer } from "../utils/wallet";

const initialValues = {
  to_address: "",
  amount: "",
};

export default function TransferCard(props) {
  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <div>
      <div>
      <input
        type="text"
        name="to_address"
        placeholder="To Address"
        onChange={handleInputChange}
        value={values.to_address}
      />
      </div>
      <div>
      <input
        type="number"
        name="amount"
        placeholder="amount"
        onChange={handleInputChange}
        value={values.amount}
      />
      </div>
      <button
        onClick={() => {
          Transfer(values.to_address, values.amount);
        }}
        className="bg-red-500 px-6 py-2 rounded-sm text-xs font-semibold uppercase text-white cursor-pointer"
      >
        Transfer
      </button>
    </div>
  );
}