import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";
import { FiCalendar, FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function MyAppointments() {
  const { appointments, cancelAppointment, payAppointment } = useContext(AppContext);

  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
          <FiCalendar className="text-4xl text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Appointments Booked</h3>
        <p className="text-gray-500 max-w-sm mb-6 text-sm">
          You haven't scheduled any appointments yet. Simply browse through our trusted doctors to book an appointment.
        </p>
        <Link 
          to="/doctors" 
          className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
        >
          Book An Appointment
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>

      <div className="mt-4">
        {appointments.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b last:border-b-0">
            <div>
              <img className="w-32 bg-indigo-50 rounded-lg object-cover" src={item.doctor.image} alt={item.doctor.name} />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-zinc-800 font-semibold text-lg">{item.doctor.name}</p>
              <p className="mb-2 text-zinc-500 font-medium">{item.doctor.speciality}</p>
              <p className="text-zinc-700 font-medium pb-1">Address:</p>
              <p className="text-xs text-zinc-500">{item.doctor.address.line1}</p>
              <p className="text-xs text-zinc-500">{item.doctor.address.line2}</p>
              <p className="text-xs mt-3 bg-zinc-50 py-1.5 px-3 rounded-md inline-block border border-zinc-100">
                <span className="text-sm text-zinc-700 font-semibold">Date & Time: </span> 
                <span className="text-zinc-600 font-medium">{item.slotDate} | {item.slotTime}</span>
              </p>
            </div>

            <div className="flex flex-col gap-2.5 justify-end text-sm text-center min-w-48">
              {!item.isCancelled && !item.isPaid && (
                <button 
                  onClick={() => payAppointment(item.id)} 
                  className="text-stone-500 sm:min-w-48 py-2 border rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer font-medium"
                >
                  Pay Online
                </button>
              )}
              
              {!item.isCancelled && item.isPaid && (
                <span className="text-green-600 bg-green-50 border border-green-200 sm:min-w-48 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5">
                  <FiCheckCircle className="text-lg" /> Paid
                </span>
              )}

              {!item.isCancelled ? (
                <button 
                  onClick={() => cancelAppointment(item.id)} 
                  className="text-stone-500 sm:min-w-48 py-2 border rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 cursor-pointer font-medium"
                >
                  Cancel appointment
                </button>
              ) : (
                <span className="text-red-500 bg-red-50 border border-red-200 sm:min-w-48 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5">
                  <FiXCircle className="text-lg" /> Appointment Cancelled
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
