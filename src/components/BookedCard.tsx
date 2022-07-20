import React from "react";
import { useCancelTripMutation } from "../redux/api/tripAPI";
import { BookedTrip } from "../types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type BookedCardProps = {
  bookedItem: BookedTrip;
};

const BookedCard: React.FC<BookedCardProps> = ({ bookedItem }) => {
  const [cancelTrip, { isLoading }] = useCancelTripMutation();

  const onCancelBooking = async () => {
    try {
      await cancelTrip(bookedItem.id).unwrap();
      toast.dismiss();
      toast.success("Your trip was successfully canceled");
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong. Try again later");
    }
  };

  return (
    <li className="booking">
      <ToastContainer />
      <h3 className="booking__title">{bookedItem.trip.title}</h3>
      <span className="booking__guests">
        {bookedItem.guests > 1 ? `${bookedItem.guests} guests` : `${bookedItem.guests} guest`}
      </span>
      <span className="booking__date">{bookedItem.date.split("T")[0]}</span>
      <span className="booking__total">{bookedItem.totalPrice} $</span>
      <button
        onClick={onCancelBooking}
        className="booking__cancel"
        title="Cancel booking"
        disabled={isLoading}
      >
        <span className="visually-hidden">Cancel booking</span>×
      </button>
    </li>
  );
};

export default BookedCard;
