import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import '../Login.css';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(4),
  });

  const registerSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(4).max(15),
  });

  const handleLoginSubmit = (values) => {
    let isVerified = true;
    if (isVerified) {
      values.remember == true ? localStorage.setItem('hasLogged', 'true') : sessionStorage.setItem('hasLogged', 'true');
      toast.success('Login Success');
      navigate('/');
    } else {
      toast.error('Login Failed');
    }
    console.log('Login Values:', values);
  };

  const handleRegisterSubmit = (values) => {
    console.log('Register Values:', values);
  };

  return (
    <div className='h-dvh flex justify-center items-center body bg-linear-to-br from-indigo-700 via-purple-500 to-blue-400'>
      <div className='w-full flex justify-center'>
        <div
          id='container'
          className={`container ${isActive ? 'active' : ''} relative w-[850px] h-[550px] m-5 bg-white rounded-4xl shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-700`}
        >

          {/* ======================== Login Form ======================== */}
          <Formik
            initialValues={{ email: '', password: '', remember: false }}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <div className='form'>
              <Form className='form-box absolute right-0 w-1/2 h-full flex flex-col justify-center p-10 text-center transition-all duration-700 bg-white z-1'>
                <h1 className='text-4xl font-semibold text-gray-800 mb-5'>Login</h1>
                <div className='h-[18%]'>
                  <div className='flex relative bg-gray-200 justify-between items-center outline-none rounded-lg'>
                    <Field
                      name='email'
                      type='email'
                      placeholder='Enter your email'
                      id='input'
                      className='p-3 pr-12 text-gray-800 outline-none'
                    />
                    <FaUser className='-translate-y-1/2 text-gray-500 absolute right-4 top-1/2' />
                  </div>
                  <ErrorMessage name='email' component={'div'} className='text-red-500 text-md' />
                </div>

                <div className='h-[18%]'>
                  <div className='flex relative bg-gray-200 rounded-lg justify-between items-center outline-none'>
                    <Field
                      type='password'
                      name='password'
                      placeholder='Enter your password'
                      className='p-3 pr-12 text-gray-800 outline-none'
                    />
                    <FaLock className='-translate-y-1/2 text-gray-500 absolute right-4 top-1/2' />
                  </div>
                  <ErrorMessage name='password' component={'div'} className='text-red-500 text-md' />
                </div>

                <div className='mb-4 text-right h-[18%] flex justify-between'>
                  <div className='flex items-center gap-2' onclick={(e) => e.stopPropagation()}>
                    <Field id='remember' name='remember' className='checkbox checkbox-neutral' type='checkbox' />
                    <label className='text-gray-700 cursor-pointer' htmlFor='remember'>Remember me</label>
                  </div>
                  <Link to={'/'} className='a text-gray-700 text-sm'>Forgot Password?</Link>
                </div>

                <button type='submit' className='btn w-1/2 mx-auto bg-[#7494ec] text-white py-3 rounded-lg font-semibold shadow hover:scale-105 transition'>
                  Login
                </button>
              </Form>
            </div>
          </Formik>

          {/* ======================== Register Form ======================== */}
          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            onSubmit={handleRegisterSubmit}
            validationSchema={registerSchema}
          >
            <div className='form h-auto'>
              <Form className='form-box register absolute right-0 w-1/2 h-full flex flex-col justify-center p-10 text-center bg-white z-1 transition-all duration-700'>
                <h1 className='text-4xl font-semibold text-gray-800 mb-5'>Sign Up</h1>

                <div className='h-[18%]'>
                  <div className='relative'>
                    <Field name='username' type='text' placeholder='Enter your name' className='w-full p-3 pr-12 bg-gray-200 rounded-lg' />
                    <FaUser className='icon fa-solid fa-user absolute right-4 top-1/2 -translate-y-1/2 text-gray-500' />
                  </div>
                  <ErrorMessage name='username' component={'div'} className='text-red-500 h-fit' />
                </div>

                <div className='h-[18%]'>
                  <div className='relative'>
                    <Field name='email' type='email' placeholder='Enter your email' className='w-full p-3 pr-12 bg-gray-200 rounded-lg' />
                    <FaEnvelope className='icon fa-solid fa-envelope absolute right-4 top-1/2 -translate-y-1/2 text-gray-500' />
                  </div>
                  <ErrorMessage name='email' component={'div'} className='text-red-500 h-fit' />
                </div>

                <div className='h-[18%]'>
                  <div className='relative'>
                    <Field name='password' type='password' placeholder='Enter your password' className='w-full p-3 pr-12 bg-gray-200 rounded-lg' />
                    <FaLock className='icon fa-solid fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-500' />
                  </div>
                  <ErrorMessage name='password' component={'div'} className='text-red-500 h-fit' />
                </div>

                <button type='submit' className='btn w-1/2 mx-auto bg-[#7494ec] text-white py-3 rounded-lg font-semibold shadow transition'>
                  Sign Up
                </button>
              </Form>
            </div>
          </Formik>

          {/* ======================== Toggle box ======================== */}

          <div className='toggle-box absolute w-full h-full'>
            <div className='toggle-panel toggle-left'>
              <h1 className='text-4xl font-bold text-center'>Welcome to our website!</h1>
              <p className='text-lg mt-2 text-shadow-yellow-700'>Don't have an account?</p>
              <button
                className={`btn border-2 border-white bg-transparent w-40 h-[46px] mt-3 text-white font-semibold rounded-lg`}
                onClick={() => setIsActive(true)}
              >
                Sign Up
              </button>
            </div>

            <div className='toggle-panel toggle-right'>
              <h1 className='text-4xl font-bold text-center'>Welcome Back!</h1>
              <p className='text-lg mt-2'>Already have an account?</p>
              <button
                className={`btn border-2 border-white bg-transparent w-40 h-[46px] mt-3 text-white font-semibold rounded-lg`}
                onClick={() => setIsActive(false)}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
