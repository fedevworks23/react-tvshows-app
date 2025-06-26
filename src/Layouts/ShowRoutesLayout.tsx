import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import ShowDetailsPage from "../Pages/Shows/ShowDetailsPage";
import SchedulePage from "../Pages/SchedulePage";
import AllShows from "../Pages/Shows/AllShows";
import Home from "../Pages/Home";

const ShowOverview = React.lazy(() => import("../Pages/Shows/ShowOverview"));
const ShowEpisodes = React.lazy(() => import("../Pages/Shows/ShowEpisodes"));
const ShowSeasons = React.lazy(() => import("../Pages/Shows/ShowSeasons"));
const ShowCast = React.lazy(() => import("../Pages/Shows/ShowCast"));
const ShowCrew = React.lazy(() => import("../Pages/Shows/ShowCrew"));
const ShowCharacters = React.lazy(() => import("../Pages/Shows/ShowCharacters"));

const PageNotFound = React.lazy(() => import("../Pages/PageNotFound"));

function TvShowLayoutRoutes() {
  return (
    <>
      <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
        <Routes>
          <Route index element={<Home />} />

          <Route path="shows" element={<AllShows />} />

          <Route path="shows/:id/:name" element={<ShowDetailsPage />}>
            <Route index element={<ShowOverview />} />
            <Route path="episodes" element={<ShowEpisodes />} />
            <Route path="seasons" element={<ShowSeasons />} />
            <Route path="cast" element={<ShowCast />} />
            <Route path="crew" element={<ShowCrew />} />
            <Route path="Characters" element={<ShowCharacters />} />
          </Route>

          <Route path="Schedule" element={<SchedulePage />} />

          <Route path={"*"} element={<PageNotFound />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default TvShowLayoutRoutes;
