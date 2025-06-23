import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import TvShowLayoutRoutes from "./Layouts/TvShowLayoutRoutes";

function App() {
  return (
    <>
      <div>
        <Navbar />  
        <TvShowLayoutRoutes />
        <Outlet />
      </div>
    </>
  );
}

export default App;
