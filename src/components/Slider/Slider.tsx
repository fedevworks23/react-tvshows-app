import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Slider() {
  const [shows, setShows] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/shows")
      .then((res) => setShows(res.data.slice(0, 20))) // Fetch more for carousel
      .catch(() => setShows([]));
  }, []);

  // Auto slide
  useEffect(() => {
    if (shows.length > 5) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % (shows.length - 4));
      }, 15000); // Change slide every 15 seconds
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [shows]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % (shows.length - 4));
  };
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + (shows.length - 4)) % (shows.length - 4));
  };

  if (shows.length < 5) {
    return (
      <div className="flex justify-center items-center bg-[#181e26] rounded-xl h-64 text-white">
        Loading...
      </div>
    );
  }

  // Show 5 cards at a time
  const visibleShows = shows.slice(current, current + 5);

  return (
    <div className="relative mx-auto my-8 w-full max-w-6xl">
      <div className="flex items-center bg-[#181e26] shadow-lg px-2 py-6 rounded-xl overflow-hidden">
        <button
          onClick={prevSlide}
          className="hidden md:block top-1/2 left-2 z-10 absolute bg-[#232a36] hover:bg-yellow-400 p-2 rounded-full text-white hover:text-black transition -translate-y-1/2 cursor-pointer"
          aria-label="Previous"
        >
          &#8592;
        </button>
        <div className="flex flex-1 justify-center gap-4">
          {visibleShows.map((show) => (
            <div
              key={show.id}
              className="flex-shrink-0 bg-[#232a36] shadow-lg rounded-lg w-48 overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate(`/shows/${show.id}/${show.name.replace(/\s+/g, "-")}`)}
            >
              <img
                src={
                  show.image?.medium ||
                  show.image?.original ||
                  "https://via.placeholder.com/210x295?text=No+Image"
                }
                alt={show.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-2 font-semibold text-white/80 truncate">{show.name}</div>
              <div className="px-2 pb-2 text-yellow-400 text-xs truncate">{show.genres?.join(" | ")}</div>
            </div>
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="hidden md:block top-1/2 right-2 z-10 absolute bg-[#232a36] hover:bg-yellow-400 p-2 rounded-full text-white hover:text-black transition -translate-y-1/2 cursor-pointer"
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: shows.length - 4 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer ${current === idx ? "bg-yellow-400" : "bg-[#232a36]"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;