import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import BusinessCard from "./components/BusinessCard";
import BurnCard from "./components/BurnCard";
import TransferCard from "./components/TransferCard";

const App = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="container pt-10 mx-auto">
          <div className="flex justify-center">
          </div>
          <br />
          <center>
          <Switch>
            <Route path="/mint">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-300 to-red-400">
              Mint
            </h1>
            <br />
              <BusinessCard />
            </Route>
            <Route path="/burn">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-300 to-red-400">
              Burn
            </h1>
            <br />
              <BurnCard />
            </Route>
            <Route path="/transfer">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-300 to-red-400">
              Transfer
            </h1>
            <br />
              <TransferCard />
            </Route>
          </Switch>
          </center>
        </div>
      </div>
    </Router>
  );
};

export default App;
