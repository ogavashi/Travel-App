import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { BookedTripProps, TripProps } from "../types";

type TripPageProps = {
  trips: TripProps[];
  onBookTrip: (trip: BookedTripProps) => void;
};

const Trip: React.FC<TripPageProps> = ({ trips, onBookTrip }) => {
  const [trip, setTrip] = useState<TripProps>();

  const { id } = useParams();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [guests, setGuests] = useState("1");
  const [date, setDate] = useState("1");

  useEffect(() => {
    const tripItem = trips.find((trip) => trip.id === id) as TripProps;
    if (!tripItem) {
      alert("Could not find trip");
      navigate("/");
    }
    setTrip(tripItem);
  }, [id, navigate, trips]);

  const toggleModal = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  return (
    <main className="trip-page">
      <h1 className="visually-hidden">Travel App</h1>
      <div className="trip">
        <img src={trip?.image} className="trip__img" alt="tripImage" />
        <div className="trip__content">
          <div className="trip-info">
            <h3 className="trip-info__title">{trip?.title}</h3>
            <div className="trip-info__content">
              <span className="trip-info__duration">
                <strong>{trip?.duration}</strong> days
              </span>
              <span className="trip-info__level">{trip?.level}</span>
            </div>
          </div>
          <div className="trip__description">{trip?.description}</div>
          <div className="trip-price">
            <span>Price</span>
            <strong className="trip-price__value">{trip?.price} $</strong>
          </div>
          <button onClick={toggleModal} className="trip__button button">
            Book a trip
          </button>
        </div>
      </div>
      {isVisible && trip && (
        <Modal
          trip={trip}
          guests={guests}
          date={date}
          onClose={toggleModal}
          setGuests={setGuests}
          setDate={setDate}
          onBookTrip={onBookTrip}
        />
      )}
    </main>
  );
};

export default Trip;
