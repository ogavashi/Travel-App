import React from "react";
import BookedCard from "../components/BookedCard";
import { useGetBookedTripsQuery } from "../redux/api/tripAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyPage from "../components/EmptyPage";

const Bookings = () => {
  const { data, isLoading, error, isError } = useGetBookedTripsQuery();

  const bookedTrips = data ? Object.values(data) : [];

  if (isError && "data" in error) {
    if (error.status === 404) {
      toast.dismiss();
      toast.error("Couldn't get trips", { icon: "😔" });
    } else {
      toast.dismiss();
      toast.error("Ops, something went wrong (", { icon: "😔" });
    }
  }

  const bookedTripsCards = bookedTrips
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    .map((booked) => <BookedCard bookedItem={booked} key={booked.id} />);

  return (
    <main className="bookings-page">
      <ToastContainer />
      <h1 className="visually-hidden">Travel App</h1>
      {isLoading ? (
        <div className="loader"></div>
      ) : bookedTrips.length > 0 ? (
        <ul className="bookings__list">{bookedTripsCards}</ul>
      ) : (
        <EmptyPage />
      )}
    </main>
  );
};

export default Bookings;
