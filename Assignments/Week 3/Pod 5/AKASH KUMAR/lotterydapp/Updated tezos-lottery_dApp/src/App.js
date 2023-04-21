import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import "./App.css";
import { buyTicketOperation, endGameOperation } from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";

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

  // TODO 7.a - Create onBuyTicket
  const onBuyTicket = async () => {
    try {
      setLoading(true);
      await buyTicketOperation();
      alert("Transaction succesful!");
    } catch (err) {
      alert("Transaction Failed:", err.message);
    }
    setLoading(false);
  };

  // TODO 11.a - Create onEndGame
  const onEndGame = async () => {
    try {
      setLoading(true);
      await endGameOperation();
      alert("Transaction succesful!");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="header">
      <Navbar />
      <div className="ana">
      <div className="Ana1">.</div>
        <div className="tic1">
          {/* Ticket remaining display */}
          <div className="py-1">Tickets remaining: {tickets}</div>
          {/* Action Buttons */}
          {tickets > 0 ? (
            <button onClick={onBuyTicket} className="btn1">
              {/* TODO 7.b - Call onBuyTicket on click */}
              {/* TODO 7.c - Show "loading..." when buying operation is pending */}
              <span> {loading === true ? "Loading..." : "Buy Ticket"}</span>
              <i></i>
            </button>
          ) : (
            <button onClick={onEndGame} className="btn1">
              {/* TODO 11.b - Call onEndGame on click */}
              {/* TODO 11.c - Show "loading..." when buying operation is pending */}
              <span> {loading ? "Loading..." : "End Game"}</span>
              <i></i>
            </button>
          )}
          {/* List of Players */}
          <div className="player">
            <div className="ticket">.</div>
            <div className="play">
              {players.map((player, index) => (
                <div key={index}>
                  <b>Ticket {index + 1}:</b> {player}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="Ana2">.</div>
      </div>
    </div>
  );
};

export default App;
