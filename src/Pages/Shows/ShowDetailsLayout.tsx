import { Outlet } from "react-router";
import ShowsNavbar from "./ShowsNavbar";

const ShowDetail = () => {
  return (
    <div className="bg-white px-2 md:px-8 py-8">
      <ShowsNavbar />

      <div className="fade-in-animation">
        <Outlet />
      </div>
    </div>
  );
};

export default ShowDetail;
