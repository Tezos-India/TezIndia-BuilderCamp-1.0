import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Components/Header'
import Footer from './Components/Footer'
import Loader from './Components/Loader'
import ScrollToTop from './Components/ScrollToTop'

import Home from "./Pages/Home.tsx"
import Explore from "./Pages/Explore"
import Dashboard from './Pages/Dashboard';
import Error404 from './Pages/Error404'

const AppendHeaderFooter = ({ Comp }) => {
    return (
        <>
            <Header />
            <Comp />
            <Footer />
        </>
    )
}

function App() {

    const [loading, setLoading] = useState(false);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <AppendHeaderFooter Comp={Home} />,
        },
        {
            path: "/explore",
            element: <AppendHeaderFooter Comp={Explore} />,
        },
        {
            path: "/dashboard",
            element: <AppendHeaderFooter Comp={Dashboard} />,
        },
        {
            path: "/join/:shgId",
            element: <AppendHeaderFooter Comp={Dashboard} />,
        },
        {
            path: "*",
            element: <Error404 />,
        },
    ]);

    return (
        <div className="bg-primaryBg flex flex-col text-primaryblack font-primary pt-[20px] min-h-screen">

            <ToastContainer />

            {
                loading
                    ? <div className="w-full h-full flex-1 grid place-content-center">
                        <Loader varient="full" theme='light' />
                        <p className='text-primaryBlack/50 text-xl font-medium mt-3'>Loading...</p>
                    </div>
                    : <RouterProvider router={router} />
            }

            <ScrollToTop />
        </div>
    )
}

export default App;