import React from "react";
import { TripProps } from "../types";

import TripCard from "./TripCard";

type TripsProps = {
  trips: TripProps[];
};

const Trips: React.FC<TripsProps> = ({ trips }) => {
  const tripsCards = trips.map((trip) => <TripCard {...trip} key={trip.id} />);

  return (
    <section className="trips">
      <h2 className="visually-hidden">Trips List</h2>
      <ul className="trip-list">{tripsCards}</ul>
    </section>
  );
};

export default Trips;
