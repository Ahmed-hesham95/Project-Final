import { Link } from 'react-router-dom';
import error_icon from '../assets/error_icon.svg';

export default function ErrorPage() {
    return (
        <div className='h-dvh w-full flex justify-center items-center'>
            <div className='w-[90%] lg:w-1/2 flex flex-col gap-12 justify-center items-center shadow-[0_0_30px_rgba(0,0,0,0.1)] border border-gray-300 rounded-4xl py-6 px-4 md:py-12 md:px-24'>
                <h1 className='text-5xl font-semibold text-[#5F6FFF] h-fit w-fit rounded-b-4xl px-4 py-2'>
                    Page Not Found
                </h1>
                <img src={error_icon} alt="error_icon" className='' />
                <p className='text-2xl text-gray-500'>please check link</p>
                <Link className='bg-black text-white px-10 py-4 hover:bg-[#5F6FFF] transition-all duration-300 rounded-full' to="/">
                    Go Back
                </Link>
            </div>
        </div>
    );
};
