import React, { useState } from "react";
import Filters from "../components/Filters";
import Trips from "../components/Trips";

import useDebounce from "../hooks/useDebounce";
import { useGetTripsQuery } from "../redux/api/tripAPI";
import { inRange } from "../utils/inRange";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce<string>(searchValue);

  const { data, isLoading, error, isError } = useGetTripsQuery();

  const trips = data ? Object.values(data) : [];

  if (isError && "data" in error) {
    if (error.status === 404) {
      toast.dismiss();
      toast.error("Couldn't get trips", { icon: "😔" });
    } else {
      toast.dismiss();
      toast.error("Ops, something went wrong (");
    }
  }

  const filteredTrips = trips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(debouncedValue.toLowerCase()) &&
      trip.level.includes(level) &&
      inRange(duration, trip.duration)
  );

  return (
    <main>
      <h1 className="visually-hidden">Travel App</h1>
      <ToastContainer />
      <Filters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setDuration={setDuration}
        setLevel={setLevel}
      />
      {isLoading ? <div className="loader"></div> : <Trips trips={filteredTrips} />}
    </main>
  );
};

export default Home;
