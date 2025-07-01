import { useEffect, useState } from "react";
import { timestampToDate } from "../../../utils/timeStampToDate";
import { NO_IMAGE } from "../../../Constant/constants";
import { currentDay } from "../../../utils/formatDate";

interface ShowOverview {
  details: {
    [key: string]: any; // Adjust the type as per your actual data structure
    id?: number;
    name?: string;
    image?: {
      original?: string;
      medium?: string;
    };
    // Add other properties as needed
  };
  detailsStatus: "idle" | "loading" | "succeeded" | "failed";
}

function ShowOverview({ details }: ShowOverview) {
  const [show, setShow] = useState<typeof details>(details || {});
  useEffect(() => {
    setShow(details || {});
  }, [details]);
  return (
    <>
      <div className="flex lg:flex-row flex-col gap-8">
        {/* Left: Poster and actions */}
        <div className="flex flex-col items-center lg:items-start w-full">
          <div className="flex flex-row level-1">
            <div className="left-poster flex-4/12">
              <img
                src={show?.image?.medium || show?.image?.original || NO_IMAGE}
                alt={show?.name}
                className="shadow-lg mb-4 rounded w-[100%] h-auto"
              />
              <div className="flex flex-col items-center gap-2 w-full">
                <button className="flex justify-center items-center bg-white hover:bg-green-50 px-6 py-2 border-2 border-green-500 rounded-lg w-full font-semibold text-green-700 transition">
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
                  Watch on{" "}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                    alt="Netflix"
                    className="ml-2 w-16 h-8 object-contain"
                  />
                </button>
              </div>
            </div>

            <div className="right-summary flex-8/12">
              <div className="mb-4 ml-4 text-gray-700 text-lg text-justify">
                {show?.summary && (
                  <span dangerouslySetInnerHTML={{ __html: show?.summary }} />
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full level-2">
            {/* Center: Summary and episodes */}
            <div className="flex-1">
              {/* Next Episode */}
              <div className="mb-8">
                <h2 className="mb-2 font-light text-gray-900 text-2xl">
                  Next Episode
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center bg-gray-100 px-3 py-2 rounded">
                    <span className="text-gray-500 text-xs">Nov</span>
                    <span className="font-bold text-gray-900 text-2xl">26</span>
                    <span className="text-gray-500 text-xs">Wed</span>
                  </div>
                  <div>
                    <div className="font-medium text-teal-600 text-lg">
                      Chapter One: The Crawl
                    </div>
                    <div className="text-gray-600">
                      Episode 5x01; Nov 26, 2025
                    </div>
                  </div>
                </div>
              </div>
              {/* Previous Episodes */}
              <div>
                <h2 className="mb-2 font-light text-gray-900 text-2xl">
                  Previous Episodes
                </h2>
                <div className="overflow-x-auto">
                  <table className="bg-white border border-gray-200 rounded min-w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b font-semibold text-gray-700 text-left">
                          Episode Name
                        </th>
                        <th className="px-4 py-2 border-b font-semibold text-gray-700 text-left">
                          Airdate
                        </th>
                        <th className="px-4 py-2 border-b font-semibold text-gray-700 text-left">
                          Trailer
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-teal-700 underline cursor-pointer">
                          {show?._links?.previousepisode?.name ||
                            "No Next Episode"}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {timestampToDate(show?.updated)?.toLocaleDateString(
                            undefined,
                            { year: "numeric", month: "short", day: "numeric" }
                          ) || ""}
                        </td>
                        <td className="px-4 py-2"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="mt-2 text-teal-700 text-sm underline">
                  View full episode list &raquo;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info and tags */}
        <div className="flex flex-col flex-shrink-0 gap-6 mt-8 lg:mt-0 w-full lg:w-80">
          {/* Show Info */}
          <div className="bg-gray-50 shadow p-4 border border-gray-200 rounded-lg">
            <h3 className="mb-2 font-semibold text-gray-900 text-xl">
              Show Info
            </h3>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Network:</span>{" "}
              <span className="text-teal-700">
                {show?.network?.name || "Netflix"}
              </span>{" "}
              <span className="text-gray-500">
                ({show?.premiered?.slice(0, 4)} - now)
              </span>
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Schedule:</span>{" "}
              <span className="text-teal-700">
                {show?.schedule?.time || "Netflix"}
              </span>{" "}
              <span className="text-gray-500">
                {/* {new Date().getDay() - 1}s */}
                {show?.schedule?.days.includes(currentDay)}
              </span>
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Average Runtime:</span>{" "}
              {/* {show?.runtime || 62} minutes */}
              {show?.averageRuntime !== "" ? show?.averageRuntime : "N.A."}
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Status:</span>{" "}
              {show?.status || "Running"}
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Show Type:</span>{" "}
              {show?.type || "Scripted"}
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Genres:</span>{" "}
              {show?.genres?.join(" | ") || "N.A."}
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Seasons: </span>
              {show?._embedded?.seasons.length}
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Created by:</span>{" "}
              <span className="text-teal-700">Ross Duffer | Matt Duffer</span>
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Official site:</span>{" "}
              <a
                href={show?.officialSite}
                className="text-teal-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {show?.officialSite || "www.netflix.com"}
              </a>
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Average Rating:</span>{" "}
              <span className="font-semibold text-gray-700">
                {show?.rating?.average || "N.A."}
              </span>
              <span className="text-gray-500 text-sm">(708 votes)</span>
            </div>
          </div>
          {/* Extra Details */}
          <div className="bg-gray-50 shadow p-4 border border-gray-200 rounded-lg">
            <h3 className="mb-2 font-semibold text-gray-900 text-xl">
              Extra Details
            </h3>
            <div className="mb-1 font-semibold text-gray-700 text-sm">
              Also known as: In another language
            </div>
            <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
              <li>
                Bagulhos Sinistros{" "}
                <span className="inline-block align-middle">🇧🇷</span> (Brazil)
              </li>
              <li>
                Странни неща{" "}
                <span className="inline-block align-middle">🇧🇬</span> (Bulgaria)
              </li>
              <li>
                怪奇物语 <span className="inline-block align-middle">🇨🇳</span>{" "}
                (China)
              </li>
              <li>
                Podivné věci{" "}
                <span className="inline-block align-middle">🇨🇿</span> (Czech
                Republic)
              </li>
              <li>
                Különös dolgok{" "}
                <span className="inline-block align-middle">🇭🇺</span> (Hungary)
              </li>
              <li>
                דברים מוזרים{" "}
                <span className="inline-block align-middle">🇮🇱</span> (Israel)
              </li>
              <li>
                ストレンジャー・シングス 未知の世界{" "}
                <span className="inline-block align-middle">🇯🇵</span> (Japan)
              </li>
              <li>
                스트레인저 싱스{" "}
                <span className="inline-block align-middle">🇰🇷</span> (Korea,
                Republic of)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowOverview;
