import { useState } from "react";
import { createBusinessCard } from "../utils/wallet";

const initialValues = {
  name: "",
  title: "",
  company: "",
  email: "",
  number: "",
};

export default function BusinessCard(props) {
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
        name="name"
        value={values.name}
        placeholder="Name"
        onChange={handleInputChange}
      />
      </div>
      <div>
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleInputChange}
        value={values.title}
      />
      </div>
      <div>
      <input
        type="text"
        name="company"
        placeholder="Company"
        onChange={handleInputChange}
        value={values.company}
      />
      </div>
      <div>
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={handleInputChange}
        value={values.email}
      />
      </div>
      <div>
      <input
        type="text"
        name="number"
        placeholder="Number"
        onChange={handleInputChange}
        value={values.number}
      />
      </div>
      <button
        onClick={() => {
          createBusinessCard(values.name, values.title, values.company, values.email, values.number);
        }}
        className="bg-red-500 px-6 py-2 rounded-sm text-xs font-semibold uppercase text-white cursor-pointer"
      >
        Create Business Card
      </button>
    </div>
  );
}