import { useEffect, useState } from "react";
import { URL } from "../Constant/constants";
import axios from "axios";
import { useNavigate } from "react-router";

interface ShowDetailProps {
  id: string;
  show: {
    image: {
      medium: string;
      original: string;
    };
    name?: string;
  };
}

function Schedule() {
  const [scheduleItem, setScheduleItem] = useState<ShowDetailProps[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL}/schedule`).then((res) => setScheduleItem(res.data));
  }, []);

  return (
    <>
      <section className="bg-[#0b1016] shadow my-8 p-8 rounded-xl">
        <h2 className="mb-6 font-bold text-white text-3xl">Schedule Shows</h2>
        <hr className="mb-6 border-[#232a36]" />

        <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {scheduleItem.map((item: ShowDetailProps) => (
            <div
              key={item.id}
              className="bg-[#181e26] shadow rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              onClick={() =>
                navigate(
                  `${item.id}/${
                    item.show?.name ? item.show.name.replace(/\s+/g, "-") : ""
                  }`
                )
              }
            >
              <img
                src={
                  item.show.image?.medium ||
                  item.show.image?.original
                }
                alt={item.show.name || ""}
                className="w-full h-auto object-cover"
              />
              {/* Optionally show show name */}
              <div className="p-2 font-semibold text-white/70 truncate">
                {item.show.name}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Schedule;
