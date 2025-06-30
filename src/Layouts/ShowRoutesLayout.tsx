import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import ShowDetailsLayout from "../Pages/Shows/ShowDetails/ShowDetailsLayout";
import SchedulePage from "../Pages/Schedule/SchedulePage";
import ShowsList from "../Pages/Shows/ShowsList";
import Home from "../Pages/Home/Home";
import ShowDetailsContent from "../Pages/Shows/ShowDetails/ShowDetailsContent";
import ShowGallery from "../Pages/Shows/ShowDetails/ShowGallery";
import ErrorPage from "../Pages/Error/ErrorPage";

const ShowOverview = React.lazy(
  () => import("../Pages/Shows/ShowDetails/ShowOverview")
);
const ShowEpisodes = React.lazy(
  () => import("../Pages/Shows/ShowDetails/ShowEpisodes")
);
const ShowSeasons = React.lazy(
  () => import("../Pages/Shows/ShowDetails/ShowSeasons")
);
const ShowCast = React.lazy(
  () => import("../Pages/Shows/ShowDetails/ShowCast")
);
const ShowCrew = React.lazy(
  () => import("../Pages/Shows/ShowDetails/ShowCrew")
);
const ShowCharacters = React.lazy(
  () => import("../Pages/Shows/ShowDetails/ShowCharacters")
);

const PageNotFound = React.lazy(() => import("../Pages/NotFound/PageNotFound"));

function TvShowLayoutRoutes() {
  return (
    <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
      <Routes>
        <Route index element={<Home />} />

        <Route path="shows" element={<ShowsList />} />

        <Route path="shows/:id/:name" element={<ShowDetailsLayout />}>
          <Route path="" element={<ShowDetailsContent />}>
            <Route path="" element={<ShowOverview details={{
              id: undefined,
              name: undefined,
              image: undefined
            }} detailsStatus={"idle"} />} />
            <Route path="episodes" element={<ShowEpisodes details={{
              episodes: []
            }} detailsStatus={"idle"} />} />
            <Route path="seasons" element={<ShowSeasons details={{
              seasons: []
            }} detailsStatus={"idle"} />} />
            <Route path="cast" element={<ShowCast details={{
              cast: []
            }} detailsStatus={"idle"} />} />
            <Route path="crew" element={<ShowCrew details={{
              crew: [],
              cast: undefined
            }} detailsStatus={"idle"} />} />
            <Route path="images" element={<ShowGallery details={undefined} detailsStatus={""} />} />
            <Route path="characters" element={<ShowCharacters />} />
          </Route>
        </Route>

        <Route path="Schedule" element={<SchedulePage />} />

        <Route path="/error" element={<ErrorPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default TvShowLayoutRoutes;
