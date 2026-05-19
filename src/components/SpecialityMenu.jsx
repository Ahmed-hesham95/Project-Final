import { specialityData } from '../assets/assets';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Specialitymenu() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800 relative w-full" id="Speciality">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-500">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      {/* Swiper Slider Wrapper */}
      <div className="w-full px-8 sm:px-16 relative speciality-swiper-container group">

        {/* Custom Left Arrow */}
        <button className="swiper-button-prev-custom absolute -left-2 top-[40%] -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-[#5f6caf] w-10 h-10 rounded-full shadow-md border border-gray-100 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center">
          <FiChevronLeft className="text-xl" />
        </button>

        {/* Custom Right Arrow */}
        <button className="swiper-button-next-custom absolute -right-2 top-[40%] -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-[#5f6caf] w-10 h-10 rounded-full shadow-md border border-gray-100 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center">
          <FiChevronRight className="text-xl" />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            480: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            850: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          className="py-10 px-2"
        >
          {specialityData.map((item, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <Link
                onClick={() => scrollTo(0, 0)}
                className="flex flex-col items-center gap-2 text-xs cursor-pointer hover:scale-105 transition-all duration-500"
                to={`/doctors/${item.speciality}`}
              >
                <img className="w-16 sm:w-24 h-24 object-cover" src={item.image} alt={`${item.speciality}`} />
                <p>{item.speciality}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Styles for Swiper Pagination */}
        <style>{`
          .speciality-swiper-container .swiper-pagination-bullet-active {
            background: #5f6caf !important;
            width: 24px;
            border-radius: 4px;
            transition: all 0.3s ease;
          }
          .speciality-swiper-container .swiper {
            padding-bottom: 48px !important;
            padding-left: 8px !important;
            padding-right: 8px !important;
          }
        `}</style>
      </div>
    </div>
  );
}
