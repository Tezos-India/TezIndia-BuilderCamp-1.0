import Navbar from "./components/Navbar";
import BusinessCard from "./components/BusinessCard";
import BurnCard from "./components/BurnCard";
import TransferCard from "./components/TransferCard";
const App = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="container pt-10 mx-auto">
        <div className="flex justify-center">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-300 to-red-400">
            Mint NFT
          </h1>
        </div>
        <div className="mt-20 flex justify-center">
          <BusinessCard />
        </div>
        <br />
        <h1 className="flex justify-center text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-300 to-red-400">
            Burn Card
        </h1>
        <div className="mt-20 flex justify-center">
          <BurnCard />
        </div>
        <br />
        <h1 className="flex justify-center text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-300 to-red-400">
            Transfer Card
        </h1>
        <div className="mt-20 flex justify-center">
          <TransferCard />
        </div>
        <br />
      </div>
    </div>
  );
};

export default App;
