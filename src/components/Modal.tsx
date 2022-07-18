import React, { ChangeEvent, FormEvent } from "react";
import { BookedTrip, TripItem } from "../types";

type ModalProps = {
  trip: TripItem;
  guests: string;
  date: string;
  onClose: () => void;
  setGuests: (amount: string) => void;
  setDate: (date: string) => void;
  onBookTrip: (trip: BookedTrip) => void;
};

const Modal: React.FC<ModalProps> = ({
  trip,
  guests,
  date,
  onClose,
  setGuests,
  setDate,
  onBookTrip,
}) => {
  const onChangeGuests = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value);
    if (amount <= 10 && amount > 0) {
      setGuests(e.target.value);
    }
  };

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    if (Date.parse(e.target.value) >= Date.now()) {
      setDate(e.target.value);
    }
  };

  const onClickBook = () => {
    const bookedTrip: BookedTrip = {
      id: String(Date.now()), //instead of uuid
      userId: "1dd97a12-848f-4a1d-8a7d-34a2132fca94",
      tripId: trip.id,
      guests: parseInt(guests),
      trip: {
        title: trip.title,
        duration: trip.duration,
        price: trip.price,
      },
      totalPrice: trip?.price * parseInt(guests),
      date,
      createdAt: new Date().toISOString(),
    };
    onBookTrip(bookedTrip);
  };

  const preventSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
  };

  const currentDate = new Date();

  return (
    <div className="modal">
      <div className="trip-popup">
        <button onClick={onClose} className="trip-popup__close">
          ×
        </button>
        <form className="trip-popup__form" autoComplete="off" onSubmit={preventSubmit}>
          <div className="trip-info">
            <h3 className="trip-info__title">{trip?.title}</h3>
            <div className="trip-info__content">
              <span className="trip-info__duration">
                <strong>{trip?.duration}</strong> days
              </span>
              <span className="trip-info__level">{trip?.level}</span>
            </div>
          </div>
          <label className="trip-popup__input input">
            <span className="input__heading">Date</span>
            <input
              value={date}
              onChange={onChangeDate}
              name="date"
              type="date"
              min={currentDate.toLocaleDateString("en-ca")}
              max={`${currentDate.getFullYear() + 1}-12-31`}
              required
            />
          </label>
          <label className="trip-popup__input input">
            <span className="input__heading">Number of guests</span>
            <input
              onChange={onChangeGuests}
              name="guests"
              type="number"
              min="1"
              max="10"
              value={guests}
              required
            />
          </label>
          <span className="trip-popup__total">
            Total:
            <output className="trip-popup__total-value">
              {trip && trip?.price * parseInt(guests)}$
            </output>
          </span>
          <button onClick={onClickBook} className="button" type="submit">
            Book a trip
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
