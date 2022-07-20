import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyPage from "../components/EmptyPage";
import Modal from "../components/Modal";
import { useGetTripByIdQuery } from "../redux/api/tripAPI";

const Trip = () => {
  const params = useParams();
  const id = params.id as string;

  const [isVisible, setIsVisible] = useState(false);

  const { data: trip, isLoading, error, isError } = useGetTripByIdQuery(id);

  if (isError && "data" in error) {
    toast.error("Something went wrong, please try again later.", { icon: "😔" });
  }

  const toggleModal = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  return (
    <main className="trip-page">
      <ToastContainer />
      <h1 className="visually-hidden">Travel App</h1>
      {isLoading ? (
        <div className="loader"></div>
      ) : trip ? (
        <div className="trip">
          <img src={trip.image} className="trip__img" alt="tripImage" />
          <div className="trip__content">
            <div className="trip-info">
              <h3 className="trip-info__title">{trip?.title}</h3>
              <div className="trip-info__content">
                <span className="trip-info__duration">
                  <strong>{trip.duration}</strong> days
                </span>
                <span className="trip-info__level">{trip.level}</span>
              </div>
            </div>
            <div className="trip__description">{trip.description}</div>
            <div className="trip-price">
              <span>Price</span>
              <strong className="trip-price__value">{trip.price} $</strong>
            </div>
            <button onClick={toggleModal} className="trip__button button">
              Book a trip
            </button>
          </div>
        </div>
      ) : (
        <EmptyPage />
      )}
      {isVisible && trip && <Modal trip={trip} onClose={toggleModal} />}
    </main>
  );
};

export default Trip;
