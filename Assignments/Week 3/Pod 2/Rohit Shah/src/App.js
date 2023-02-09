import { useState, useEffect } from "react";
import { addCandidate, endElection, startElection, vote } from "./utils/operations"
import { fetchStorage } from "./utils/tzkt-storage"
// Components
import Navbar from "./components/Navbar";

const App = () => {
  const [account, setAccount] = useState("");
  const [candidates, setCandidates] = useState([])
  const [electionStatus, setElectionStatus] = useState(false) // true if election is started
  const [operator, setOperator] = useState("")
  const [lastWinner, setLastWinner] = useState("")

  const updateUIValues = async() => {
    const storage = await fetchStorage();
    setElectionStatus(storage.status)
    setOperator(storage.operator)
    setLastWinner(storage.lastWinner)
    // ! candidates in an object that contains address to vote count
    // ! take that and convert it to an array of object
    const candidates = Object.entries(storage.candidates).map(([address, voteCount]) => {
      return {
        "address": address,
        "voteCount": voteCount
      }
    })
    console.log(candidates)
    setCandidates(candidates)
  }

  useEffect(() => {
    updateUIValues();
  },[])

  const voteForCandidate = async(address) => {
    try{
      await vote(address);
      alert("Transaction successful");
      updateUIValues();
    }catch(err){
      console.log(err)
      alert(err.message)
    }
  }

  const endYourElection = async() => {
    try{
      await endElection();
      alert("Transaction successful");
      updateUIValues();
    }catch(err){
      console.log(err)
      alert(err.message)
    }
  }

  const startYourElection = async() => {
    try{
      await startElection();
      alert("Transaction successful");
      updateUIValues();
    }catch(err){
      console.log(err)
      alert(err.message)
    }
  }

  const addACandidate = async(address) => {
    try{
      await addCandidate(address);
      alert("Transaction successful");
      updateUIValues();
    }catch(err){
      console.log(err)
      alert(err.message)
    }
  }

  return (
    <div className="h-100">
      <Navbar account={account} setAccount={setAccount}/>
      {/* add margin of 100px to container */}

      <div className="container dibba">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Election Status: {electionStatus ? "Started" : "Ended"}</h1>
            <h1 className="text-center">Operator: {operator}</h1>
            <h1 className="text-center">Last Winner: {lastWinner}</h1>
          </div>
        </div>
        {
          account === operator ? (
            electionStatus ? (
              // started then buttont to end 
              <div className="row">
                <div className="col-12">
                  <button className="btn btn-outline-danger" onClick={endYourElection}>End Election</button>
                </div>
              </div>
            ) : (
              // ended then button to start
              <div className="row">
                <div className="col-12">
                  <button className="btn btn-outline-success" onClick={startYourElection}>Start Election</button>
                </div>
              </div>
            ) 
          ) : ""
        }
        {
          account == operator ? (
            <div className="row">
              <div className="col-12">
                <input type="text" placeholder="Candidate Address" id="candidateAddress"/>
                <button className="btn btn-outline-info" onClick={() => {
                  addACandidate(document.getElementById("candidateAddress").value)
                }}
                >Add Candidate</button>
              </div>
            </div>
          ) : ""
        }

        {/* div to show list of candidates */}
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Candidates</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Votes</th>
                  {/* a button to vote for a candidate */}
                  <th scope="col">Vote</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => {
                  return (
                    <tr key={index}>
                      <td>{candidate.address}</td>
                      <td>{candidate.voteCount}</td>
                      <td><button className="btn btn-outline-info" onClick={
                        () => {voteForCandidate(candidate.address)}
                      }>Vote</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </div>
  );
};

export default App;
