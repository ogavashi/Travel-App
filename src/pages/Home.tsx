import React, { useState } from "react";
import Filters from "../components/Filters";
import Trips from "../components/Trips";

import useDebounce from "../hooks/useDebounce";
import { TripProps } from "../types";
import { inRange } from "../utils/inRange";

type HomePageProps = {
  trips: TripProps[];
};

const Home: React.FC<HomePageProps> = ({ trips }) => {
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce<string>(searchValue);

  const filteredTrips = trips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(debouncedValue.toLowerCase()) &&
      trip.level.includes(level) &&
      inRange(duration, trip.duration)
  );

  return (
    <main>
      <h1 className="visually-hidden">Travel App</h1>
      <Filters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setDuration={setDuration}
        setLevel={setLevel}
      />
      <Trips trips={filteredTrips} />
    </main>
  );
};

export default Home;
