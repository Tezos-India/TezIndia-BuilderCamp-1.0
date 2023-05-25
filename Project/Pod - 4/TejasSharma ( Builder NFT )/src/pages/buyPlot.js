import React from 'react';
import { useState } from 'react';
import { sellPlotCustomer } from '../utils/operations';

const BuyPlot = () => {
const [inputs, setInputs] = useState({});

const handleChange = (event) => {
	const name = event.target.name;
	const value = event.target.value;
	setInputs(values => ({...values, [name]: value}))
}

const handleSubmit = (event) => {
	event.preventDefault();
	console.log(inputs.housename, inputs.amount);
}

const buyPlot = async(inputs) => {
	try{
	  console.log(inputs.housename, inputs.address, inputs.amount)
	  await sellPlotCustomer(inputs.housename, inputs.address, inputs.amount);
	  alert("Transaction successful");
	}catch(err){
	  console.log(err)
	  alert(err.message)
	}  
  }

return (
	<div>
	<form onSubmit={handleSubmit}>
      <label>Enter house name:
      <input 
        type="text" 
        name="housename" 
        value={inputs.housename || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter your wallet address:
      <input 
        type="text" 
        name="address" 
        value={inputs.address || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter your age:
        <input 
          type="number" 
          name="amount" 
          value={inputs.amount || ""} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
	<button className="btn btn-outline-success" onClick={(event) => buyPlot(inputs)}>Buy Plot</button> 
	</div>
);
};

export default BuyPlot;
