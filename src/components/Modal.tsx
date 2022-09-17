import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TripItem } from "../types";
import * as yup from "yup";
import { BookRequest, useBookTripMutation } from "../redux/api/tripAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/auth/selectors";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ModalProps = {
  trip: TripItem;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ trip, onClose }) => {
  const currentDate = new Date();

  const user = useSelector(selectCurrentUser);
  const userId = user?.id as string;

  const [bookTrip, { isLoading }] = useBookTripMutation();

  const validationSchema = yup
    .object({
      date: yup.date().min(new Date()).required(),
      guests: yup.number().min(1).max(10).required(),
    })
    .required();

  const { register, handleSubmit } = useForm<BookRequest>({
    resolver: yupResolver(validationSchema),
  });

  const [guests, setGuests] = useState(1);

  const onSubmit: SubmitHandler<BookRequest> = async (data) => {
    const toBeBooked = {
      tripId: trip.id,
      userId,
      guests: data.guests,
      date: data.date,
    };
    try {
      await bookTrip(toBeBooked).unwrap();
      toast.dismiss();
      toast.success("Your trip was successfully booked");
    } catch (error) {
      toast.dismiss();
      toast.error("Could not book a trip, try again later");
    }
    onClose();
  };

  return (
    <div className="modal">
      <ToastContainer />
      <div className="trip-popup">
        <button onClick={onClose} className="trip-popup__close">
          ×
        </button>
        <form className="trip-popup__form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
              {...register("date")}
              type="date"
              min={currentDate.toLocaleDateString("en-ca")}
              max={`${currentDate.getFullYear() + 1}-12-31`}
            />
          </label>
          <label className="trip-popup__input input">
            <span className="input__heading">Number of guests</span>
            <input
              {...register("guests")}
              type="number"
              min={1}
              max={10}
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
            />
          </label>
          <span className="trip-popup__total">
            Total:
            <output className="trip-popup__total-value">{trip.price * guests}$</output>
          </span>
          <button className="button" type="submit" disabled={isLoading}>
            Book a trip
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
