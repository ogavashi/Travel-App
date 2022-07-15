import React from "react";
import { BookedTripProps } from "../types";

const BookedCard: React.FC<BookedTripProps> = ({ id, title, price, guests, date }) => {
  return (
    <li className="booking">
      <h3 className="booking__title">{title}</h3>
      <span className="booking__guests">
        {parseInt(guests) > 1 ? `${guests} guests` : `${guests} guest`}
      </span>
      <span className="booking__date">{date}</span>
      <span className="booking__total">{price} $</span>
      <button className="booking__cancel" title="Cancel booking">
        <span className="visually-hidden">Cancel booking</span>×
      </button>
    </li>
  );
};

export default BookedCard;
