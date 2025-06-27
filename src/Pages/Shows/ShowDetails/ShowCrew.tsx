
interface ShowCrew {
  details: {
    crew: any[];
    cast?: any[];
  };
  detailsStatus: "idle" | "loading" | "succeeded" | "failed";
}

import { useEffect, useState } from 'react';
import fallbackImg from '../../../assets/210x295px.png'

function ShowCrew({ details, detailsStatus }: ShowCrew) {
  const [show, setShow] = useState<typeof details>(details || {});

  useEffect(() => {
    setShow(details || {});
  }, [details]);

  return (
    <>
      {detailsStatus === "loading" && (
        <div className="text-gray-500">Loading crew information...</div>
      )}
      {show?.crew &&
      Array.isArray(show?.crew) &&
      show?.crew.length > 0 && (
        <div
          className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {show?.crew.map((member: any, index: number) => (
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
      )}
      
      {/* Loading and empty states */}
      {detailsStatus === "loading" && (
        <div className="py-8 text-teal-700 text-center">
          Loading episodes...
        </div>
      )}
      {detailsStatus === "succeeded" && (
        <div className="py-8 text-gray-500 text-center">No episodes found.</div>
      )}
      {detailsStatus === "failed" && (
        <div className="py-8 text-red-500 text-center">
          Failed to load episodes.
        </div>
      )}
    </>
  );
}

export default ShowCrew;
