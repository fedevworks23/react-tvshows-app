import { Route, Routes } from "react-router";
import PageNotFound from "../Pages/PageNotFound";
import ShowDetailsLayout from "../Pages/Shows/ShowDetailsLayout";
import Schedule from "../Pages/Schedule";
import Shows from "../Pages/Shows/Shows";
import HomePage from "../Pages/HomePage";
import Episodes from "../Pages/Shows/Episodes";
import Seasons from "../Pages/Shows/Seasons";
import Main from "../Pages/Shows/Main";

function TvShowLayoutRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="shows" element={<Shows />} />
        <Route path="shows/:id/:name" element={<ShowDetailsLayout />}>
          <Route path="" element={<Main />} />
          <Route path="episodes" element={<Episodes />} />
          <Route path="seasons" element={<Seasons />} />
        </Route>
        <Route path="Schedule" element={<Schedule />} />

        <Route path={"*"} element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default TvShowLayoutRoutes;
