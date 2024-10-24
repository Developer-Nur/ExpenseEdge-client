import React, { useContext, useRef, useState } from 'react';
import '../../index.css';
import { useForm } from "react-hook-form"
import { AuthInfo } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Singup = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, logOut, googleSingin, setLoader } = useContext(AuthInfo)
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    const onSubmit = (data) => {

        // password confirmation checker
        if (data.password !== data.confirmPassword) {
            setPasswordError(true)
            return;
        }

        const companyInfo = {
            password: data.password,
            companyName: data.companyName,
            mobileNumber: data.mobileNumber,
            location: data.location,
            email: data.email,
            companyType: data.companyType,
            role: "admin"
        }



        console.log("register data is", companyInfo);

        // creating a user for company registration and adding the data to the database company collection.
        createUser(companyInfo.email, companyInfo.password)
            .then(() => {


                // console.log("user data is", userInfo);
                axios.post(`${import.meta.env.VITE_SERVER_URL}/companies`, companyInfo)
                    .then(res => {

                        // console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "You Successfully Registered your company",
                                showConfirmButton: false,
                                timer: 5000
                            });
                            reset()
                            navigate('/dashboard/CompanyDashboard')
                        }
                    })
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: error,
                    showConfirmButton: false,
                    timer: 1000
                });
                setLoader(false)
            })
    };



    // handle creating a user
    const handleRegisterUser = e => {
        e.preventDefault(); // Prevent default form behavior

        const userEmail = e.target.email.value;
        const userPassword = e.target.password.value;
        const checkPassword = e.target.confirmPassword.value;
        const userName = e.target.name.value;

        if (userPassword !== checkPassword) {
            setPasswordError(true)
            return;
        }

        // console.log("user form data is ",email, password );

        // creating a user and sending the user data to the database user collection
        createUser(userEmail, userPassword)
            .then(() => {

                // creating users to the database
                const userInfo = {
                    name: userName,
                    email: userEmail,
                    password: userPassword,

                }
                // console.log("user data is", userInfo);
                axios.post(`${import.meta.env.VITE_SERVER_URL}/users`, userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Registration Success",
                                showConfirmButton: false,
                                timer: 5000
                            });
                            reset()
                            navigate('/dashboard/GeneralUser')
                        }
                    })
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: error,
                    showConfirmButton: false,
                    timer: 1000
                });
                setLoader(false)
            })
    };

    return (
        <>
            <div className='py-10 md:py-28 text-center singup-bg min-h-screen flex justify-center items-center'>


                {/* registration separator */}
                <div className='space-x-2 md:space-x-5'>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl mb-7'>You can register your company or <br /> as a general user</h2>

                    {/* company registration modal*/}
                    <button className="btn shadow-xl  btn-ghost px-4 py-2 text-lg primary-color bg-white hover:text-[#E3FEF7] hover:bg-[#003C43] rounded-lg" onClick={() => document.getElementById('my_modal_2').showModal()}>Register Company</button>

                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Register your Company</h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="card-body rounded-lg p-2  w-full text-left">

                                <div className="form-control">
                                    <label className="block mb-2 label">Company Name</label>
                                    <input placeholder='Company Name' className="input input-bordered w-full" type="text" {...register('companyName', { required: 'Name is required' })} />
                                    {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label block mb-2">Company Type</label>
                                    <select className="input input-bordered w-full" {...register('companyType', { required: 'Company Type is required' })}>
                                        <option value="">Select...</option>
                                        <option value="Non Profit">Non Profit</option>
                                        <option value="Service Base">Service Base</option>
                                        <option value="E-commerce Store">E-commerce Store</option>
                                        <option value="E-Learning Platform">E-Learning Platform</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {errors.companyType && <p className="text-red-500">{errors.companyType.message}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label block mb-2">Location</label>
                                    <input placeholder='where your company located at?' className="input input-bordered w-full" type="text" {...register('location')} />
                                </div>

                                <div className="form-control">
                                    <label className="label block mb-2">Email</label>
                                    <input placeholder='email' className="input input-bordered w-full" type="email" {...register('email', { required: 'Email is required' })} />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label block mb-2">Mobile Number</label>
                                    <input
                                        placeholder='Mobile Number'

                                        className="input input-bordered w-full" type="number" {...register('mobileNumber', { required: 'Mobile Number is required' })} />
                                    {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber.message}</p>}

                                </div>

                                <div className="form-control">
                                    <label className="label block mb-2">Password</label>
                                    <input placeholder='*******' className="input input-bordered w-full" type="password" {...register('password', { required: 'Password is required' })} />
                                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label block mb-2">Confirm Password</label>
                                    <input placeholder='*******' className="input input-bordered w-full" type="password" {...register('confirmPassword', { required: 'Password is required' })} />
                                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                                </div>


                                {/* Error message (if any) */}
                                {passwordError && (
                                    <p className='text-base text-red-600'>Password do not match!</p>
                                )}



                                <div className="mt-4 p-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#ffffff] section-bg hover:bg-[#135D66] text-center">
                                    <button className="button" type="submit">Register</button>
                                </div>
                            </form>

                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

                    {/* general user registration */}
                    <button className="shadow-xl btn btn-ghost px-4 py-2 text-lg primary-color bg-white hover:text-[#E3FEF7] hover:bg-[#003C43] rounded-lg" onClick={() => document.getElementById('my_modal_3').showModal()}>Register as user</button>


                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Register as user</h3>

                            <form onSubmit={handleRegisterUser} className="card-body  rounded-lg p-5">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input name="name" type="text" placeholder="Your name" className="input input-bordered" required />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text ">Password</span>
                                    </label>
                                    <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text ">Confirm Password</span>
                                    </label>
                                    <input name="confirmPassword" type="password" placeholder="password" className="input input-bordered" required />
                                </div>
                                {passwordError && (
                                    <p className='text-base text-red-600'>Password do not match!</p>
                                )}

                                <div className="form-control mt-3">
                                    <button className='p-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#ffffff] section-bg hover:bg-[#135D66]'>Register</button>
                                </div>

                                {/* redirect to register */}
                            </form>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
        </>
    );
};
export default Singup;









