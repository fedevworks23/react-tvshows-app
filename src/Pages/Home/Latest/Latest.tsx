import { useEffect, useState, type Key } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { getPopularShows } from "../../../store/tvShowsReducer";
import { NavLink, useNavigate } from "react-router";
import { NO_IMAGE } from "../../../Constant/constants";
import { currentDate } from "../../../utils/formatDate";
import { timestampToDate } from "../../../utils/timeStampToDate";

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

function Latest() {
  const { detailsStatus, popularShows } = useSelector(
    (state: RootState) => state.tvShows
  );
  const dispatch = useDispatch<AppDispatch>();

  const [latestShows, setLatestShows] = useState([] as any);
  useEffect(() => {
    if (detailsStatus && !popularShows.length)
      dispatch(getPopularShows([currentDate]));

    const sortedNewShows = (popularShows as any[])
      .filter((item) => item?.show?.rating?.average > 7.5)
      .map((item) => {
        return {
          id: String(item.show.id),
          rating: item?.show?.rating?.average,
          airtime: String(item.airtime),
          updated: String(timestampToDate(item.show.updated)),
          name: String(item.show.name),
          image: {
            medium: String(item?.show?.image?.medium),
            original: String(item?.show?.image?.original),
          },
        };
      })
      .sort((a, b) => Number(b.updated) - Number(a.updated));
    setLatestShows(sortedNewShows);
  }, [popularShows, dispatch]);

  // Error Handling
  const { error } = useSelector((state: RootState) => state.tvShows);
  const navigate = useNavigate();

  useEffect(() => {
    if (detailsStatus === "failed" && error) {
      navigate("/error", { state: { message: error } });
    }
  }, [detailsStatus, error, navigate]);
  
  return (
    <>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {latestShows &&
          latestShows.map(
            (
              item: LatestShowDetailsProps["item"],
              i: Key | null | undefined
            ) => <LatestShowDetails key={i} item={item} />
          )}
      </div>
    </>
  );
}

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
