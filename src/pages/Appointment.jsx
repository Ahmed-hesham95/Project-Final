import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export default function Appointment() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, bookAppointment } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const docInfo = doctors.find((doc) => doc._id === docId);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const getAvailableSlots = async () => {
    let allSlots = [];
    // getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // setting end time of the date with index
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      allSlots.push(timeSlots);
    }
    setDocSlots(allSlots);
  };

  const handleBooking = () => {
    if (!slotTime) {
      toast.error('Please select a time slot first!');
      return;
    }

    const selectedSlotDate = docSlots[slotIndex][0].datetime;
    const day = selectedSlotDate.getDate();
    const month = selectedSlotDate.toLocaleString('en-US', { month: 'long' });
    const year = selectedSlotDate.getFullYear();
    const formattedDate = `${day}, ${month}, ${year}`;

    const success = bookAppointment(docInfo, formattedDate, slotTime);
    if (success) {
      navigate('/my-appointments');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="py-8">
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-full sm:w-72 shrink-0">
            <img
              className="bg-primary w-full h-80 sm:h-auto object-cover rounded-2xl shadow-md border border-gray-100"
              src={docInfo?.image}
              alt="doc_image"
            />
          </div>
          
          <div className="flex-1 border border-zinc-100 rounded-2xl p-6 sm:p-8 bg-white shadow-sm w-full">
            {/* Doc Info  */}
            <div className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
              <p>{docInfo.name}</p>
              <img className="w-5 h-5 object-contain mt-1" src={assets.verified_icon} alt="verified_icon" />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm mt-2 text-gray-600">
              <p className="font-medium bg-zinc-50 px-3 py-1 rounded-md border border-zinc-100">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <span className="py-1 px-3 border border-primary/20 text-primary text-xs rounded-full bg-primary/5 font-semibold">
                {docInfo.experience} Experience
              </span>
            </div>

            {/* Doc About */}
            <div className="mt-6 border-t border-zinc-100 pt-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                About <img src={assets.info_icon} alt="info_icon" className="w-4 h-4" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-2 leading-relaxed">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-700 font-semibold mt-6 bg-zinc-50/50 p-4 rounded-xl border border-zinc-100 inline-block">
              Appointment fee:{" "}
              <span className="text-primary text-xl font-bold ml-1">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-8 font-medium text-gray-700">
          <p className="text-lg font-semibold text-gray-900 border-b border-zinc-100 pb-3">Select Booking Slot</p>
          
          {/* Days Slots */}
          <div className="w-full mt-5">
            {docSlots.length > 0 && (
              <Swiper
                spaceBetween={12}
                slidesPerView={4}
                breakpoints={{
                  360: { slidesPerView: 4, spaceBetween: 10 },
                  480: { slidesPerView: 5, spaceBetween: 12 },
                  640: { slidesPerView: 7, spaceBetween: 12 },
                }}
                className="py-1"
              >
                {docSlots.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div 
                      onClick={() => {
                        setSlotIndex(index);
                        setSlotTime(""); // Reset selected time when day changes
                      }} 
                      className={`text-center py-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.03] select-none ${slotIndex === index ? 'bg-primary text-white shadow-md shadow-primary/20 border-primary' : 'border border-gray-200 text-gray-500 bg-white hover:border-primary/40'}`} 
                    >
                      <p className="text-[10px] font-bold tracking-wider uppercase opacity-80">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                      <p className="text-lg font-bold mt-1">{item[0] && item[0].datetime.getDate()}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Time Slots */}
          <div className="w-full mt-5">
            {docSlots.length > 0 && (
              <Swiper
                spaceBetween={10}
                slidesPerView={3}
                breakpoints={{
                  360: { slidesPerView: 3, spaceBetween: 8 },
                  480: { slidesPerView: 4, spaceBetween: 10 },
                  640: { slidesPerView: 6, spaceBetween: 10 },
                  850: { slidesPerView: 8, spaceBetween: 12 },
                  1024: { slidesPerView: 10, spaceBetween: 12 },
                }}
                className="py-1"
              >
                {docSlots[slotIndex].map((item, index) => (
                  <SwiperSlide key={index}>
                    <p 
                      onClick={() => setSlotTime(item.time)} 
                      className={`text-xs font-semibold shrink-0 px-2 py-3 rounded-full text-center cursor-pointer transition-all duration-200 hover:scale-[1.02] select-none ${item.time === slotTime ? 'bg-primary text-white shadow-md shadow-primary/10' : 'text-gray-500 border border-gray-200 bg-white hover:border-primary/40'}`} 
                    >
                      {item.time.toLowerCase()}
                    </p>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <button 
            onClick={handleBooking}
            className="bg-primary text-white text-sm font-semibold px-16 py-3.5 rounded-full my-8 hover:bg-primary/95 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            Book an appointment
          </button>
        </div>

        {/* Listing Related */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

        {/* Custom scrollbar hiding style */}
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    )
  );
}
