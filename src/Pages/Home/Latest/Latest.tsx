import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { getLatestShowsByID } from "../../../store/tvShowsReducer";
import { NavLink } from "react-router";
import { NO_IMAGE } from "../../../Constant/constants";
import { formattedDateSH } from "../../../utils/formatDate";
import { timestampToDate } from "../../../utils/timeStampToDate";

function Latest() {
  const dispatch = useDispatch<AppDispatch>();
  const [newShowsId, setNewShowsId] = useState<
    { id: string; updated: string }[]
  >([]);

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/schedule?country=US&date=${formattedDateSH}`)
      .then((response) => {
        const sortedNewShows = (response.data as any[])
          .filter((item) => {
            return item?.show?.rating?.average > 7.5;
          })
          .map(
            (
              item
            ): {
              id: string;
              updated: string;
              rating: string;
              airtime: string;
              name: string;
            } => {
              return {
                id: String(item.show.id),
                rating: item?.show?.rating?.average,
                airtime: String(item.airtime),
                updated: String(timestampToDate(item.show.updated)),
                name: String(item.show.name),
              };
            }
          )
          .sort((a, b) => Number(b.updated) - Number(a.updated));

        setNewShowsId(sortedNewShows);
      })
      .catch((error) => console.error(error));
  }, []);

  const { latestShows, detailsStatus } = useSelector(
    (state: RootState) => state.tvShows
  );

  useEffect(() => {
    if (detailsStatus === "idle" && !latestShows.length && newShowsId.length) {
      const ids = newShowsId.slice(0, 5).map((item) => item.id);
      dispatch(getLatestShowsByID(ids));
    }
  }, [newShowsId, detailsStatus, latestShows.length, dispatch]);

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
    <>
      <NavLink
        key={item.id}
        to={`/shows/${item.id}/${item.name.replace(/\s+/g, "-")}/`}
        className="group flex flex-col bg-[#3F3F3F] shadow hover:shadow-lg mt-2 rounded-b rounded-t-1xl overflow-hidden transition"
        style={{ minHeight: 340 }}
      >
        <div>
          <img
            src={item.image?.medium || NO_IMAGE}
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
    </>
  );
};

export default Latest;
