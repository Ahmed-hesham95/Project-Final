import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import '../Login.css';
import { FaEnvelope, FaEye, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LuEyeClosed } from 'react-icons/lu';
import api from '../api/Axios';

export default function Login() {
  const [isActive, setIsActive] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  // Protected Routes
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  //  Login Logic
  const loginSchema = Yup.object({
    identifier: Yup.string().required(),
    password: Yup.string().required().min(4),
  });

  const handleLoginSubmit = (values) => {
    // let domain = 'https://store.skyready.online';
    let url = '/auth/local';
    api
      .post(url, values)
      .then((res) => {
        console.log(res);
        let token = res.data.jwt;
        console.log(token);
        values.remember ? localStorage.setItem('token', token) : sessionStorage.setItem('token', token);
        toast.success('Login Success');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error.message) || toast.error(err.message);
      });
  };

  // Register Logic
  const registerSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(4).max(11),
  });

  const handleRegisterSubmit = (values) => {
    // let domain = 'https://store.skyready.online';
    let url = '/auth/local/register';
    api
      .post(url, values)
      .then((res) => {
        let token = res.data.jwt;
        sessionStorage.setItem('token', token);
        toast.success('Register Success');
        setIsActive(false);
        navigate('/login');
        console.log('Register Values:', values);
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
        toast.error(err.response.data.error.message);
      });
  };

  return (
    <div className='h-dvh flex justify-center items-center body login-container overflow-hidden'>
      <div className='w-full flex justify-center'>
        <div
          className={`container ${isActive ? 'active' : ''} relative w-[950px] h-[750px] m-5 rounded-[30px] overflow-hidden transition-all duration-700 bg-white/10 backdrop-blur-[20px] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]`}
        >

          {/* ======================== Login Form ======================== */}
          <Formik
            initialValues={{ identifier: '', password: '', remember: false, }}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <div className='form w-full'>
              <Form className='form-box absolute right-0 w-1/2 h-full flex flex-col justify-center p-10 text-center transition-all duration-700 z-10'>
                <h1 className='text-4xl font-bold text-white mb-6 tracking-wide drop-shadow-sm'>Login</h1>
                <div className='h-[18%]'>
                  <div className='relative my-[10px]'>
                    <Field
                      name='identifier'
                      type='email'
                      placeholder='Identifier'
                      className='w-full p-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 outline-none focus:bg-white/20 focus:border-white/50 focus:shadow-[0_0_15px_rgba(0,180,216,0.3)] transition-all duration-300'
                    />
                    <FaEnvelope className='absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white/80' />
                  </div>
                  <ErrorMessage name='identifier' component={'div'} className='text-red-300 text-sm mt-1 text-left pl-1' />
                </div>

                <div className='h-[18%]'>
                  <div className='relative my-[10px]'>
                    <Field
                      type={`${isShown ? 'text' : 'password'}`}
                      name='password'
                      placeholder='Password'
                      className='w-full p-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 outline-none focus:bg-white/20 focus:border-white/50 focus:shadow-[0_0_15px_rgba(0,180,216,0.3)] transition-all duration-300'
                    />
                    {
                      isShown
                        ?
                        <FaEye className='absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white/80 cursor-pointer hover:text-white transition-colors' onClick={() => setIsShown(false)} />
                        :
                        <LuEyeClosed className='absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white/80 cursor-pointer hover:text-white transition-colors' onClick={() => setIsShown(true)} />
                    }
                  </div>
                  <ErrorMessage name='password' component={'div'} className='text-red-300 text-sm mt-1 text-left pl-1' />
                </div>

                <div className='mb-6 text-right h-auto flex justify-between items-center'>
                  <div className='flex items-center gap-2' onClick={(e) => e.stopPropagation()}>
                    <Field id='remember' name='remember' onClick={(e) => e.stopPropagation()} className='checkbox checkbox-info border-white/50' type='checkbox' />
                    <label className='text-gray-200 cursor-pointer text-sm select-none' htmlFor='remember'>Remember me</label>
                  </div>
                  <Link to={'/'} className='text-[14.5px] text-white/80 no-underline hover:text-white hover:underline transition-colors duration-300'>Forgot Password?</Link>
                </div>

                <button type='submit' className='cursor-pointer w-full mx-auto bg-primary text-white py-3 rounded-lg font-bold uppercase tracking-wider shadow-[0_4px_6px_rgba(0,0,0,0.2)] hover:bg-primary/90 hover:shadow-[0_10px_15px_rgba(0,0,0,0.3)] hover:-translate-y-[2px] transition-all duration-200'>
                  Login
                </button>
              </Form>
            </div>
          </Formik>

          {/* ======================== Register Form ======================== */}
          <Formik
            initialValues={{ username: '', email: '', password: '', }}
            onSubmit={handleRegisterSubmit}
            validationSchema={registerSchema}
          >
            <div className='form w-full h-auto'>
              <Form className='form-box register absolute right-0 w-1/2 h-full flex flex-col justify-center p-10 text-center z-10 transition-all duration-700'>
                <h1 className='text-4xl font-bold text-white mb-6 tracking-wide drop-shadow-sm'>Sign Up</h1>
                <div className='h-[18%]'>
                  <div className='relative my-[10px]'>
                    <Field name='username' type='text' placeholder='Username' className='w-full p-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 outline-none focus:bg-white/20 focus:border-white/50 focus:shadow-[0_0_15px_rgba(0,180,216,0.3)] transition-all duration-300' />
                    <FaUser className='absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white/80' />
                  </div>
                  <ErrorMessage name='username' component={'div'} className='text-red-300 text-sm mt-1 text-left pl-1' />
                </div>

                <div className='h-[18%]'>
                  <div className='relative my-[10px]'>
                    <Field name='email' type='email' placeholder='Email' className='w-full p-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 outline-none focus:bg-white/20 focus:border-white/50 focus:shadow-[0_0_15px_rgba(0,180,216,0.3)] transition-all duration-300' />
                    <FaEnvelope className='absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white/80' />
                  </div>
                  <ErrorMessage name='email' component={'div'} className='text-red-300 text-sm mt-1 text-left pl-1' />
                </div>

                <div className='h-[18%]'>
                  <div className='relative my-[10px]'>
                    <Field name='password' type={`${isShown ? 'text' : 'password'}`} placeholder='Password' className='w-full p-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 outline-none focus:bg-white/20 focus:border-white/50 focus:shadow-[0_0_15px_rgba(0,180,216,0.3)] transition-all duration-300' />
                    {
                      isShown
                        ?
                        <FaEye className='absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white/80 cursor-pointer hover:text-white transition-colors' onClick={() => setIsShown(false)} />
                        :
                        <LuEyeClosed className='absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white/80 cursor-pointer hover:text-white transition-colors' onClick={() => setIsShown(true)} />
                    }
                  </div>
                  <ErrorMessage name='password' component={'div'} className='text-red-300 text-sm mt-1 text-left pl-1' />
                </div>

                <button type='submit' className='cursor-pointer w-full mx-auto bg-primary text-white py-3 rounded-lg font-bold uppercase tracking-wider shadow-[0_4px_6px_rgba(0,0,0,0.2)] hover:bg-primary/90 hover:shadow-[0_10px_15px_rgba(0,0,0,0.3)] hover:-translate-y-[2px] transition-all duration-200'>
                  Sign Up
                </button>
              </Form>
            </div>
          </Formik>

          {/* ======================== Toggle boxes ======================== */}

          <div className='toggle-box absolute w-full h-full'>
            <div className='toggle-panel toggle-left px-12'>
              <h1 className='text-4xl font-extrabold text-[#eef9fd] text-left drop-shadow-md'>Welcome Back!</h1>
              <p className='text-lg mt-4 text-[#eef9fd]/90 text-left leading-relaxed'>To keep connected with us please login with your personal info</p>
              <button
                className={`cursor-pointer border-2 border-white hover:bg-white hover:text-primary w-48 h-[50px] mt-6 text-white font-bold rounded-full mx-auto transition-all duration-300 shadow-md`}
                onClick={() => setIsActive(!isActive)}
              >
                Sign Up
              </button>
            </div>

            <div className='toggle-panel toggle-right px-12'>
              <h1 className='text-4xl font-extrabold text-[#eef9fd] text-center drop-shadow-md'>Hello, Friend!</h1>
              <p className='text-lg mt-4 text-[#eef9fd]/90 text-center leading-relaxed'>Enter your personal details and start your journey with us</p>
              <button
                className={`cursor-pointer border-2 border-white hover:bg-white hover:text-primary w-48 h-[50px] mt-6 text-white font-bold rounded-full mx-auto transition-all duration-300 shadow-md`}
                onClick={() => setIsActive(!isActive)}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
