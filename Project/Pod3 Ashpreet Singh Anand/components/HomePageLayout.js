import React from "react";


function HomePageLayout({children}) {
  return (
    <main className="flex flex-col">
      <nav className="flex justify-between items-center mt-0 px-10 py-2 md:sticky top-0 md:backdrop-blur-xl z-10">
        <div className="font-bold text-3xl text-black">Queue</div>
        <div className="text-sm flex items-center space-x-7"> 
          <div className="space-x-3 hidden md:flex ">
            <div>Developers</div>
            <div>Ecosystem</div>
            <div>Blog</div>
            <div>About</div>
            <div>Solutions</div>
          </div>
          <div className="bg-[#5456DE] text-white rounded-3xl py-2 px-2 flex justify-center items-center">
            <button className="font-medium">Launch App</button>
          </div>
        </div>
      </nav>
      
      <div className="overflow-x-hidden">

        {children}
      </div>


    {/* help box */}
    <div className="cursor-pointer">
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
      <div className=" w-6 h-6 md:w-12 md:h-12 rounded-full text-white bg-[#5456DE] flex items-center justify-center">
      <svg fill="white" className="text-white" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="48"><path d="M431 726q1-72 16.5-105t58.5-72q42-38 64.5-70.5T593 409q0-45-30-75t-84-30q-52 0-80 29.5T358 395l-84-37q22-59 74.5-100.5T479 216q100 0 154 55.5T687 405q0 48-20.5 87T601 574q-49 47-59 72t-11 80H431Zm48 250q-29 0-49.5-20.5T409 906q0-29 20.5-49.5T479 836q29 0 49.5 20.5T549 906q0 29-20.5 49.5T479 976Z"/></svg>

      </div>
    </div>
    </div>

        <footer className=" w-full mt-10 backdrop-brightness-[90%]">
            <div className="flex gap-5 md:gap-10 lg:gap-20 justify-center my-10 ">
                <div className="font-extrabold text-2xl hidden lg:inline">
                    Queue
                </div>

                <div className="space-y-2 pl-1">
                    <p className="font-[700] pb-3">Solutions</p>
                    <div className="space-y-2">
                        <p>Vesting</p>
                        <p>Payroll</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="font-bold">Developers</p>
                    <div className="space-y-2">
                        <p>Docs</p>
                        <p>Github</p>
                        <p>Console</p>
                        <p>Bounties</p>
                    </div>
                </div>

                <div>
                    <p className="font-bold">Ecosystem</p>
                    <div className="space-y-2">
                        <p className="">what?</p>
                        <p>Partners</p>
                    </div>
                </div>


                <div>
                    <p className="font-bold">Compnay</p>
                    <div className="space-y-2">
                        <p>About</p>
                        <p>Blog</p>
                        <p>Careers</p>
                        <p>Support Chat</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-center mb-20 mt-6 text-slate-100">
                2022 Queue Finance LTD - Privacy Policy - Terms of Use
            </div>
        </footer>

    </main>
  );
}

export default HomePageLayout;
