import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoaderComponent from "../components/LoaderComponent";
import { URL } from "../Constant/constants";

function ShowEpisodes() {
  const { id } = useParams();

  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/shows/${id}/episodes`)
      .then((res) => {
        setEpisodes(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setEpisodes([]);
        setLoading(false);
        console.log(err);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-white">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <section className="bg-[#0b1016] shadow my-8 p-8 rounded-xl">
      <h2 className="mb-6 font-bold text-white text-3xl">Episodes</h2>
      <hr className="mb-6 border-[#232a36]" />
      <div className="overflow-x-auto">
        <table className="bg-[#181e26] rounded min-w-full text-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Airdate</th>
              <th className="px-4 py-2 text-left">Runtime</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((ep, idx) => (
              <tr
                key={ep.id || idx}
                className="hover:bg-[#232a36] border-[#232a36] border-b"
              >
                <td className="px-4 py-2">{ep.number || "-"}</td>
                <td className="px-4 py-2">{ep.name || "-"}</td>
                <td className="px-4 py-2">{ep.airdate || "-"}</td>
                <td className="px-4 py-2">
                  {ep.runtime ? `${ep.runtime} min` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {episodes.length === 0 && (
          <div className="py-8 text-gray-400 text-center">
            No episodes found.
          </div>
        )}
      </div>
    </section>
  );
}

export default ShowEpisodes;
