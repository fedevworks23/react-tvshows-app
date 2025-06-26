import { Outlet } from "react-router";
import ShowDetailsNavbar from "./ShowDetailsNavbar";

const ShowDetail = () => {
  return (
    <div className="bg-white px-2 md:px-8 py-8">
      <ShowDetailsNavbar />

      <div className="fade-in-animation">
        <Outlet />
      </div>
    </div>
  );
};

export default ShowDetail;
