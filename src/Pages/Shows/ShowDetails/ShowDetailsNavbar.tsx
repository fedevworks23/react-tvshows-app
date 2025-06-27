import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router";
import { clearShowDetails, fetchShowDetailsById } from "../../../store/tvShowsReducer";
import type { AppDispatch } from "../../../store";

function ShowsNavbar() {
  const { id, name } = useParams<{ id: string; name: string }>();
  const [subTitle, setSubTitle] = useState<string>("");
  const [currentUrl, setCurrentUrl] = useState<string>(
    window.location.pathname
  );

  const dispatch = useDispatch<AppDispatch>();

  const clearStateHandler = () => {
    dispatch(clearShowDetails());
  };

  useEffect(() => {
    const currentPath = currentUrl.split("/").pop();
    console.log(currentPath);
    
    dispatch(fetchShowDetailsById({ id: id ?? "", navMenu: currentPath ?? "" }));
    
  }, [id, currentUrl]);

  const ShowDetailsLayoutNavbar = [
    {
      path: "",
      title: "Main",
      subTitle: "",
    },
    {
      path: "episodes",
      title: "Episodes",
      subTitle: " - Episodes",
    },
    {
      path: "seasons",
      title: "Seasons",
      subTitle: " - Seasons",
    },
    {
      path: "cast",
      title: "Cast",
      subTitle: " - Cast",
    },
    {
      path: "crew",
      title: "Crew",
      subTitle: " - Crew",
    },
    {
      path: "characters",
      title: "Characters",
      subTitle: " - Characters",
    },
    {
      path: "images",
      title: "Gallery",
      subTitle: " - Gallery",
    },
    {
      path: "news",
      title: "News",
      subTitle: " - News",
    },
  ];

  return (
    <>
      {/* Show Title */}
      <h1 className="mb-2 text-gray-900 text-4xl">
        {name?.replace(/[-]+/g, " ")} {subTitle}
      </h1>
      {/* Show Nav Menu */}
      <div className="flex gap-2 mb-4">
        {ShowDetailsLayoutNavbar.map((navMenu, index) => (
          <NavLink
            key={index}
            to={`/shows/${id}/${name?.replace(/\s+/g, "-")}/${navMenu.path}`}
            className="text-gray-500 hover:text-gray-900"
            onClick={() => {
              setSubTitle(navMenu.subTitle);
              clearStateHandler();
              // Update currentUrl to the new location after navigation
              setTimeout(() => {
                setCurrentUrl(window.location.pathname);
              }, 0);
            }}
          >
            <button
              className="bg-gray-200 shadow-sm px-4 py-1 rounded text-gray-500 hover:text-gray-900 cursor-pointer"
              type="button"
            >
              {navMenu.title}
            </button>
          </NavLink>
        ))}
      </div>
      <hr className="opacity-40 my-2 border-[#0b1016] border-b-1" />
    </>
  );
}

export default ShowsNavbar;
