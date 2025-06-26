import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsById } from "../../store/tvShowsReducer";
import type { RootState, AppDispatch } from "../../store/index";

function Episodes() {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const currentPath = pathname.split("/").pop();

  const dispatch = useDispatch<AppDispatch>();
  const { details, detailsStatus } = useSelector(
    (state: RootState) => state.tvShows
  );

  useEffect(() => {
    if (detailsStatus === "idle") {
      dispatch(getDetailsById({ id: id ?? "", navMenu: currentPath ?? "" }));
    }
  }, []);

  return <EpisodesComponent details={details} detailsStatus={detailsStatus} />;
}

interface EpisodesComponentProps {
  details: {
    episodes: any[];
  };
  detailsStatus: "idle" | "loading" | "succeeded" | "failed";
}

const EpisodesComponent = ({
  details,
  detailsStatus,
}: EpisodesComponentProps) => {
  // Group episodes by season
  const episodesBySeason = Array.isArray(details.episodes)
    ? details.episodes.reduce((acc: any, ep: any) => {
        const season = ep.season || 1;
        if (!acc[season]) acc[season] = [];
        acc[season].push(ep);
        return acc;
      }, {})
    : {};

  return (
    <section className="bg-white shadow p-2 md:p-8 rounded-xl">
      {Object.keys(episodesBySeason)
        .sort((a, b) => Number(b) - Number(a))
        .map((seasonNum) => (
          <div key={seasonNum} className="mb-10">
            <h2 className="mb-2 font-light text-teal-700 text-2xl md:text-4xl">
              Season {seasonNum}{" "}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-[#3F3F3F] text-white">
                    <th className="px-4 py-2 rounded-tl-lg text-left">
                      Number
                    </th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 rounded-tr-lg text-left">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {episodesBySeason[seasonNum]
                    .slice()
                    .sort((a: any, b: any) => b.number - a.number)
                    .map((ep: any, idx: number) => (
                      <tr
                        key={ep.id}
                        className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="px-4 py-2 font-semibold text-teal-700">
                          {ep.number}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {ep.airdate
                            ? new Date(ep.airdate).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "-"}
                        </td>
                        <td className="px-4 py-2">
                          <a
                            href={ep.url}
                            className="text-teal-700 hover:text-teal-900 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {ep.name}
                          </a>
                        </td>
                        <td className="flex items-center gap-1 px-4 py-2 font-semibold text-teal-700">
                          {ep.rating?.average ? (
                            <>
                              <svg
                                className="inline-block w-5 h-5 text-amber-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                              </svg>
                              {ep.rating.average}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      {/* Loading and empty states */}
      {detailsStatus === "loading" && (
        <div className="py-8 text-teal-700 text-center">
          Loading episodes...
        </div>
      )}
      {detailsStatus === "succeeded" &&
        Array.isArray(details.episodes) &&
        Object.keys(episodesBySeason).length === 0 && (
          <div className="py-8 text-gray-500 text-center">
            No episodes found.
          </div>
        )}
      {detailsStatus === "failed" && (
        <div className="py-8 text-red-500 text-center">
          Failed to load episodes.
        </div>
      )}
    </section>
  );
};

export default Episodes;
