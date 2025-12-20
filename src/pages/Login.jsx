import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import '../Login.css';
import { FaEnvelope, FaEye, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { LuEyeClosed } from 'react-icons/lu';

export default function Login() {
  const [isActive, setIsActive] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
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
    let domain = 'http://82.112.241.233:2001';
    let endPoint = '/api/auth/local';
    let url = domain + endPoint;
    axios
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
        toast.error(err.response.data.error.message);
      });
  };

  // Register Logic
  const registerSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(4).max(11),
  });

  const handleRegisterSubmit = (values) => {
    let domain = 'http://82.112.241.233:2001';
    let endPoint = '/api/auth/local/register';
    let url = domain + endPoint;
    axios
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
    <div className='h-dvh flex justify-center items-center body'>
      <div className='w-full flex justify-center'>
        <div
          id='container'
          className={`container ${isActive ? 'active' : null} relative w-[950px] h-[750px] m-5 bg-white rounded-4xl shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-700`}
        >

          {/* ======================== Login Form ======================== */}
          <Formik
            initialValues={{ identifier: '', password: '', remember: false, }}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <div className='form'>
              <Form className='form-box absolute right-0 w-1/2 h-full flex flex-col justify-center p-10 text-center transition-all duration-700 z-1'>
                <h1 className='text-4xl font-semibold text-gray-800 mb-5'>Login</h1>
                <div className='h-[18%]'>
                  <div className='py-1.5 flex relative bg-gray-200 justify-between items-center outline-none rounded-lg'>
                    <Field
                      name='identifier'
                      type='email'
                      placeholder='Enter your identifier'
                      id='input'
                      className='p-3 pr-12 text-gray-800 outline-none'
                    />
                    <FaEnvelope className='-translate-y-1/2 text-gray-500 absolute right-4 top-1/2' />
                  </div>
                  <ErrorMessage name='identifier' component={'div'} className='text-red-500 text-md' />
                </div>

                <div className='h-[18%]'>
                  <div className='py-1.5 flex relative bg-[#eff2f9] rounded-lg justify-between border-0 border-[4px dotted #161b1d] items-center shadow-[-2px_-2px_10px_inset_#fafbff,2px_2px_10px_inset_#161b1d05]'>
                    <Field
                      type={`${isShown ? 'text' : 'password'}`}
                      name='password'
                      placeholder='Enter your password'
                      className='p-3 pr-12 text-gray-800 outline-none'
                    />
                    {
                      isShown
                        ?
                        <FaEye className='-translate-y-1/2 text-gray-500 absolute right-4 top-1/2 cursor-pointer' onClick={() => setIsShown(false)} />
                        :
                        <LuEyeClosed className='-translate-y-1/2 text-gray-500 absolute right-4 top-1/2 cursor-pointer' onClick={() => setIsShown(true)} />
                    }
                  </div>
                  <ErrorMessage name='password' component={'div'} className='text-red-500 text-md' />
                </div>

                <div className='mb-4 text-right h-[18%] flex justify-between'>
                  <div className='flex items-center gap-2' onClick={(e) => e.stopPropagation()}>
                    <Field id='remember' name='remember' className='checkbox checkbox-neutral' type='checkbox' />
                    <label className='text-gray-700 cursor-pointer' htmlFor='remember'>Remember me</label>
                  </div>
                  <Link to={'/'} className='a text-gray-700 text-sm'>Forgot Password?</Link>
                </div>

                <button type='submit' className='btn w-1/2 mx-auto bg-[#00B4D8] text-[#eef9fd] py-3 rounded-lg font-semibold shadow hover:scale-105 transition'>
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
                    <Field name='password' type={`${isShown ? 'text' : 'password'}`} placeholder='Enter your password' className='w-full p-3 pr-12 bg-gray-200 rounded-lg' />
                    {
                      isShown
                        ?
                        <FaEye className='icon fa-solid fa-eye absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer' onClick={() => setIsShown(false)} />
                        :
                        <LuEyeClosed className='icon fa-solid fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer' onClick={() => setIsShown(true)} />
                    }
                  </div>
                  <ErrorMessage name='password' component={'div'} className='text-red-500 h-fit' />
                </div>

                <button type='submit' className='btn w-1/2 mx-auto bg-[#00B4D8] text-white py-3 rounded-lg font-semibold shadow transition'>
                  Sign Up
                </button>
              </Form>
            </div>
          </Formik>

          {/* ======================== Toggle boxes ======================== */}

          <div className='toggle-box absolute w-full h-full'>
            <div className='toggle-panel toggle-left px-8'>
              <h1 className='text-4xl font-bold text-[#eef9fd] text-left'>Welcome to our website!</h1>
              <p className='text-lg mt-2 text-[#eef9fd] text-left'>Don't have an account?</p>
              <button
                className={`btn border-2 border-[#eef9fd] bg-transparent w-40 h-[46px] mt-3 text-[#eef9fd] font-semibold rounded-lg mx-auto`}
                onClick={() => setIsActive(true)}
              >
                Sign Up
              </button>
            </div>

            <div className='toggle-panel toggle-right px-8'>
              <h1 className='text-4xl font-bold text-[#eef9fd] text-center'>Welcome Back!</h1>
              <p className='text-lg mt-2 text-[#eef9fd] text-center'>Already have an account?</p>
              <button
                className={`btn border-2 border-[#eef9fd] bg-transparent w-40 h-[46px] mt-3 text-[#eef9fd] font-semibold rounded-lg mx-auto`}
                onClick={() => setIsActive(false)}
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
