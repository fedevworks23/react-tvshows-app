import React from "react";
// import Slider from "./../../components/Slider/Slider";
const Latest = React.lazy(
  () => import("./Latest/Latest")
)


function HomePage() {

  return (
    <>
      {/* <Slider /> */}

      <div className="my-2.5 text-2xl">Popular shows airing tonight</div>
      <Latest />
    </>
  );
}

export default HomePage;
