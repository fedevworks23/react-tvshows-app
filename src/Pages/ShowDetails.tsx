import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import {
  FiPlay,
  FiThumbsUp,
  FiThumbsDown,
  FiCheck,
  FiBookmark,
} from "react-icons/fi";
import LoaderComponent from "../components/LoaderComponent";

interface ShowDetailProps {}

const ShowDetail: React.FC<ShowDetailProps> = () => {
  const { id } = useParams();
  const [show, setShow] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => setShow(res.data));
  }, [id]);

  if (!show) {
    return (
      <div className="flex justify-center items-center h-96 text-white">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <div
      className="bg-[#0b1016] px-2 md:px-8 py-8 min-h-screen text-white"
      style={{
        background: `linear-gradient(180deg, rgba(11,16,22,0.7) 60%, #0b1016 100%), url(${
          show.image?.original || show.image?.medium
        }) center/cover no-repeat`,
        minHeight: "260px",
      }}
    >
      {/* Banner */}
      <div className="relative flex md:flex-row flex-col items-center md:items-end rounded-xl overflow-hidden">
        <div className="flex md:flex-row flex-col items-center md:items-end gap-6 p-6 md:p-10 w-full">
          <img
            src={
              show.image?.medium ||
              show.image?.original ||
              "https://via.placeholder.com/210x295?text=No+Image"
            }
            alt={show.name}
            className="bg-[#181e26] shadow-lg border-[#181e26] border-4 rounded-lg w-40 h-56 object-cover"
          />
          <div className="flex-1 mt-4 md:mt-0">
            <h1 className="mb-2 font-extrabold text-3xl md:text-4xl">
              {show.name}{" "}
              <span className="font-light text-gray-400 text-2xl">
                ({show.premiered?.slice(0, 4)})
              </span>
            </h1>
            <div className="mb-2 text-gray-400 text-base">
              {show?.language && <>Original Language: {show.language}</>}
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="flex items-center gap-1 font-semibold text-yellow-400">
                <FiPlay className="inline" />{" "}
                {show.rating?.average ? `${show.rating.average}/10` : "N/A"}
              </span>
              <span className="text-gray-400">
                {show.runtime
                  ? `${Math.floor(show.runtime / 60)}h ${show.runtime % 60}min`
                  : ""}
              </span>
              <span className="text-gray-400">{show.genres?.join(", ")}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="bg-[#181e26] hover:bg-yellow-400 px-4 py-2 rounded font-semibold text-white hover:text-black transition">
                Official Site
              </button>
              <button className="bg-[#181e26] hover:bg-yellow-400 px-4 py-2 rounded font-semibold text-white hover:text-black transition">
                Watch for free
              </button>
              <button className="bg-[#181e26] hover:bg-yellow-400 px-4 py-2 rounded font-semibold text-white hover:text-black transition">
                Synopsis
              </button>
              <button className="bg-[#181e26] hover:bg-yellow-400 px-4 py-2 rounded font-semibold text-white hover:text-black transition">
                Trailers
              </button>
              <button className="bg-[#181e26] hover:bg-yellow-400 px-4 py-2 rounded font-semibold text-white hover:text-black transition">
                Similar titles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex lg:flex-row flex-col gap-8 mt-8">
        {/* Left: Watch Now & Synopsis */}
        <div className="flex-1">
          <div className="bg-[#181e26] mb-6 p-6 rounded-xl">
            <h2 className="mb-4 font-bold text-xl">WATCH NOW</h2>
            <div className="flex md:flex-row flex-col items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-4 bg-[#232a36] mb-2 p-4 rounded-lg">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.png"
                    alt="Prime Video"
                    className="rounded w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-white">
                      Watch similar movies on Prime Video for free
                    </div>
                    <div className="text-gray-400 text-sm">
                      30 Days Free{" "}
                      <span className="ml-2">Then ₹299.00 / month</span>
                    </div>
                  </div>
                  <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded font-semibold text-black transition">
                    Stream Free
                  </button>
                </div>
                <div className="flex flex-row">
                  <div className="flex-1/2 mt-2 text-gray-400 text-sm">
                    {show.name} is not available for free.
                    <br />
                    Let us notify you when you can watch it.
                  </div>
                  <button className="flex-1/3 bg-[#232a36] hover:bg-yellow-400 mt-3 px-4 py-2 rounded w-full font-semibold text-white hover:text-black transition">
                    Notify me
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#181e26] mb-6 p-6 rounded-xl">
            <h2 className="mb-4 font-bold text-xl">SYNOPSIS</h2>
            <div
              className="text-gray-200 text-base"
              dangerouslySetInnerHTML={{
                __html: show.summary || "No synopsis available.",
              }}
            />
          </div>
        </div>
        {/* Right: About the Movie */}
        <div className="flex-shrink-0 w-full lg:w-80">
          <div className="bg-[#181e26] mb-6 p-6 rounded-xl">
            <h3 className="mb-4 font-bold text-lg">ABOUT THE MOVIE</h3>
            <div className="flex flex-col items-center mb-4">
              <img
                src={
                  show.image?.medium ||
                  show.image?.original ||
                  "https://via.placeholder.com/210x295?text=No+Image"
                }
                alt={show.name}
                className="shadow mb-2 rounded-lg w-32 h-44 object-cover"
              />
              <div className="text-center">
                <div className="font-semibold text-white">{show.name}</div>
                <div className="text-gray-400 text-sm">
                  {show.premiered?.slice(0, 4)}
                </div>
              </div>
            </div>
            <div className="mb-2">
              <span className="font-semibold">DIRECTOR</span>
              <div className="text-gray-400">
                {show?.externals?.thetvdb ? "N/A" : "N/A"}
              </div>
            </div>
            <div className="mb-2">
              <span className="font-semibold">RATING</span>
              <div className="flex items-center gap-2 text-yellow-400">
                <FiPlay />{" "}
                {show.rating?.average ? `${show.rating.average}/10` : "N/A"}
              </div>
            </div>
            <div className="mb-2">
              <span className="font-semibold">GENRES</span>
              <div className="text-gray-400">{show.genres?.join(", ")}</div>
            </div>
            <div className="mb-2">
              <span className="font-semibold">RUNTIME</span>
              <div className="text-gray-400">
                {show.runtime
                  ? `${Math.floor(show.runtime / 60)}h ${show.runtime % 60}min`
                  : "N/A"}
              </div>
            </div>
            <div className="mb-2">
              <span className="font-semibold">PRODUCTION COUNTRY</span>
              <div className="text-gray-400">
                {show.network?.country?.name || "N/A"}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex flex-1 justify-center items-center gap-2 bg-[#232a36] hover:bg-yellow-400 px-3 py-2 rounded font-semibold text-white hover:text-black transition">
                <FiThumbsUp /> {Math.floor(Math.random() * 100)}
              </button>
              <button className="flex flex-1 justify-center items-center gap-2 bg-[#232a36] hover:bg-yellow-400 px-3 py-2 rounded font-semibold text-white hover:text-black transition">
                <FiThumbsDown /> {Math.floor(Math.random() * 50)}
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="flex flex-1 justify-center items-center gap-2 bg-[#232a36] hover:bg-yellow-400 px-3 py-2 rounded font-semibold text-white hover:text-black transition">
                <FiBookmark /> Watchlist
              </button>
              <button className="flex flex-1 justify-center items-center gap-2 bg-[#232a36] hover:bg-yellow-400 px-3 py-2 rounded font-semibold text-white hover:text-black transition">
                <FiCheck /> Seen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetail;
