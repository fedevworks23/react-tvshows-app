import { useState } from "react";
import { NavLink, useParams } from "react-router";



function ShowsNavbar() {
  const {id, name} = useParams<{ id: string; name: string }>();
  const [subTitle, setSubTitle] = useState<string>("");
  
  const ShowDetailsLayoutNavbar = [
    {
      path: "main",
      title: "Main",
      route: `/shows/${id}/${name?.replace(/\s+/g, "-")}`,
      subTitle: "",
    },
    {
      path: "episodes",
      title: "Episodes",
      route: `/shows/${id}/${name?.replace(/\s+/g, "-")}/episodes`,
      subTitle: " - Episodes",
    },
    {
      path: "seasons",
      title: "Seasons",
      route: `/shows/${id}/${name?.replace(/\s+/g, "-")}/seasons`,
      subTitle: " - Seasons",
    },
    {
      path: "cast",
      title: "Cast",
      route: `/shows/${id}/${name?.replace(/\s+/g, "-")}/Cast`,
      subTitle: " - Cast",
    },
    {
      path: "crew",
      title: "Crew",
      route: `/shows/${id}/${name?.replace(/\s+/g, "-")}/Crew`,
      subTitle: " - Crew",
    },
    {
      path: "characters",
      title: "Characters",
      route: `/shows/${id}/${name?.replace(/\s+/g, "-")}/characters`,
      subTitle: " - Characters",
    },
    {
      path: "gallery",
      title: "Gallery",
      route: `/shows/${id}/${name?.replace(/\s+/g, "-")}/gallery`,
      subTitle: " - Gallery",
    },
    {
      path: "news",
      title: "News",
      route: `/shows/${id}/${name?.replace(/\s+/g, "-")}/news`,
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
          <NavLink key={index} to={navMenu.route}>
            <button
              className="bg-gray-200 shadow-sm px-4 py-1 rounded text-gray-500 hover:text-gray-900 cursor-pointer"
              onClick={() => {
                setSubTitle(navMenu.subTitle);
              }}
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
