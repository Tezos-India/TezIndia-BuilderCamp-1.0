import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import {buyTicketOperation} from "./utils/operation";

import {fetchStorage} from "./utils/tzkt";

import {endGameOperation} from "./utils/operation";

const App = () => {
  // Players holding lottery tickets
  const [players, setPlayers] = useState([]);
  const [tickets, setTickets] = useState(5);
  const [loading, setLoading] = useState(false);

  // Set players and tickets remaining
  useEffect(() => {
    // TODO 9 - Fetch players and tickets remaining from storage
    (async () => {
      const storage = await fetchStorage();
      setPlayers(Object.values(storage.players));
      setTickets(storage.tickets_available);
    })();
  }, []);

  // TODO 7.a - Complete onBuyTicket function
  const onBuyTicket = async () => {
    try{
      setLoading(true);
      await buyTicketOperation();
      alert("Transaction Confirmed!");
    }catch(err){
      alert("Transcation failed!", err.message);
    }
    setLoading(false);
    
  };

  // TODO 11.a - Complete onEndGame function
  const onEndGame = async () => {
    try{
      setLoading(true);
      await endGameOperation();
      alert("Transaction Confirmed!");
    }catch(err){
      alert("Transcation failed!", err.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-100">
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        {/* Ticket remaining display */}
        <div className="py-1">Tickets remaining: {tickets}</div>
        {/* Action Buttons */}
        {tickets > 0 ? (
          <button onClick={onBuyTicket} className="btn btn-primary btn-lg">
            {/* TODO 7.b - Call onBuyTicket on click */}
            {/* TODO 7.c - Show "loading..." when buying operation is pending */}
            {loading === true ? "Loading ..." : "Buy Ticket"}
          </button>
        ) : (
          <button onClick={onEndGame} className="btn btn-success btn-lg">
            {/* TODO 11.b - Call onEndGame on click */}
            {/* TODO 11.c - Show "loading..." when buying operation is pending */}
            {loading === true ? "Loading ..." : "End Game"}
          </button>
        )}
        {/* List of Players */}
        <div className="mt-2">
          {players.map((player, index) => (
            <div key={index}>
              <b>Ticket {index + 1}:</b> {player}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
