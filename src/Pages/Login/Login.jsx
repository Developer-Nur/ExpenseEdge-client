import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import LoginAnimation from "../../../public/loginAnimation.json"
import '../../index.css'
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthInfo } from '../../Provider/AuthProvider';

const Login = () => {

    const { singinUser, googleSingin, setLoader } = useContext(AuthInfo)

    const navigate = useNavigate();

    // handle login user
    const handleUSerLogin = e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // console.log("user login info from the loging page", email, "and pass", password);

        singinUser(email, password)
            .then(res => {
                const user = res.user;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Success",
                    showConfirmButton: false,
                    timer: 1500
                });
                // setLoader(false)
                navigate('/dashboard')
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Email or password did not match",
                    showConfirmButton: false,
                    timer: 5000
                });
            })


    };

    // handle social login
    const loginWithGoogle = () => {
        googleSingin()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Success",
                    showConfirmButton: false,
                    timer: 1500
                });
                // setLoader(false)
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 5000
                });
                setLoader(false)
            })
    }


    return (
        <>
            <div className="section-bg p-10 lg:p-16">

                <div className='mt-10  lg:flex justify-around items-center'>

                    {/* Login Form */}
                    <div className='bg-white rounded-lg  w-full lg:w-2/5'>
                        <form onSubmit={handleUSerLogin} className="card-body  rounded-lg p-7">
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
                        <div className="text-center ">
                            <div className="divider">OR</div>
                            <section className="space-x-6 pb-7">

                                {/* Login by google */}
                                <button onClick={loginWithGoogle} className="shadow-xl btn btn-ghost p-2 text-18px primary-color theme-sec hover:text-[#E3FEF7] hover:bg-[#003C43] rounded-lg "> <FcGoogle /> Login with Google</button>
                            </section>
                        </div>



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

