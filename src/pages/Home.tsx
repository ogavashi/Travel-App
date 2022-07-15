import React, { useState } from "react";
import Filters from "../components/Filters";
import Trips from "../components/Trips";

import trips from "../assets/data/trips.json"; // Trips
import useDebounce from "../hooks/useDebounce";

const Home: React.FC = () => {
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce<string>(searchValue);

  const filteredTrips = trips.filter((trip) =>
    trip.title.toLowerCase().includes(debouncedValue.toLowerCase())
  );

  return (
    <main>
      <h1 className="visually-hidden">Travel App</h1>
      <Filters searchValue={searchValue} setSearchValue={setSearchValue} />
      <Trips trips={filteredTrips} />
    </main>
  );
};

export default Home;
