import React from "react";

import { TripItem } from "../types";
import "react-toastify/dist/ReactToastify.css";

import TripCard from "./TripCard";
import EmptyPage from "./EmptyPage";

type TripsProps = {
  trips: TripItem[];
};

const Trips: React.FC<TripsProps> = ({ trips }) => {
  const tripsCards = trips.map((trip) => <TripCard {...trip} key={trip.id} />);

  return (
    <section className="trips">
      <h2 className="visually-hidden">Trips List</h2>
      {tripsCards.length > 0 ? <ul className="trip-list">{tripsCards}</ul> : <EmptyPage />}
    </section>
  );
};

export default Trips;
