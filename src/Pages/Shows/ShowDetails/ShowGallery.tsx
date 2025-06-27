import { useEffect, useState } from "react";

interface ShowGalleryProps {
  details: any; // Replace 'any' with the actual type of details
  detailsStatus: string; // Replace 'string' with the actual type if needed
}

function ShowGallery({ details, detailsStatus }: ShowGalleryProps) {
  const [show, setShow] = useState<typeof details>(details || {});

  useEffect(() => {
    setShow(details || {});
  }, [details]);

  return (
    <>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 text-black">
        {Array.isArray(show?.images) && show?.images.map(
          (item: any, index: number) =>
            item.type === "poster" && (
              <div key={index} className="mb-4">
                <img
                  src={item?.resolutions?.medium?.url || "image"}
                  alt={item.type || "Show Image"}
                  className="shadow-md rounded-lg w-full h-auto"
                  style={{
                    width: item?.resolutions?.medium?.width
                      ? `${item.resolutions.medium.width}px`
                      : undefined,
                    height: item?.resolutions?.medium?.height
                      ? `${item.resolutions.medium.height}px`
                      : undefined,
                  }}
                />
              </div>
            )
        )}
      </div>

      {/* Loading and empty states */}
      {detailsStatus === "loading" && (
        <div className="py-8 text-teal-700 text-center">
          Loading episodes...
        </div>
      )}
      {detailsStatus === "failed" && (
        <div className="py-8 text-red-500 text-center">
          Failed to load episodes.
        </div>
      )}
    </>
  );
}

export default ShowGallery;
