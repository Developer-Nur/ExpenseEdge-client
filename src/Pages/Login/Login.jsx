import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import LoginAnimation from "../../../public/loginAnimation.json"
import '../../index.css'
import Lottie from 'lottie-react';

const Login = () => {
    return (
        <>
            <div className="section-bg p-10 lg:p-16">

                <div className='mt-10  lg:flex justify-around items-center'>

                    {/* Login Form */}
                    <div className='bg-white rounded-lg  w-full lg:w-2/5'>
                        <from className=" rounded-lg p-7">
                            <form className="card-body  rounded-lg">
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

                                <div className="form-control mt-3">
                                    <button className='p-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#ffffff] section-bg hover:bg-[#135D66]'>Login</button>
                                </div>

                                {/* redirect to register */}
                            </form>
                            <p className="pl-8 accent-color text-[12px]">Do not have an account?
                                <span className="underline hover:text-[#6A9C89] ">
                                    <Link to="/Singup"> Register</Link>
                                </span>
                            </p>

                            {/* social login options */}
                            <div className="text-center">
                                <div className="divider">OR</div>
                                <section className="space-x-6 ">

                                    {/* Login by google */}
                                    <button className="shadow-xl btn btn-ghost p-2 text-18px primary-color theme-sec hover:text-[#E3FEF7] hover:bg-[#003C43] rounded-lg "> <FcGoogle /> Login with Google</button>

                                    {/* Login by twitter */}
                                    <button className="shadow-xl btn btn-ghost p-2 text-18px primary-color theme-sec hover:text-[#E3FEF7] hover:bg-[#003C43] rounded-lg m-0"> <FaXTwitter /> Login with Twitter</button>
                                </section>
                            </div>
                        </from>


                    </div>

                    {/* animation */}
                    <div>
                        <h2 className='text-2xl mb-3 text-center mt-10'>Secure Access to Your Revenue Dashboard</h2>
                        <p className='text-color text-center'>Log in to track, manage, and grow your business earnings.</p>
                        <div className="max-w-[250px] mx-auto">
                            <Lottie animationData={LoginAnimation} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;