import { useState, useEffect } from "react";
import {
  addCandidate,
  endElection,
  startElection,
  vote,
} from "./utils/operations";
import { getStorage } from "./utils/tzkt-storage";

import Navbar from "./components/Navbar";

const App = () => {
  const [account, setAccount] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [electionStatus, setElectionStatus] = useState(false);
  const [operator, setOperator] = useState("");
  const [lastWinner, setLastWinner] = useState("");

  const uiValueUpdate = async () => {
    const storage = await getStorage();
    setElectionStatus(storage.status);
    setOperator(storage.operator);
    setLastWinner(storage.lastWinner);

    const candidates = Object.entries(storage.candidates).map(
      ([address, voteCount]) => {
        return {
          address: address,
          voteCount: voteCount,
        };
      }
    );
    console.log(candidates);
    setCandidates(candidates);
  };

  useEffect(() => {
    uiValueUpdate();
  }, []);

  const cadidateVote = async (address) => {
    try {
      await vote(address);
      alert("Transaction successful");
      uiValueUpdate();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const electionTerminate = async () => {
    try {
      await endElection();
      alert("Transaction successful");
      uiValueUpdate();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const electionBegin = async () => {
    try {
      await startElection();
      alert("Transaction successful");
      uiValueUpdate();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const cadidateAddition = async (address) => {
    try {
      await addCandidate(address);
      alert("Transaction successful");
      uiValueUpdate();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div className="h-100">
      <Navbar account={account} setAccount={setAccount} />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center mb-4">
            <h1>Status: {electionStatus ? "Started" : "Ended"}</h1>
            <h3>Operator: {operator}</h3>
            <h3>Previous Winner: {lastWinner}</h3>
          </div>
        </div>
        {account === operator && (
          <div className="row justify-content-center">
            <div className="col-12 text-center mb-4">
              {electionStatus ? (
                <button className="btn btn-danger" onClick={electionTerminate}>
                  End Election
                </button>
              ) : (
                <button className="btn btn-success" onClick={electionBegin}>
                  Start Election
                </button>
              )}
            </div>
          </div>
        )}

        {account === operator && (
          <div className="row justify-content-center">
            <div className="col-12 text-center mb-4">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Candidate Address"
                id="candidateAddress"
              />
              <button
                className="btn btn-info"
                onClick={() => {
                  cadidateAddition(
                    document.getElementById("candidateAddress").value
                  );
                }}
              >
                Add Candidate
              </button>
            </div>
          </div>
        )}

        <div className="row justify-content-center">
          <div className="col-12 text-center mb-4">
            <h1>Candidates</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Votes</th>
                  <th>Vote</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => {
                  return (
                    <tr key={index}>
                      <td>{candidate.address}</td>
                      <td>{candidate.voteCount}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            cadidateVote(candidate.address);
                          }}
                        >
                          Vote
                        </button>
                      </td>
                    </tr>
                  );
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
