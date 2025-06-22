
function LoaderComponent() {
  return (
    <div className="flex flex-col gap-8 bg-[#0b1016] px-2 md:px-8 py-8 min-h-screen animate-pulse">
      {/* Banner Loader */}
      <div className="relative flex md:flex-row flex-col items-center md:items-end bg-[#181e26] rounded-xl min-h-[260px] overflow-hidden">
        <div className="flex md:flex-row flex-col items-center md:items-end gap-6 p-6 md:p-10 w-full">
          <div className="bg-[#232a36] shadow-lg border-[#181e26] border-4 rounded-lg w-40 h-56" />
          <div className="flex-1 mt-4 md:mt-0">
            <div className="bg-[#232a36] mb-2 rounded w-3/4 h-8" />
            <div className="bg-[#232a36] mb-2 rounded w-1/2 h-4" />
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="bg-[#232a36] rounded w-16 h-4" />
              <div className="bg-[#232a36] rounded w-16 h-4" />
              <div className="bg-[#232a36] rounded w-24 h-4" />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="bg-[#232a36] rounded w-32 h-8" />
              <div className="bg-[#232a36] rounded w-32 h-8" />
              <div className="bg-[#232a36] rounded w-32 h-8" />
              <div className="bg-[#232a36] rounded w-32 h-8" />
              <div className="bg-[#232a36] rounded w-32 h-8" />
            </div>
          </div>
        </div>
      </div>
      {/* Main Content Loader */}
      <div className="flex lg:flex-row flex-col gap-8">
        {/* Left: Watch Now & Synopsis */}
        <div className="flex flex-col flex-1 gap-6">
          <div className="bg-[#181e26] p-6 rounded-xl">
            <div className="bg-[#232a36] mb-4 rounded w-32 h-6" />
            <div className="bg-[#232a36] mb-2 rounded w-full h-16" />
            <div className="bg-[#232a36] mb-2 rounded w-1/2 h-4" />
            <div className="bg-[#232a36] mt-3 rounded w-full h-10" />
          </div>
          <div className="bg-[#181e26] p-6 rounded-xl">
            <div className="bg-[#232a36] mb-4 rounded w-32 h-6" />
            <div className="bg-[#232a36] rounded w-full h-24" />
          </div>
        </div>
        {/* Right: About the Movie */}
        <div className="flex-shrink-0 w-full lg:w-80">
          <div className="bg-[#181e26] p-6 rounded-xl">
            <div className="bg-[#232a36] mb-4 rounded w-40 h-6" />
            <div className="flex flex-col items-center mb-4">
              <div className="bg-[#232a36] shadow mb-2 rounded-lg w-32 h-44" />
              <div className="bg-[#232a36] mb-1 rounded w-24 h-4" />
              <div className="bg-[#232a36] rounded w-12 h-3" />
            </div>
            <div className="bg-[#232a36] mb-2 rounded w-32 h-4" />
            <div className="bg-[#232a36] mb-2 rounded w-24 h-4" />
            <div className="bg-[#232a36] mb-2 rounded w-40 h-4" />
            <div className="bg-[#232a36] mb-2 rounded w-24 h-4" />
            <div className="bg-[#232a36] mb-2 rounded w-32 h-4" />
            <div className="flex gap-2 mt-4">
              <div className="bg-[#232a36] rounded w-1/2 h-10" />
              <div className="bg-[#232a36] rounded w-1/2 h-10" />
            </div>
            <div className="flex gap-2 mt-2">
              <div className="bg-[#232a36] rounded w-1/2 h-10" />
              <div className="bg-[#232a36] rounded w-1/2 h-10" />
            </div>
            <div className="bg-[#232a36] mt-4 rounded w-full h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoaderComponent;