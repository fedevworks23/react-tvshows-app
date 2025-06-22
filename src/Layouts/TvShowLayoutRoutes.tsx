
import { Route, Routes } from "react-router";
// import Dashboard from "../Pages/Dashboard";
import PageNotFound from "../Pages/PageNotFound";
import TvShowLayout from "./TvShowLayout";
import ShowDetails from "../Pages/ShowDetails";
import Schedule from "../Pages/Schedule";
import Shows from "../Pages/Shows";
import HomePage from "../Pages/HomePage";

function TvShowLayoutRoutes() {
  return (
    <>
      <Routes>
        <Route element={<TvShowLayout />}>
          <Route index  element={<HomePage />}></Route>
          {/* <Route index  element={<Dashboard />}></Route> */}
          <Route path="Shows"  element={<Shows />}></Route>
          <Route path="Schedule"  element={<Schedule />}></Route>
          <Route path=':id' element={<ShowDetails />}></Route>
        </Route>

        <Route path={"*"} element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default TvShowLayoutRoutes;