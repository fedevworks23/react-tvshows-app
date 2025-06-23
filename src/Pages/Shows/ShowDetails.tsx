import { useEffect, useState } from "react";
import axios from "axios";
import {  Outlet, useParams } from "react-router";
import LoaderComponent from "../../components/LoaderComponent";
import { URL } from "../../Constant/constants";
import ShowsNavbar from "./ShowsNavbar";

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState<any>(null);
  const [subTitle, setSubTitle] = useState<string>("");

  const showDetailsNavbar = [
    {
      path: "main",
      title: "Main",
      route: `/shows/${id}/${show?.name.replace(/\s+/g, "-")}`,
      subTitle: "",
    },
    {
      path: "episodes",
      title: "Episodes",
      route: `/shows/${id}/${show?.name.replace(/\s+/g, "-")}/episodes`,
      subTitle: " - Episodes",
    },
    {
      path: "seasons",
      title: "Seasons",
      route: `/shows/${id}/${show?.name.replace(/\s+/g, "-")}/seasons`,
      subTitle: " - Seasons",
    },
    {
      path: "cast",
      title: "Cast",
      route: `/shows/${id}/${show?.name.replace(/\s+/g, "-")}/Cast`,
      subTitle: " - Cast",
    },
    {
      path: "crew",
      title: "Crew",
      route: `/shows/${id}/${show?.name.replace(/\s+/g, "-")}/Crew`,
      subTitle: " - Crew",
    },
    {
      path: "characters",
      title: "Characters",
      route: `/shows/${id}/${show?.name.replace(/\s+/g, "-")}/characters`,
      subTitle: " - Characters",
    },
    {
      path: "gallery",
      title: "Gallery",
      route: `/shows/${id}/${show?.name.replace(/\s+/g, "-")}/gallery`,
      subTitle: " - Gallery",
    },
    {
      path: "news",
      title: "News",
      route: `/shows/${id}/${show?.name.replace(/\s+/g, "-")}/news`,
      subTitle: " - News",
    },
  ];

  useEffect(() => {
    axios.get(`${URL}/shows/${id}`).then((res) => setShow(res.data));
  }, [id]);

  if (!show) {
    return (
      <div className="flex justify-center items-center text-white">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <div className="bg-white px-2 md:px-8 py-8">
      <ShowsNavbar title={show.name} subTitle={subTitle} showDetailsNavbar={showDetailsNavbar} setSubTitle={setSubTitle}  />

      <div className="fade-in-animation">
        <Outlet context={{ id, show }} />
      </div>
    </div>
  );
};

export default ShowDetail;
