import React, { ChangeEvent, FormEvent } from "react";
import { BookedTripProps, TripProps } from "../types";

type ModalProps = {
  trip: TripProps;
  guests: string;
  date: string;
  onClose: () => void;
  setGuests: (amount: string) => void;
  setDate: (date: string) => void;
  onBookTrip: (trip: BookedTripProps) => void;
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
    setGuests(e.target.value);
  };

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onClickBook = () => {
    const bookedTrip = {
      ...trip,
      guests,
      date,
    };
    onBookTrip(bookedTrip);
  };

  const preventSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
  };

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
            <input onChange={onChangeDate} name="date" type="date" required />
          </label>
          <label className="trip-popup__input input">
            <span className="input__heading">Number of guests</span>
            <input
              onChange={onChangeGuests}
              name="guests"
              type="number"
              min="1"
              max="10"
              defaultValue={1}
              required
            />
          </label>
          <span className="trip-popup__total">
            Total:{" "}
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
