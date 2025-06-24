import { useEffect } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getTvShows, setSelectedShow } from "../../store/tvShowsSlice";
import type { RootState, AppDispatch } from "../../store";

type ShowsProps = {
  id: number;
  name: string;
  image?: {
    medium?: string;
    original?: string;
  };
  // Add other properties as needed
};

function Shows() {
  const dispatch = useDispatch<AppDispatch>();
  const { results, status } = useSelector((state: RootState) => state.tvShows);

  useEffect(() => {
    dispatch(getTvShows());
  }, [dispatch]);

  if (status === "loading") return <p className="text-white">Loading...</p>;
  if (status === "failed")
    return <p className="text-white">Error loading TV shows.</p>;

  return (
    <>
      <section className="bg-[#0b1016] shadow my-8 p-8 rounded-xl">
        <h2 className="mb-6 font-bold text-white text-3xl">All Shows</h2>
        <hr className="mb-6 border-[#232a36]" />

        <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((item: ShowsProps) => (
            <div
              key={item.id}
              className="bg-[#181e26] shadow rounded-lg overflow-hidden hover:scale-105 transition-transform animate-list cursor-pointer"
            >
              <NavLink
                to={`/shows/${item.id}/${item.name.replace(/\s+/g, "-")}/`}
                onClick={() => dispatch(setSelectedShow(item))}
              >
                <img
                  src={
                    item.image?.medium ||
                    item.image?.original ||
                    "https://via.placeholder.com/210x295?text=No+Image"
                  }
                  alt={item.name || ""}
                  className="w-full h-auto object-cover"
                />
                {/* Optionally show show name */}
                <div className="p-2 font-semibold text-white/70 truncate">
                  {item.name}
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Shows;
