import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import { CgClose, CgMenuRightAlt } from "react-icons/cg";
import { FiHome, FiUsers, FiInfo, FiPhone, FiChevronRight, FiLogOut, FiUser } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  }

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileMenu]);

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
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('./login');
    toast.success('Logged out!!');
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

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            {
              token
                ? <div ref={dropdownRef} className="hidden md:flex items-center gap-2 cursor-pointer group relative">
                  <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2">
                    <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
                    <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                  </div>
                  {showDropdown && (
                    <div className="absolute top-0 right-0 pt-14 text-base font-medium z-20">
                      <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg text-[#1F2937]">
                        <p onClick={() => { navigate('my-profile'); setShowDropdown(false); }} className="hover:text-primary cursor-pointer">My Profile</p>
                        <p onClick={() => { navigate('my-appointments'); setShowDropdown(false); }} className="hover:text-primary cursor-pointer">My Appointments</p>
                        <p onClick={() => { handleLogout(); setShowDropdown(false); }} className="hover:text-primary cursor-pointer">Logout</p>
                      </div>
                    </div>
                  )}
                </div>
                : <button onClick={() => navigate('/login')} className="cursor-pointer bg-primary text-white px-4 py-2 sm:px-8 sm:py-3 rounded-full font-light text-xs sm:text-sm">Create account</button>
            }
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="cursor-pointer p-1">
              {
                showMobileMenu ? <CgClose className="text-2xl text-[#1F2937]" /> : <CgMenuRightAlt className="text-2xl text-[#1F2937]" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${showMobileMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setShowMobileMenu(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 bottom-0 right-0 z-50 w-80 max-w-[85vw] bg-white h-screen shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col  ${showMobileMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <img onClick={() => { navigate('/'); setShowMobileMenu(false); }} className="w-32 cursor-pointer" src={assets.logo} alt="Logo" />
            <button onClick={() => setShowMobileMenu(false)} className="p-2 rounded-full hover:bg-gray-100 text-[#1F2937] transition-all cursor-pointer">
              <CgClose className="text-xl" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            <NavLink
              to="/"
              onClick={() => setShowMobileMenu(false)}
              className={({ isActive }) =>
                `flex items-center justify-between p-3.5 rounded-xl font-medium transition-all duration-200 group ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <FiHome className="text-lg" />
                <span>Home</span>
              </div>
              <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
            </NavLink>

            <NavLink
              to="/doctors"
              onClick={() => setShowMobileMenu(false)}
              className={({ isActive }) =>
                `flex items-center justify-between p-3.5 rounded-xl font-medium transition-all duration-200 group ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <FiUsers className="text-lg" />
                <span>All Doctors</span>
              </div>
              <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setShowMobileMenu(false)}
              className={({ isActive }) =>
                `flex items-center justify-between p-3.5 rounded-xl font-medium transition-all duration-200 group ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <FiInfo className="text-lg" />
                <span>About</span>
              </div>
              <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setShowMobileMenu(false)}
              className={({ isActive }) =>
                `flex items-center justify-between p-3.5 rounded-xl font-medium transition-all duration-200 group ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <FiPhone className="text-lg" />
                <span>Contact</span>
              </div>
              <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
            </NavLink>
          </nav>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          {token ? (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { navigate('my-profile'); setShowMobileMenu(false); }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  <FiUser className="text-sm" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => { navigate('my-appointments'); setShowMobileMenu(false); }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  <FiUser className="text-sm" />
                  <span>Appointments</span>
                </button>
              </div>

              <button
                onClick={() => { handleLogout(); setShowMobileMenu(false); }}
                className="flex items-center justify-center gap-2 w-full py-2.5 mt-1 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all cursor-pointer"
              >
                <FiLogOut className="text-sm" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => { navigate('/login'); setShowMobileMenu(false); }}
              className="w-full bg-primary text-white text-center py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-sm cursor-pointer"
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
