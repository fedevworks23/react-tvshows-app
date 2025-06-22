import { Outlet } from "react-router";

function TvShowLayout() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default TvShowLayout;
