import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export default function MyAppointments() {
  const { doctors } = useContext(AppContext);

  // محاكاة المواعيد عن طريق أخذ أول 4 أطباء
  const appointments = doctors.slice(0, 4);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>

      <div>
        {appointments.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
            <div>
              <img className="w-32 bg-indigo-50" src={item.image} alt={item.name} />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-zinc-800 font-semibold text-lg">{item.name}</p>
              <p className="mb-2">{item.speciality}</p>
              <p className="text-zinc-700 font-medium pb-2">Address:</p>
              <p className="text-xs">{item.address.line1}</p>
              <p className="text-xs">{item.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">Date & Time: </span> 25, July, 2024 | 8:30 PM
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-end text-sm text-center">
              <button className="text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">Pay Online</button>
              <button className="text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">Cancel appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
