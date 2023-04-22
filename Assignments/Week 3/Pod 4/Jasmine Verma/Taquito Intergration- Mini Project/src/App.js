import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";

import { buyTicketOperation, endGameOperation } from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";

const App = () => {
  // Players holding lottery Totalvotes
  const [aVotes, setAVotes] = useState([]);
  const [bVotes, setBVotes] = useState([]);
  const [Totalvotes, setTotalvotes] = useState(5);
  const [loading, setLoading] = useState(false);

  // Set players and Totalvotes remaining
  useEffect(() => {
    // TODO 9 - Fetch players and Totalvotes remaining from storage
    (async () => {
      const storage = await fetchStorage();
      setAVotes(storage.option_a_votes);
      setBVotes(storage.option_b_votes);
      setTotalvotes(storage.total_votes);
    })();
  }, []);

  // TODO 7.a - Create onBuyTicket
  const onBuyTicket = async (option) => {
    try {
      setLoading(true);
      await buyTicketOperation(option);
      alert("Transaction succesful!");
    } catch (err) {
      // alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-100">
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        {/* Ticket remaining display */}
        <div className="py-1">Total votes : {Totalvotes}</div>
        <div className="py-1">A votes : {aVotes}</div>
        <div className="py-1">B votes : {bVotes}</div>
        {/* Action Buttons */}
        <br />
          <button onClick={()=>onBuyTicket(1)} className="btn btn-primary btn-lg">
            {/* TODO 7.b - Call onBuyTicket on click */}
            {/* TODO 7.c - Show "loading..." when buying operation is pending */}
            {loading ? "Loading..." : "Vote for A"}
          </button>
        <br />
          <button onClick={()=>onBuyTicket(2)} className="btn btn-success btn-lg">
            {/* TODO 11.b - Call onEndGame on click */}
            {/* TODO 11.c - Show "loading..." when buying operation is pending */}
            {loading ? "Loading..." : "Vote for B"}
          </button>
        
        {/* List of Players */}
        
      </div>
    </div>
  );
};

export default App;
