import { useState } from 'react';
import { assets } from '../assets/assets';


export default function MyProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: "Ahmad Fox",
    image: assets.profile_pic,
    email: "richardjameswap@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London"
    },
    gender: "Male",
    dob: "2000-01-20"
  });

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      {/* Profile Image Section */}
      {isEdit
        ?
        <div className='relative w-36 h-36 rounded-full overflow-hidden opacity-75'>
          <img className='w-full h-full object-cover' src={userData.image} alt="Profile" />
          <div className='absolute bottom-0 right-0 w-full h-full bg-black/20 flex items-center justify-center cursor-pointer'>
            <img className='w-12 h-12' src={assets.upload_area} alt="Upload" />
          </div>
        </div>
        : <img className='w-36 h-36 rounded-full object-cover' src={userData.image} alt="Profile" />
      }

      {/* Name Section */}
      {isEdit
        ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 outline-primary' type="text" value={userData.name} onChange={e => setUserData(data => ({ ...data, name: e.target.value }))} />
        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-px border-none' />

      {/* Contact Information */}
      <div>
        <p className='text-neutral-500 underline mt-3 uppercase'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {isEdit
            ? <input className='bg-gray-100 max-w-52 outline-primary' type="text" value={userData.phone} onChange={e => setUserData(data => ({ ...data, phone: e.target.value }))} />
            : <p className='text-blue-400'>{userData.phone}</p>
          }

          <p className='font-medium'>Address:</p>
          {isEdit
            ? <p>
              <input className='bg-gray-50 outline-primary' onChange={(event) => setUserData(data => ({ ...data, address: { ...data.address, line1: event.target.value } }))} value={userData.address.line1} type="text" />
              <br />
              <input className='bg-gray-50 outline-primary' onChange={(event) => setUserData(data => ({ ...data, address: { ...data.address, line2: event.target.value } }))} value={userData.address.line2} type="text" />
            </p>
            : <p className='text-gray-500'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className='text-neutral-500 underline mt-3 uppercase'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {isEdit
            ?
            <select className='max-w-20 bg-gray-100 outline-primary' onChange={(event) => setUserData(data => ({ ...data, gender: event.target.value }))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className='text-gray-400'>{userData.gender}</p>
          }

          <p className='font-medium'>Birthday:</p>
          {isEdit
            ? <input className='max-w-28 bg-gray-100 outline-primary' type="date" onChange={(event) => setUserData(data => ({ ...data, dob: event.target.value }))} value={userData.dob} />
            : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      {/* Edit/Save Button */}
      <div className='mt-10 flex justify-center'>
        {
          isEdit
            ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(false)}>Save information</button>
            : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  );
};
