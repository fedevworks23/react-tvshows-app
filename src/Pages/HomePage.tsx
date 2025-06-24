import { useDispatch, useSelector } from "react-redux";
import Slider from "./Slider";
import { useEffect } from "react";
import { getTvShows } from "../store/tvShowsSlice";
import type { AppDispatch, RootState } from "../store";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { results, status } = useSelector((state: RootState) => state.tvShows);

  useEffect(() => {
    dispatch(getTvShows()); // default search
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading TV shows.</p>;

  return (
    <>
      <Slider />

      {results.map((show) => (
        <div key={show.id} className="tv-show">
          <h2>{show.name}</h2>
          <p>{show.overview}</p>
          {/* Add more show details as needed */}
        </div>
      ))}
    </>
  );
}

export default HomePage;
