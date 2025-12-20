import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import MainLayout from './layouts/MainLayout';
import Appointment from './pages/Appointment';
import { Toaster } from 'react-hot-toast';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div className='px-0 sm:px-0 md:px-[-10%] lg:px-[10%]'>
      <Toaster position='top-right' toastOptions={{
        className: 'border-2',
        success: {
          duration: 5000,
          style: {
            borderRadius: '10px',
            padding: '1rem',
            background: 'white',
            color: 'green',
          },
        },
        error: {
          duration: 5000,
          style: {
            borderRadius: '10px',
            padding: '1rem',
            background: 'white',
            color: 'red',
          },
        },
      }}
        reverseOrder={false} gutter={24} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App