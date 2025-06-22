import ShowsList from "../components/ShowsList";
import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [showsList, setShowsList] = useState<any[]>([]);

  const filterShowsByTitle = (title: string): any[] => {
    return showsList.filter((genreTitle) => genreTitle.genres.includes(title));
  };

  const titleLists = ["Action", "Drama"];

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/shows")
      .then((response) => {
        setShowsList(response.data);
        // filterShowsByTitle("Action", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {titleLists.map((title: string) => {
        return <ShowsList key={title} title={title} showsList={filterShowsByTitle(title)} />
      })}
      {/* <ShowsList title="Drama" /> */}
    </div>
  );
}

export default Dashboard;
