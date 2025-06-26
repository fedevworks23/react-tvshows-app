import { useNavigate } from "react-router";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <div className="text-6xl">PageNotFound</div>
        <button
          className="bg-amber-400 mt-3 p-2 rounded-full font-bold text-black cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </>
  );
}

export default PageNotFound;
