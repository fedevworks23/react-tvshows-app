import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import ShowRoutesLayout from "./Layouts/ShowRoutesLayout";

function App() {
  return (
    <>
      <div>
        <Navbar />  
        <ShowRoutesLayout />
        <Outlet />
      </div>
    </>
  );
}

export default App;
