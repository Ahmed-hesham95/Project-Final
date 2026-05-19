import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../Context/AppContext';
import { FiUser, FiPhone, FiCalendar, FiClock, FiActivity, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function PatientInfo() {
  const { tempBooking, bookAppointment } = useContext(AppContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Patient full name is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .positive('Age must be greater than zero')
      .integer('Age must be an integer')
      .max(120, 'Please enter a valid age')
      .required('Age is required'),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]*$/, 'Please enter a valid phone number')
      .min(7, 'Phone number is too short')
      .required('Phone number is required'),
    gender: Yup.string()
      .oneOf(['Male', 'Female'], 'Please select a gender')
      .required('Gender is required'),
    symptoms: Yup.string()
      .min(10, 'Please describe your symptoms in at least 10 characters')
      .required('Symptoms or reason for visit is required')
  });

  const handleSubmit = (values) => {
    if (!tempBooking) {
      toast.error('Booking session expired or invalid.');
      navigate('/doctors');
      return;
    }

    const success = bookAppointment(
      tempBooking.doctor,
      tempBooking.slotDate,
      tempBooking.slotTime,
      values
    );

    if (success) {
      navigate('/my-appointments');
    }
  };

  if (!tempBooking) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-6">
          <FiAlertCircle className="text-4xl text-amber-500 animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Session Expired</h3>
        <p className="text-gray-500 max-w-sm mb-6 text-sm">
          Please select a doctor and coordinate a date and time slot first before writing patient information.
        </p>
        <button
          onClick={() => navigate('/doctors')}
          className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/95 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
        >
          Explore Doctors
        </button>
      </div>
    );
  }

  const { doctor, slotDate, slotTime } = tempBooking;

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Patient Details Form</h2>
        <p className="text-sm text-gray-500 mt-1">Please provide accurate patient details to complete your appointment booking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Left Side: Summary Card */}
        <div className="lg:col-span-1 bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-zinc-100 pb-3 mb-4">Booking Summary</h3>

          <div className="flex items-center gap-3 mb-5 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100">
            <img className="w-16 h-16 rounded-lg object-cover bg-indigo-50" src={doctor.image} alt={doctor.name} />
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">{doctor.name}</h4>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{doctor.speciality}</p>
              <p className="text-xs text-primary font-semibold mt-1 bg-primary/5 px-2 py-0.5 rounded border border-primary/10 inline-block">
                Fee: ${doctor.fees}
              </p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs text-zinc-600">
            <div className="flex items-center gap-2.5 bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
              <FiCalendar className="text-primary text-base" />
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase">Date</p>
                <p className="font-semibold text-zinc-700 mt-0.5">{slotDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
              <FiClock className="text-primary text-base" />
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase">Time Slot</p>
                <p className="font-semibold text-zinc-700 mt-0.5">{slotTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Formik Patient Form */}
        <div className="lg:col-span-2 bg-white border border-zinc-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <Formik
            initialValues={{
              fullName: '',
              age: '',
              phone: '',
              gender: '',
              symptoms: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">

                {/* // ── Timer ──────────────────────────────────────────────────────────────────────*/}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2" htmlFor="fullName">
                    Patient Full Name
                  </label>
                  <div className="relative">
                    <Field
                      name="fullName"
                      type="text"
                      placeholder="e.g. Richard James"
                      className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-primary focus:shadow-md transition-all duration-200"
                    />
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
                  </div>
                  <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-1.5 pl-1 font-medium" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Age */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2" htmlFor="age">
                      Age
                    </label>
                    <div className="relative">
                      <Field
                        name="age"
                        type="number"
                        placeholder="e.g. 28"
                        className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-primary focus:shadow-md transition-all duration-200"
                      />
                      <FiActivity className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
                    </div>
                    <ErrorMessage name="age" component="div" className="text-red-500 text-xs mt-1.5 pl-1 font-medium" />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2" htmlFor="gender">
                      Gender
                    </label>
                    <div className="relative">
                      <Field
                        as="select"
                        name="gender"
                        className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-primary focus:shadow-md transition-all duration-200 appearance-none"
                      >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Field>
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
                    </div>
                    <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1.5 pl-1 font-medium" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Field
                      name="phone"
                      type="text"
                      placeholder="e.g. +1 234 567 890"
                      className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-primary focus:shadow-md transition-all duration-200"
                    />
                    <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
                  </div>
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1.5 pl-1 font-medium" />
                </div>

                {/* Symptoms / Reason */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2" htmlFor="symptoms">
                    Reason for visit / Medical symptoms
                  </label>
                  <div className="relative">
                    <Field
                      as="textarea"
                      name="symptoms"
                      rows="4"
                      placeholder="Please describe your health symptoms, medical condition, or reasons for visiting this specialist..."
                      className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-primary focus:shadow-md transition-all duration-200 resize-none"
                    />
                  </div>
                  <ErrorMessage name="symptoms" component="div" className="text-red-500 text-xs mt-1.5 pl-1 font-medium" />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-wider shadow-md hover:bg-primary/95 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 transition-all duration-200 cursor-pointer"
                  >
                    {isSubmitting ? 'Confirming Appointment...' : 'Confirm Appointment'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

      </div>
    </div>
  );
}
