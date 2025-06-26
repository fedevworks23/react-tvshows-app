import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import type { AppDispatch, RootState } from "../../../store";
import { fetchShowDetailsById } from "../../../store/tvShowsReducer";

function Cast() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { details, detailsStatus } = useSelector(
    (state: RootState) => state.tvShows
  );

  useEffect(() => {
    if (detailsStatus === "idle") {
      dispatch(fetchShowDetailsById({ id: id ?? "", navMenu: "cast" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailsStatus, dispatch]);

  return (
    <>
      {detailsStatus === "loading" && (
        <div className="text-gray-500">Loading cast information...</div>
      )}
      {details.cast && Array.isArray(details.cast) && details.cast.length > 0 ? (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {details.cast.map((member: any, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-4 rounded-lg"
            >
              <img
                src={member.person?.image?.medium || "https://via.placeholder.com/150"}
                alt={member.person?.name || "Unknown"}
                className="mb-2 rounded-full w-24 h-24 object-cover"
              />
              <h3 className="font-semibold text-gray-700 text-lg">{member.person?.name || "Unknown"}</h3>
              <p className="text-gray-600 text-sm">
              as  {member.character?.name || "Unknown Character"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        detailsStatus !== "loading" && (
          <div className="text-gray-500">No cast information available.</div>
        )
      )}
    </>
  );
}

export default Cast;