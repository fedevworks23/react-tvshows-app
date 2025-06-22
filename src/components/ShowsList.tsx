import { useNavigate } from "react-router";

interface ShowsListProps {
  title: string;
  showsList: any[];
}

function ShowsList({ title, showsList }: ShowsListProps) {
  const navigate = useNavigate()
  return (
    <section className="bg-[#0b1016] shadow my-8 p-8 rounded-xl">
      {/* <div className="flex items-center gap-4 mb-6">
        <span className="bg-[#181e26] px-4 py-2 rounded-full font-semibold text-white text-sm">
          JustWatch Editor Pick
        </span>
      </div> */}
      <h2 className="mb-6 font-bold text-white text-3xl">{title}</h2>
      <hr className="mb-6 border-[#232a36]" />

      <div className="flex justify-between gap-4 pb-2">
        {showsList.slice(0, 5).map((show) => (
          <div
            key={show.id}
            className="flex-shrink-0 bg-[#181e26] shadow rounded-lg w-48 overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            onClick={(() => {navigate(`/${show.id}`);
            })}
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
            <div className="p-3">
              <div className="font-semibold text-white text-base truncate">
                {show.name}
              </div>
              {/* Optionally add more info here */}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button className="bg-yellow-400 hover:bg-yellow-500 shadow mt-2 px-6 py-2 rounded-2xl font-semibold text-black transition-colors cursor-pointer">
          More...
        </button>
      </div>
    </section>
  );
}

export default ShowsList;
