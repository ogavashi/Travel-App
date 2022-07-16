import React from "react";
import BookedCard from "../components/BookedCard";
import { BookedTrip } from "../types";

type BookingPageProps = {
  bookedTrips: BookedTrip[];
  onCancelBook: (id: string) => void;
};

const Bookings: React.FC<BookingPageProps> = ({ bookedTrips, onCancelBook }) => {
  const bookedTripsCards = bookedTrips
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    .map((booked) => (
      <BookedCard bookedItem={booked} key={booked.id} onCancelBook={onCancelBook} />
    ));

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">{bookedTripsCards}</ul>
    </main>
  );
};

export default Bookings;
