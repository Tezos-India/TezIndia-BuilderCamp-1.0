import Navbar from "./components/Navbar";
import ToDoList from "./components/ToDoList";

const App = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="container pt-10 mx-auto">
        <div className="flex justify-center">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-300 to-red-400">
            Add a TODO!
          </h1>
        </div>
        <div className="mt-20 flex justify-center">
          <ToDoList />
        </div>
      </div>
    </div>
  );
};

export default App;
