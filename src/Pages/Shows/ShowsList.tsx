import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { NO_IMAGE } from "../../Constant/constants";
import { fetchAllShows } from "../../store/tvShowsThunks";
import FilterShows from "./FilterShows";

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
  const { results, detailsStatus, allShowsFilter } = useSelector(
    (state: RootState) => state.tvShows
  );

  useEffect(() => {
    if (
      detailsStatus === "idle" ||
      (detailsStatus === "succeeded" && !results.length)
    ) {
      dispatch(fetchAllShows());
    }
  }, [dispatch]);

  // Error Handling
  const { error } = useSelector((state: RootState) => state.tvShows);
  const navigate = useNavigate();

  useEffect(() => {
    if (detailsStatus === "failed" && error) {
      navigate("/error", { state: { message: error } });
    }
  }, [detailsStatus, error, navigate]);

  if (detailsStatus === "loading")
    return <p className="text-white">Loading...</p>;
  if (detailsStatus === "failed")
    return <p className="text-white">Error loading TV shows.</p>;

  return (
    <section className="bg-white shadow p-4 md:p-8">
      <h2 className="mb-6 font-bold text-gray-900 text-3xl">All Shows</h2>
      <FilterShows />
      <hr className="my-6 border-gray-200" />

      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {results
          .filter((item) => {
            return allShowsFilter?.showType !== ""
              ? item?.type === allShowsFilter?.showType
              : item?.type;
          })
          .map((item: ShowsProps) => (
            <NavLink
              key={item.id}
              to={`/shows/${item.id}/${item.name.replace(/\s+/g, "-")}/`}
              className="group flex flex-col bg-[#3F3F3F] shadow hover:shadow-lg border-teal-100 border-b-4 rounded-b overflow-hidden transition"
              style={{ minHeight: 340 }}
            >
              <img
                src={item.image?.medium || item.image?.original || NO_IMAGE}
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
    </section>
  );
}

export default Shows;
