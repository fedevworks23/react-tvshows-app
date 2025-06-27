import React from "react";
import Slider from "./../../components/Slider/Slider";
const Latest = React.lazy(
  () => import("./Latest/Latest")
)


function HomePage() {

  return (
    <>
      <Slider />
      <Latest />
    </>
  );
}

export default HomePage;
