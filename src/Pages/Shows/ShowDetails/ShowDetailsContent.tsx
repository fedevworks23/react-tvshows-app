import React, {  } from "react";
import { useLocation } from "react-router";
import {  useSelector } from "react-redux";
import type { RootState } from "../../../store/index";
import ShowGallery from "./ShowGallery";

const ShowOverview = React.lazy(() => import("./ShowOverview"));
const ShowEpisodes = React.lazy(() => import("./ShowEpisodes"));
const ShowSeasons = React.lazy(() => import("./ShowSeasons"));
const ShowCast = React.lazy(() => import("./ShowCast"));
const ShowCrew = React.lazy(() => import("./ShowCrew"));
// const ShowCharacters = React.lazy(() => import("./ShowCharacters"));

function ShowDetailsContent() {
  const { pathname } = useLocation();
  const currentPath = pathname.split("/").pop();

  const { details, detailsStatus } = useSelector(
    (state: RootState) => state.tvShows
  );


  // Render the correct component based on the current path
  switch (currentPath) {
    case "":
      return (
        <ShowOverview details={details} detailsStatus={detailsStatus} />
      );
    case "episodes":
      return (
        <ShowEpisodes details={details} detailsStatus={detailsStatus} />
      );
    case "seasons":
      return (
        <ShowSeasons details={details} detailsStatus={detailsStatus} />
      );
    case "cast":
      return (
        <ShowCast details={details} detailsStatus={detailsStatus} />
      );
    case "crew":
      return (
        <ShowCrew details={details} detailsStatus={detailsStatus} />
      );
    case "images":
      return (
        <ShowGallery details={details} detailsStatus={detailsStatus} />
      );
    default:
      return (
        <div className="py-8 text-gray-500 text-center">
          Section not found.
        </div>
      );
  }
}

export default ShowDetailsContent;