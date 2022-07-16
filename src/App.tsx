import { Routes, Route, Navigate } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import Trip from "./pages/Trip";

import trips from "./assets/data/trips.json"; // Trips
import bookings from "./assets/data/booked.json"; // Booked trips

import { BookedTrip } from "./types";
import { useCallback, useState } from "react";

function App() {
  const [bookedTrips, setBookedTrips] = useState<BookedTrip[]>(bookings);

  const onBookTrip = useCallback((trip: BookedTrip) => {
    setBookedTrips((prev) => [...prev, trip]);
  }, []);

  const onCancelBook = useCallback((id: string) => {
    setBookedTrips((prev) => prev.filter((trip) => trip.id !== id));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home trips={trips} />} />
        <Route path="/trip/:id" element={<Trip trips={trips} onBookTrip={onBookTrip} />} />
        <Route
          path="/bookings"
          element={<Bookings bookedTrips={bookedTrips} onCancelBook={onCancelBook} />}
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
