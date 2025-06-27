import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { fetchShowDetailsById } from "../../../store/tvShowsReducer";
import { NavLink } from "react-router";

function Latest() {
  const dispatch = useDispatch<AppDispatch>();
  const [newShowsId, setNewShowsId] = useState<
    { id: string; updated: string }[]
  >([]);

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/updates/shows?since=day")
      .then((response) => {
        const sortedNewShows = Object.entries(response.data)
          .map(([key, value]): { id: string; updated: string } => {
            return {
              id: String(key),
              updated: String(value),
            };
          })
          .sort((a, b) => Number(b.updated) - Number(a.updated));

        setNewShowsId(sortedNewShows);
      })
      .catch((error) => console.error(error));
  }, []);

  const { latestShows, detailsStatus } = useSelector(
    (state: RootState) => state.tvShows
  );

  useEffect(() => {
    if (detailsStatus === "idle" || !latestShows.length) {
      {
        newShowsId &&
          newShowsId
            .slice(0, 5)
            .map((item) =>
              dispatch(fetchShowDetailsById({ id: item.id, navMenu: "latest" }))
            );
      }
    }
  }, [newShowsId]);

  return (
    <>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {latestShows &&
          latestShows.map((item, index) => (
            <LatestShowDetails key={index} item={item} />
          ))}
      </div>
    </>
  );
}

type LatestShowDetailsProps = {
  item: {
    id: string;
    name: string;
    image: {
      medium: string;
      original: string;
    };
    updated: string;
  };
};

const LatestShowDetails = ({ item }: LatestShowDetailsProps) => {
  return (
    <NavLink
      key={item.id}
      to={`/shows/${item.id}/${item.name.replace(/\s+/g, "-")}/`}
      className="group flex flex-col bg-[#3F3F3F] shadow hover:shadow-lg border-teal-100 border-b-4 rounded-b overflow-hidden transition"
      style={{ minHeight: 340 }}
    >
      <div>
        <img
          src={
            item.image?.medium ||
            item.image?.original ||
            "https://via.placeholder.com/210x295?text=No+Image"
          }
          alt={item.name || ""}
          className="w-full object-cover"
        />
        <div className="flex flex-col flex-1 justify-center bg-gray-500 px-4 py-3">
          <div className="mb-1 font-semibold text-[15px] text-white truncate leading-tight">
            {item.name}
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Latest;
