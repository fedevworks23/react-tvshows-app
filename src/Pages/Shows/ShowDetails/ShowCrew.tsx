
interface ShowCrew {
  details: {
    crew: any[];
    cast?: any[];
  };
  detailsStatus: "idle" | "loading" | "succeeded" | "failed";
}

import fallbackImg from '../../../assets/210x295px.png'

function ShowCrew({ details, detailsStatus }: ShowCrew) {
  return (
    <>
      {detailsStatus === "loading" && (
        <div className="text-gray-500">Loading crew information...</div>
      )}
      {details.crew &&
      Array.isArray(details.crew) &&
      details.crew.length > 0 ? (
        <div
          className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {details.crew.map((member: any, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-4 rounded-lg"
            >
              <img
                src={
                  member.person?.image?.medium || 
                  fallbackImg
                }
                alt={member.person?.name || "Unknown"}
                className="mb-2 rounded-full w-[50%] h-auto object-cover"
              />
              <h3 className="font-semibold text-gray-700 text-lg">
                {member.person?.name || "Unknown"}
              </h3>
              <p className="text-gray-600 text-sm">
                {member.type || "Unknown Role"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        detailsStatus !== "loading" && (
          <div className="text-gray-500">No crew information available.</div>
        )
      )}
    </>
  );
}

export default ShowCrew;
