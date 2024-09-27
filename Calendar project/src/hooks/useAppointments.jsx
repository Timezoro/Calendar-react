import db from "../database/database";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

export default function useAppointments() {

    // Function to add an appointment
    const addAppointment = async (appointment) => {
        try {
            const docRef = await addDoc(collection(db, "appointments"), appointment);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    // Function to get all appointments
    const getAppointments = async () => {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const appointments = [];
        querySnapshot.forEach((doc) => {
            appointments.push({ ...doc.data(), id: doc.id });
        });
        return appointments
    }

    // Function to update an appointment
    const updateAppointment = async (id, appointment) => {
        try {
            await updateDoc(doc(db, "appointments", id), appointment);
            console.log("Document successfully updated!");
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    // Function to delete an appointment
    const deleteAppointment = async (id) => {
        try {
            await deleteDoc(doc(db, "appointments", id));
            console.log("Document successfully deleted!");
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    return { addAppointment, getAppointments, updateAppointment, deleteAppointment };

}