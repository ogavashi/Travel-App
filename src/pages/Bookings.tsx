import React from "react";
import BookedCard from "../components/BookedCard";
import { BookedTripProps } from "../types";

type BookingPageProps = {
  bookedTrips: BookedTripProps[];
};

const Bookings: React.FC<BookingPageProps> = ({ bookedTrips }) => {
  const bookedTripsCards = bookedTrips.map((booked) => <BookedCard {...booked} key={booked.id} />);

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">{bookedTripsCards}</ul>
    </main>
  );
};

export default Bookings;
