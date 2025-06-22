import "./App.css";
import Navbar from "./components/Navbar";
import TvShowLayoutRoutes from "./Layouts/TvShowLayoutRoutes";

function App() {
  return (
    <>
      <div>
        <Navbar />  
        <TvShowLayoutRoutes />
      </div>
    </>
  );
}

export default App;
