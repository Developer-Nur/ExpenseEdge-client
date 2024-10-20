import { useState } from "react";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (event) => {
        event.preventDefault();
        if (email) {
            // Placeholder for subscription logic (e.g., sending to API)
            alert(`Subscribed with: ${email}`);
        } else {
            alert("Please enter a valid email.");
        }
    };

    return (
        <div>
            {/* Footer Section */}
            <footer className="footer bg-[#e9e4eb] text-[#2E236C] p-10">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover" href="#">Branding</a>
                    <a className="link link-hover" href="#">Design</a>
                    <a className="link link-hover" href="#">Marketing</a>
                    <a className="link link-hover" href="#">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover" href="aboutUs">About us</a>
                    <a className="link link-hover" href="contactUs">Contact</a>
                    <a className="link link-hover" href="#">Jobs</a>
                    <a className="link link-hover" href="#">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover" href="#">Terms of use</a>
                    <a className="link link-hover" href="#">Privacy policy</a>
                    <a className="link link-hover" href="#">Cookie policy</a>
                </nav>

                {/* Newsletter and Social Media */}
                <div className="md:place-self-center md:justify-self-end">
                    <form onSubmit={handleSubscribe}>
                        <h6 className="footer-title">Newsletter</h6>
                        <fieldset className="form-control w-80">
                            <label className="label">
                                <span className="label-text">Enter your email address</span>
                            </label>
                            <div className="join">
                                <input
                                    type="email"
                                    placeholder="Type here"
                                    className="input input-bordered join-item"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="btn bg-[#2E236C] hover:bg-sky-800 join-item text-white"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </fieldset>
                    </form>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4 mt-4">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.357c0-1.276-.023-2.919-1.778-2.919-1.779 0-2.051 1.389-2.051 2.827v5.449h-3v-10h2.877v1.368h.041c.4-.758 1.377-1.556 2.834-1.556 3.029 0 3.589 1.993 3.589 4.585v5.603z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>

            {/* Copyright Section */}
            <footer className="footer bg-[#cdb5cf] text-[#2E236C] items-center p-4 justify-center">
                <aside className="grid-flow-col text-center">
                    <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;
