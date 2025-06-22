import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router";
import LoaderComponent from "../components/LoaderComponent";
import { URL } from "../Constant/constants";

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState<any>(null);

  const showDetailsNavbar = [
    { path: "main", title: "Main" },
    { path: "episodes", title: "Episodes" },
    { path: "seasons", title: "Seasons" },
    { path: "cast", title: "Cast" },
    { path: "crew", title: "Crew" },
    { path: "characters", title: "Characters" },
    { path: "gallery", title: "Gallery" },
    { path: "news", title: "News" },
  ];

  useEffect(() => {
    axios.get(`${URL}/shows/${id}`).then((res) => setShow(res.data));
  }, [id]);

  if (!show) {
    return (
      <div className="flex justify-center items-center h-96 text-white">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <div className="bg-white px-2 md:px-8 py-8 min-h-screen">
      {/* Main header */}
      <h1 className="mb-2 font-light text-gray-900 text-4xl">{show.name}</h1>
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {showDetailsNavbar.map((navMenu, index) => (
          <NavLink key={index} to={`/shows/${id}/episodes`}>
            <button className="bg-gray-200 shadow-sm px-4 py-1 rounded text-gray-500 hover:text-gray-900 cursor-pointer">
              {navMenu.title}
            </button>
          </NavLink>
        ))}
      </div>
      {/* Responsive layout */}
      <div className="flex lg:flex-row flex-col gap-8">
        {/* Left: Poster and actions */}
        <div className="flex flex-col items-center lg:items-start w-full">
          <div className="flex flex-row level-1">
            <div className="left-poster flex-4/12">
              <img
                src={
                  show.image?.original ||
                  show.image?.medium ||
                  "https://via.placeholder.com/210x295?text=No+Image"
                }
                alt={show.name}
                className="shadow-lg mb-4 rounded w-[80%] h-auto"
              />
              {/* Disabled Follow Button under poster */}
              {/* <button className="bg-green-500 hover:bg-green-600 mb-4 py-2 rounded w-full font-semibold text-white transition">
                &#43; Follow
              </button> */}
              {/* Watch now and streaming icons */}
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
                {show.summary && (
                  <span dangerouslySetInnerHTML={{ __html: show.summary }} />
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
                          4x09: Chapter Nine: The Piggyback
                        </td>
                        <td className="px-4 py-2 text-gray-600">Jul 1, 2022</td>
                        <td className="px-4 py-2"></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-teal-700 underline cursor-pointer">
                          4x08: Chapter Eight: Papa
                        </td>
                        <td className="px-4 py-2 text-gray-600">Jul 1, 2022</td>
                        <td className="px-4 py-2"></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-teal-700 underline cursor-pointer">
                          4x07: Chapter Seven: The Massacre at Hawkins Lab
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          May 27, 2022
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
              <span className="font-semibold">Web channel:</span>{" "}
              <span className="text-teal-700">
                {show.network?.name || "Netflix"}
              </span>{" "}
              <span className="text-gray-500">
                ({show.premiered?.slice(0, 4)} - now)
              </span>
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Average Runtime:</span>{" "}
              {show.runtime || 62} minutes
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Status:</span>{" "}
              {show.status || "Running"}; returning{" "}
              <span className="text-teal-700">November 2025</span>
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Show Type:</span>{" "}
              {show.type || "Scripted"}
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Genres:</span>{" "}
              {show.genres?.join(" | ") || "Drama | Horror | Science-Fiction"}
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Episodes ordered:</span> 8
              episodes
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Created by:</span>{" "}
              <span className="text-teal-700">Ross Duffer | Matt Duffer</span>
            </div>
            <div className="mb-1 text-gray-700 text-sm">
              <span className="font-semibold">Official site:</span>{" "}
              <a
                href={show.officialSite}
                className="text-teal-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {show.officialSite || "www.netflix.com"}
              </a>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold text-gray-700">
                {show.rating?.average || 8.5}
              </span>
              <span className="text-gray-500 text-sm">(708 votes)</span>
            </div>
          </div>
          {/* Show Tags */}
          <div>
            <h3 className="mb-2 font-semibold text-gray-900 text-xl">
              Show Tags
            </h3>
            <div className="flex flex-wrap gap-2 bg-white p-2 border border-gray-200 rounded">
              <span className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded font-semibold text-green-700 text-xs">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Tag
              </span>
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
    </div>
  );
};

export default ShowDetail;
