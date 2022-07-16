import React from "react";
import { BookedTrip } from "../types";

type BookedCardProps = {
  bookedItem: BookedTrip;
  onCancelBook: (id: string) => void;
};

const BookedCard: React.FC<BookedCardProps> = ({ bookedItem, onCancelBook }) => {
  const onCancleBooking = () => {
    onCancelBook(bookedItem.id);
  };

  return (
    <li className="booking">
      <h3 className="booking__title">{bookedItem.trip.title}</h3>
      <span className="booking__guests">
        {bookedItem.guests > 1 ? `${bookedItem.guests} guests` : `${bookedItem.guests} guest`}
      </span>
      <span className="booking__date">{bookedItem.date.split('T')[0]}</span>
      <span className="booking__total">{bookedItem.totalPrice} $</span>
      <button onClick={onCancleBooking} className="booking__cancel" title="Cancel booking">
        <span className="visually-hidden">Cancel booking</span>×
      </button>
    </li>
  );
};

export default BookedCard;
