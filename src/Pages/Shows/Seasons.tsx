import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { URL } from "../../Constant/constants";

interface Season {
  id: number;
  number: number;
  premiereDate?: string;
  image?: { medium?: string; original?: string };
  summary?: string;
}

function Seasons() {
  const { id } = useParams();
  const [seasons, setSeasons] = useState<Season[]>([]);

  useEffect(() => {
    axios.get(`${URL}/shows/${id}/seasons`).then((res) => setSeasons(res.data));
  }, [id]);

  return (
    <div className="bg-white px-2 md:px-8 py-8 min-h-screen">
      <h1 className="mb-8 font-light text-gray-900 text-4xl">
        <span className="font-normal">Seasons</span>
      </h1>
      <div className="flex flex-col gap-10">
        {seasons.map((season, idx) => (
          <div
            key={idx}
            className="flex md:flex-row flex-col items-start md:items-center gap-6"
          >
            {/* Poster */}
            <img
              src={
                season.image?.medium ||
                season.image?.original ||
                "https://via.placeholder.com/210x295?text=No+Image"
              }
              alt={`Season ${season.number}`}
              className="flex-shrink-0 shadow-lg mx-auto md:mx-0 rounded w-32 h-44 object-cover"
            />
            {/* Info */}
            <div className="flex-1">
              <div className="flex sm:flex-row flex-col sm:items-end gap-2">
                <h2 className="font-light text-teal-600 text-3xl">
                  Season {season.number}
                </h2>
                <span className="ml-0 sm:ml-2 font-light text-gray-400 text-2xl">
                  {/* {show?.name} {season.number > 1 ? season.number : ""} */}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 mb-3">
                <span className="font-medium text-teal-600 text-lg">
                  Netflix
                </span>
                <span className="text-gray-400 text-base">
                  {season.premiereDate
                    ? `, ${new Date(season.premiereDate).getFullYear()}`
                    : ""}
                </span>
              </div>
              {/* Watch now and Netflix logo */}
              <div className="flex items-center gap-6 mb-2">
                <button className="flex items-center bg-white hover:bg-teal-50 px-8 py-3 border-2 border-teal-400 rounded-lg font-semibold text-teal-600 transition">
                  <svg
                    className="mr-2 w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.118v7.764a1 1 0 001.234.97l6.518-1.757A1 1 0 0016 14.882V9.118a1 1 0 00-1.248-.95z"
                    />
                  </svg>
                  Watch now
                </button>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                  alt="Netflix"
                  className="w-16 h-8 object-contain"
                />
              </div>
              {/* JustWatch */}
              <div className="mb-2 text-amber-400 text-xs">▶JustWatch</div>
              {/* Summary */}
              <div className="max-w-2xl text-gray-700 text-base">
                {season.summary ? (
                  <span dangerouslySetInnerHTML={{ __html: season.summary }} />
                ) : (
                  "No summary available."
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Seasons;
