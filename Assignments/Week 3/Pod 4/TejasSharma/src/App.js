import logo from './logo.svg';
import { useState } from "react";
import {RegisterCompany, sendTez, remove_charity} from "./Utils/operations.js"
import { fetchStorage } from "./Utils/tzkt_storage.js";
import Navbar from './Components/Navbar.js'
import './App.css';

const registerComp = async(name) => {
  try{
    console.log(name)
    await RegisterCompany(name);
    alert("Transaction successful");
  }catch(err){
    console.log(err)
    alert(err.message)
  }
}
const sendTezos = async(amount) => {
  try{
    console.log(amount)
    await sendTez(amount);
    alert("Transaction successful");
  }catch(err){
    console.log(err)
    alert(err.message)
  }  
}

const removeCharity = async(delName) => {
  try{
    console.log(delName)
    await remove_charity(delName);
    alert("Transaction successful");
  }catch(err){
    console.log(err)
    alert(err.message)
  }  
}
function App() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [delName, setDelName] = useState("")


  const handleSubmitName = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`);
  }

  const handleSubmitAmt = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${amount}`);
  }

  const handleSubmitDelName = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${delName}`);
  }

  return (
    <div className="App">
      <Navbar> </Navbar>
      <header className="App-header">
        <form onSubmit={handleSubmitName}>
          <label>Enter Company name:
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event)=>setName(event.target.value)}
            />
          </label>
        </form>
      <button className="btn btn-outline-success" onClick={(event) => registerComp(name)}>Registor Company</button> 
        <form onSubmit={handleSubmitAmt}>
          <label>Enter target Company to send 1 tez:
            <input
              type="text" 
              id="amount"
              value={amount}
              onChange={(event)=>setAmount(event.target.value)}
            />
          </label>
        </form>
<button className="btn btn-outline-success" onClick={(event) => sendTezos(amount)}>Send Money</button> 
        <form onSubmit={handleSubmitDelName}>
          <label>Enter Company to remove Admin only:
            <input
              type="text" 
              id="delName"
              value={delName}
              onChange={(event) => setDelName(event.target.value)}
            />
          </label>
        </form>
<button className="btn btn-outline-success" onClick={(event) => removeCharity(delName)}>Withdraw Company</button> 
      </header>
    </div>
  );
}

export default App;

// import React from 'react'
// import {useState} from 'react'
// import logo from './logo.svg'
// import './App.css'

// function App() {
//   const [name, setName] = useState("")
//   const [amount, setAmount] = useState(0)
//   const [delName, setDelName] = useState("")

//   const handleKeyDownName = (event) => {
//     if (event.key === 'Enter') {
//       // 👇 Get input value
//       setName(name);
//       console.log(name)
//     }
//   };

//   const handleKeyDownAmount = (event) => {
//     if (event.key === 'Enter') {
//       // 👇 Get input value
//       setAmount(amount);
//     }
//   };

//   const handleKeyDownDel = (event) => {
//     if (event.key === 'Enter') {
//       // 👇 Get input value
//       setDelName(delName);
//     }
//   };

//   const handleSubmitName = (event) => {
//     event.preventDefault();
//     alert(`The name you entered was: ${name}`);
//   }

//   const handleSubmitAmt = (event) => {
//     event.preventDefault();
//     alert(`The name you entered was: ${amount}`);
//   }

//   const handleSubmitDelName = (event) => {
//     event.preventDefault();
//     alert(`The name you entered was: ${delName}`);
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <form onSubmit={handleSubmitName}>
//           <label>Enter your name:
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(event)=>setName(event.target.value)}
//             />
//           </label>
//         </form>
//*        <button className="btn btn-outline-success" onClick={name => registerComp(name)}>Registor Company</button> */}
//         <form onSubmit={handleSubmitAmt}>
//           <label>Enter amount:
//             <input
//               type="number" 
//               id="amount"
//               value={amount}
//               onChange={(event)=>setAmount(event.target.value)}
//             />
//           </label>
//         </form>
//* <button className="btn btn-outline-success" onClick={amount => sendTezos(amount)}>Send Money</button> */}
//         <form onSubmit={handleSubmitDelName}>
//           <label>Enter your name:
//             <input
//               type="text" 
//               id="delName"
//               value={delName}
//               onChange={(event) => setDelName(event.target.value)}
//             />
//           </label>
//         </form>
//* <button className="btn btn-outline-success" onClick={delName => removeCharity(delName)}>Withdraw Company</button> */
//       </header>
//     </div>
//   );
// }

// export default App;

