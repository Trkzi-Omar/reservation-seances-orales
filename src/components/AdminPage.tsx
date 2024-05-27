// src/components/AdminPage.tsx
import {FC, useEffect, useState} from 'react';
import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from 'firebase/firestore';
import {db} from "../../firebaseConfig.ts";

const AdminPage: FC = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "sessions"));
            setSessions(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
        };

        fetchData();
    }, []);

    // Function to add a new session
    const addSession = async (newSession) => {
        await addDoc(collection(db, "sessions"), newSession);
        // Refresh the sessions
    };

    // Function to update a session
    const updateSession = async (id, updatedSession) => {
        const sessionDoc = doc(db, "sessions", id);
        await updateDoc(sessionDoc, updatedSession);
        // Refresh the sessions
    };

    // Function to delete a session
    const deleteSession = async (id) => {
        const sessionDoc = doc(db, "sessions", id);
        await deleteDoc(sessionDoc);
        // Refresh the sessions
    };

    interface JuryMember {
        id: string;
        name: string;
    }

    const [date, setDate] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [maxReservations, setMaxReservations] = useState<number>(0);
    const [juryMembers, setJuryMembers] = useState<JuryMember[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await db.collection('sessions').add({
                date,
                startTime,
                endTime,
                maxReservations,
                juryMembers,
                reservations: [],
            });
            // Reset form or give feedback
        } catch (error) {
            console.error("Error adding session: ", error);
        }
    };

    return (
        <div className={"flex m-auto flex-col items-center"}>
            <h1>Admin Page</h1>

            <form onSubmit={handleSubmit}>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required/>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required/>
                <input type="number" value={maxReservations}
                       onChange={(e) => setMaxReservations(parseInt(e.target.value))} required/>
                {/* Add input fields for juryMembers */}
                <button type="submit">Planifier la séance</button>
            </form>
        </div>
    );
};


export default AdminPage;
