import { useEffect } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getTvShows } from "../../store/tvShowsReducer";
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
    if (status === "idle" || (status === "succeeded" && !results.length)) {
      dispatch(getTvShows());
    }
  }, [dispatch]);

  if (status === "loading") return <p className="text-white">Loading...</p>;
  if (status === "failed")
    return <p className="text-white">Error loading TV shows.</p>;

  return (
    <section className="bg-white shadow p-4 md:p-8">
      <h2 className="mb-6 font-bold text-gray-900 text-3xl">All Shows</h2>
      <hr className="mb-6 border-gray-200" />

      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {results.slice(0, 10).map((item: ShowsProps) => (
          <NavLink
            key={item.id}
            to={`/shows/${item.id}/${item.name.replace(/\s+/g, "-")}/`}
            className="group flex flex-col bg-[#3F3F3F] shadow hover:shadow-lg border-teal-100 border-b-4 rounded-b overflow-hidden transition"
            style={{ minHeight: 340 }}
          >
            <img
              src={
                item.image?.medium ||
                item.image?.original ||
                "https://via.placeholder.com/210x295?text=No+Image"
              }
              alt={item.name || ""}
              className="w-full object-cover"
            />
            <div className="flex flex-col flex-1 justify-center px-4 py-3">
              <div className="mb-1 font-semibold text-[15px] text-white leading-tight">
                {item.name}
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      <div className="flex justify-start mt-6">
        <NavLink
          to="/shows"
          className="hover:bg-teal-50 px-5 py-2 border-2 border-teal-700 rounded-full font-medium text-teal-800 transition"
        >
          More shows &raquo;
        </NavLink>
      </div>
    </section>
  );
}

export default Shows;
