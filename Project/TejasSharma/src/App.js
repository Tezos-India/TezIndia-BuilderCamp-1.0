import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages';
import BuyPlot from './pages/buyPlot';
import Plots from './pages/plots';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		{/* <Route path='/' element={<Home />} /> */}
		<Route path='/buyPlot' element={<BuyPlot/>} />
		<Route path='/plots' element={<Plots/>} />
	</Routes>
	</Router>
);
}

export default App;
