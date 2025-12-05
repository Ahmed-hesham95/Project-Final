import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Mainlayout from './layouts/mainlayout';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='mx-0 sm:mx-0 md:mx-[-10%] lg:mx-[10%]'>
      <Toaster />
      <Routes>
        <Route element={<Mainlayout />}>
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
        <Route path='*' element={<error className='h-[40vh] w-full flex justify-center items-center'><h1 className='text-4xl text-white h-fit w-fit rounded-[2em] bg-red-500 px-4 py-2'>404 ERROR Page Is Not Found</h1></error>} />
      </Routes>
    </div>
  )
}

export default App