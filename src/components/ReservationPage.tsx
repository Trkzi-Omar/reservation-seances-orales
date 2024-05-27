// src/components/ReservationPage.tsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig.ts';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const ReservationPage: React.FC = () => {
  const [sessions, setSessions] = useState([]);
  const [reservations, setReservations] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const sessionsSnapshot = await getDocs(collection(db, "sessions"));
      setSessions(sessionsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));

      const reservationsSnapshot = await getDocs(collection(db, "reservations"));
      setReservations(reservationsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
  }, []);

  // Function to add a reservation
  const addReservation = async (sessionId) => {
    await addDoc(collection(db, "reservations"), { sessionId, userId: "currentUserId", status: "confirmed" });
    // Refresh the reservations
  };

  // Function to cancel a reservation
  const cancelReservation = async (reservationId) => {
    await deleteDoc(doc(db, "reservations", reservationId));
    // Refresh the reservations
  };

  return (
    <div>
      <h1>Reservation Page</h1>
      {/* Render available sessions and add forms to add/cancel reservations */}
    </div>
  );
};

export default ReservationPage;

