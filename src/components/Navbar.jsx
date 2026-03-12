import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import { CgClose, CgMenuRightAlt } from "react-icons/cg";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  }
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showDropdown]);
  const handleLogout = () => {
    localStorage.clear('token') || sessionStorage.clear('token');
    navigate('./login');
    toast.error('Logged out!!');
  }
  return (
    <>
      <div className="relative flex items-center justify-between text-sm text-[#1F2937] py-4 mb-5 border-b border-b-gray-400">
        <img onClick={() => navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />
        <ul className="hidden md:flex items-start gap-6 font-medium">
          <NavLink to="/">
            <li className="py-1 uppercase">Home</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/doctors">
            <li className="py-1 uppercase">All Doctors</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/about">
            <li className="py-1 uppercase">ABOUT</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/contact">
            <li className="py-1 uppercase">Contact</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            {
              token
                ? <div ref={dropdownRef} className="flex items-center gap-2 cursor-pointer group relative">
                  <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2">
                    <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
                    <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                  </div>
                  {showDropdown && (
                    <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20">
                      <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                        <p onClick={() => { navigate('my-profile'); setShowDropdown(false); }} className="hover:text-[#1F2937] cursor-pointer">My Profile</p>
                        <p onClick={() => { navigate('my-appointments'); setShowDropdown(false); }} className="hover:text-[#1F2937] cursor-pointer">My Appointments</p>
                        <p onClick={() => { handleLogout(); setShowDropdown(false); }} className="hover:text-[#1F2937] cursor-pointer">Logout</p>
                      </div>
                    </div>
                  )}
                </div>
                : <button onClick={() => navigate('/login')} className="cursor-pointer bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block">Create account</button>
            }
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="cursor-pointer">
              {
                showMobileMenu ? <CgClose className="text-2xl text-gray-700" /> : <CgMenuRightAlt className="text-2xl text-gray-700" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`top-[80px] left-0 md:hidden ${showMobileMenu ? 'visible' : 'hidden'} mb-1.5`} >
        <ul className="flex items-start gap-6 font-medium flex-wrap">
          <NavLink to="/">
            <li className="py-1 uppercase">Home</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/doctors">
            <li className="py-1 uppercase">All Doctors</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/about">
            <li className="py-1 uppercase">ABOUT</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/contact">
            <li className="py-1 uppercase">Contact</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
