import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import revenueImage1 from '../../assets/newRevenue3.jpg';
import revenueImage2 from '../../assets/newRevenue1.jpg';
import revenueImage3 from '../../assets/newRevenue2.jpg';
import { AuthInfo } from '../../Provider/Authprovider'; // Import the context

import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router

const Banner = () => {
    const { user } = useContext(AuthInfo); // Access the user context
    const navigate = useNavigate(); // For navigation

    const sliderStyle = {
        width: "100%",
        height: "100vh",
    };

    const slideStyle = {
        position: 'relative',
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const imageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover", // Maintains aspect ratio and covers the area
        maxHeight: "100vh", // Limits height to prevent overflow on small screens
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2))',
        zIndex: 1,
    };

    const textContainerStyle = {
        position: 'relative',
        zIndex: 2,
        textAlign: "center",
        padding: "20px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#2E236C",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s",
        maxWidth: "200px",
        marginTop: "20px", // Ensure space above the button
    };

    const handleButtonClick = () => {
        if (user) {
            navigate('/dashboard/CompanyDashboard');
        } else {
            navigate('/Login');
        }
    };

    return (
        <div
            className='flex flex-col'
            style={{
                background: 'linear-gradient(to right, #BB9AB1, #A594F9)',
                height: "100vh",
            }}
        >
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{ delay: 2000 }}
                loop={true}
                navigation={true}
                pagination={{ clickable: true }}
                style={sliderStyle}
                className="w-full h-full"
                slidesPerView={1}
            >
                <SwiperSlide style={slideStyle}>
                    <img className='shadow-lg' src={revenueImage1} alt="Revenue Illustration 1" style={imageStyle} />
                    <div style={overlayStyle}></div>
                    <div style={textContainerStyle}>
                        <h2 className='text-4xl md:text-6xl font-bold' style={{ color: "white" }}>
                            Accounting Platform for Growing Businesses
                        </h2>
                        <p className='text-base md:text-lg mt-4' style={{ color: "white" }}>
                            Our platform streamlines your accounting processes, making it easier for you to manage your finances efficiently.
                        </p>
                        <button style={buttonStyle} onClick={handleButtonClick}>Get Started</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={slideStyle}>
                    <img className='shadow-lg' src={revenueImage2} alt="Revenue Illustration 2" style={imageStyle} />
                    <div style={overlayStyle}></div>
                    <div style={textContainerStyle}>
                        <h2 className='text-4xl md:text-6xl font-bold' style={{ color: "white" }}>
                            Take Control of Your Financial Future
                        </h2>
                        <p className='text-base md:text-lg mt-4' style={{ color: "white" }}>
                            Empower your business with tools that help you track spending, analyze cash flow, and forecast profits with confidence.
                        </p>
                        <button style={buttonStyle} onClick={handleButtonClick}>Learn More</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={slideStyle}>
                    <img className='shadow-lg' src={revenueImage3} alt="Revenue Illustration 3" style={imageStyle} />
                    <div style={overlayStyle}></div>
                    <div style={textContainerStyle}>
                        <h2 className='text-4xl md:text-6xl font-bold' style={{ color: "white" }}>
                            Simplify Your Financial Management
                        </h2>
                        <p className='text-base md:text-lg mt-4' style={{ color: "white" }}>
                            We help businesses stand out in crowded markets. When customers have a positive experience with a brand, they are more likely to remember it.
                        </p>
                        <button style={buttonStyle} onClick={handleButtonClick}>Discover More</button>
                    </div>
                </SwiperSlide>
            </Swiper>

            {/* Responsive CSS styles */}
            <style>{`
                @media (max-width: 768px) {
                    h2 {
                        font-size: 2.5rem; // Adjusts for smaller screens
                    }
                    p {
                        font-size: 1rem; // Adjusts for smaller screens
                    }
                    button {
                        font-size: 14px; // Adjusts for button font size
                    }
                }

                @media (max-width: 480px) {
                    h2 {
                        font-size: 2rem; // Further adjusts for extra small screens
                    }
                    p {
                        font-size: 0.9rem; // Further adjusts for extra small screens
                    }
                }
            `}</style>
        </div>
    );
};

export default Banner;
