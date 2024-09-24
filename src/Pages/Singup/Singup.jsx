import React, { useContext } from 'react';
import '../../index.css';
import { useForm } from "react-hook-form"
import { AuthInfo } from '../../Provider/Authprovider';

const Singup = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, logOut, googleSingin, setLoader } = useContext(AuthInfo)
    const onSubmit = (data) => console.log(data);

    // handle creating a user
    const handleRegisterUser = e => {
        e.preventDefault(); // Prevent default form behavior

        const email = e.target.email.value;
        const password = e.target.password.value;

        // console.log("user form data is ",email, password );

        createUser(email, password)
        .then()
        .catch()


    }

    return (
        <>
            <div className='py-20 md:py-28 text-center singup-bg'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl '>You can register your company or <br /> as a general user</h2>

                {/* registration separator */}
                <div className='space-x-2 md:space-x-5 mt-10'>


                    {/* company registration modal*/}

                    <button className="shadow-xl btn btn-ghost px-4 py-2 text-lg primary-color bg-white hover:text-[#E3FEF7] hover:bg-[#003C43] rounded-lg" onClick={() => document.getElementById('my_modal_3').showModal()}>Register Company</button>

                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">Register your Company </h3>

                            {/* company registration form*/}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* register your input into the hook by invoking the "register" function */}
                                <input defaultValue="test" {...register("example")} />

                                {/* include validation with required or other standard HTML validation rules */}
                                <input {...register("exampleRequired", { required: true })} />
                                {/* errors will return when field validation fails  */}
                                {errors.exampleRequired && <span>This field is required</span>}

                                <input type="submit" />
                            </form>
                        </div>
                    </dialog>

                    {/* general user registration */}

                    <button className="shadow-xl btn btn-ghost px-4 py-2 text-lg primary-color bg-white hover:text-[#E3FEF7] hover:bg-[#003C43] rounded-lg" onClick={() => document.getElementById('my_modal_5').showModal()}>Register as user</button>

                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">

                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Register as user</h3>

                            {/* user register form */}
                            <form onSubmit={handleRegisterUser} className="card-body  rounded-lg p-7">
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
                                    <button className='p-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#ffffff] section-bg hover:bg-[#135D66]'>Register</button>
                                </div>

                                {/* redirect to register */}
                            </form>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">✕</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>



            </div>
        </>
    );
};
export default Singup;
