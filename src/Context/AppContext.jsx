import { createContext, useState } from "react";
import { doctors } from "../assets/assets";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export default function AppContextProvider(props) {
  const currencySymbol = "$";
  const [appointments, setAppointments] = useState(() => {
    return JSON.parse(localStorage.getItem('appointments')) || [];
  });

  const bookAppointment = (doctor, slotDate, slotTime) => {
    // Check if slot is already booked for this doctor
    const isBooked = appointments.some(
      app => app.doctor._id === doctor._id && app.slotDate === slotDate && app.slotTime === slotTime && !app.isCancelled
    );
    if (isBooked) {
      toast.error('This slot is already booked!');
      return false;
    }

    const newAppointment = {
      id: Date.now().toString(),
      doctor,
      slotDate,
      slotTime,
      isCancelled: false,
      isPaid: false
    };

    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    toast.success('Appointment booked successfully!');
    return true;
  };

  const cancelAppointment = (appointmentId) => {
    const updated = appointments.map(app => 
      app.id === appointmentId ? { ...app, isCancelled: true } : app
    );
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    toast.success('Appointment cancelled successfully!');
  };

  const payAppointment = (appointmentId) => {
    const updated = appointments.map(app => 
      app.id === appointmentId ? { ...app, isPaid: true } : app
    );
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    toast.success('Payment completed successfully!');
  };

  const value = {
    doctors,
    currencySymbol,
    appointments,
    bookAppointment,
    cancelAppointment,
    payAppointment
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
