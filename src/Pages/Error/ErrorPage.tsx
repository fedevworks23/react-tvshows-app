import { useLocation, useNavigate } from "react-router";
export default function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const message =
    location.state?.message || "Something went wrong. Please try again later.";

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-amber-50 via-white to-teal-50 px-4 min-h-[90vh]">
      <div className="flex flex-col items-center bg-white/90 shadow-xl p-8 rounded-xl w-full max-w-md">
        <div className="flex justify-center items-center bg-amber-100 shadow mb-4 rounded-full w-16 h-16">
          <svg
            className="w-10 h-10 text-teal-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01"
            />
          </svg>
        </div>
        <h1 className="mb-2 font-bold text-teal-700 text-3xl text-center">
          Oops! Something went wrong
        </h1>
        <p className="mb-6 text-amber-700 text-base text-center">{message}</p>
        <button
          className="bg-teal-600 hover:bg-teal-700 shadow px-6 py-2 rounded-lg font-semibold text-white transition-colors"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
