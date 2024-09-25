import React from 'react';
import { BsBuildings } from 'react-icons/bs';
import { CiMail } from 'react-icons/ci';
import { FaGoogle } from 'react-icons/fa';
import { GoHash } from 'react-icons/go';
import { RiTwitterXLine } from 'react-icons/ri';
import { TfiWorld } from 'react-icons/tfi';

const Banner = () => {
    return (
        <div className='flex flex-col lg:pb-0 pb-10 lg:flex-row  lg:justify-evenly lg:h-[800px] bg-[#6A9C89]'>
            <div className=' my-auto space-y-2 md:space-y-5 text-center lg:text-start lg:pt-0 pt-5'>
                <h2 className='text-2xl md:text-3xl lg:text-5xl  text-yellow-500 font-semibold'>Comprehensive</h2>
                <h1 className='text-5xl md:text-7xl lg:text-9xl font-extrabold'>Accounting</h1>
                <h1 className='text-5xl md:text-7xl lg:text-9xl font-extrabold'>Platform</h1>
                <h3 className='text-2xl md:text-3xl lg:text-5xl font-semibold'>for growing businesses</h3>
            </div>
            {/* Form */}
            <div className="card mt-8 md:mt-10 lg:mt-auto mx-auto lg:mx-0 bg-base-100 md:p-5 w-full my-auto max-w-xs md:max-w-lg shrink-0 shadow-2xl">
                <h1 className='text-center pt-5 px-2 text-xl md:text-2xl lg:text-2xl font-bold'>Try ExpenseEdge Books for free</h1>
                <form className="card-body md:space-y-2">
                    <label className="input border-2 rounded-none p-3 border-black flex items-center gap-2">
                       <BsBuildings className='font-bold text-xl'/>
                        <input type="text" className="grow text-xl" placeholder="Company Name" />
                    </label>
                    <label className="input border-2 rounded-none p-3 border-black flex items-center gap-2">
                       <CiMail className='font-bold text-xl'/>
                        <input type="text" className="grow text-xl" placeholder="Email" />
                    </label>
                    <label className="input border-2 rounded-none p-3 border-black flex items-center gap-2">
                       <GoHash className='font-bold text-xl'/>
                        <input type="text" className="grow text-xl" placeholder="Password" />
                    </label>
                    <label className="input border-2 rounded-none p-3 border-black flex items-center gap-2">
                       <TfiWorld className='font-bold text-xl'/>
                        <input type="text" className="grow text-xl" placeholder="Country" />
                    </label>
                    <h2>Your data will be in collected</h2>
                    <label className="flex text-[14px] gap-2">
                        <input type="checkbox" className="" placeholder="Country" />
                        <h3>I agree to the Terms of Service and Privacy Policy.</h3>
                    </label>
                    <button className='bg-yellow-500 hover:bg-yellow-600 p-3 font-bold text-xl'>START</button>
                    <div className='flex flex-col md:flex-row items-center gap-3'>
                        <h2 className='font-bold text-gray-500'>or sign in using</h2>
                        <div className='flex items-center gap-3'>
                        <h2 className='border-2 text-xl items-center hover:bg-red-100 flex gap-1 py-1 rounded-md px-4'><FaGoogle className='text-xl text-red-600'/>Google</h2>
                        <h2 className='border-2 text-xl items-center hover:bg-gray-100 flex gap-1 py-1 rounded-md px-4'><RiTwitterXLine className='text-xl'/>Twitter</h2>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Banner;