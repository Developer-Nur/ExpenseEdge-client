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
        position: 'relative', // Set position to relative
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const imageStyle = {
        position: 'absolute', // Position image absolutely
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2))', // Gradient overlay
        zIndex: 1,
    };

    const textContainerStyle = {
        position: 'relative', // Keep the text on top of the image
        zIndex: 2, // Ensure text is above the overlay
        textAlign: "center",
        padding: "20px",
        color: "white", // Change text color for better visibility
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        height: "100%", // Make the container full height
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
        margin: "20px auto 0", // Set margin for top and bottom
    };

    // Handle button click
    const handleButtonClick = () => {
        if (user) {
            // If the user is logged in, navigate to the dashboard
            navigate('/dashboard/CompanyDashboard');
        } else {
            // If the user is not logged in, navigate to the login page
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
                    <div style={overlayStyle}></div> {/* Gradient overlay */}
                    <div style={textContainerStyle}>
                        <h2 className='text-4xl md:text-6xl font-bold' style={{ color: "white" }}>
                            Accounting Platform for <br />Growing Businesses
                        </h2>
                        <p className='text-base md:text-lg mt-4' style={{ color: "white" }}>
                            Our platform streamlines your accounting processes, making it easier<br /> for you to manage your finances efficiently.
                        </p>
                        <button style={{ ...buttonStyle, marginTop: "40px" }} onClick={handleButtonClick}>Get Started</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={slideStyle}>
                    <img className='shadow-lg' src={revenueImage2} alt="Revenue Illustration 2" style={imageStyle} />
                    <div style={overlayStyle}></div> {/* Gradient overlay */}
                    <div style={textContainerStyle}>
                        <h2 className='text-4xl md:text-6xl font-bold' style={{ color: "white" }}>
                            Take Control of Your <br /> Financial Future
                        </h2>
                        <p className='text-base md:text-lg mt-4' style={{ color: "white" }}>
                            Empower your business with tools that help you track spending, analyze<br /> cash flow, and forecast profits with confidence.
                        </p>
                        <button style={{ ...buttonStyle, marginTop: "40px" }} onClick={handleButtonClick}>Learn More</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={slideStyle}>
                    <img className='shadow-lg' src={revenueImage3} alt="Revenue Illustration 3" style={imageStyle} />
                    <div style={overlayStyle}></div> {/* Gradient overlay */}
                    <div style={textContainerStyle}>
                        <h2 className='text-4xl md:text-6xl font-bold' style={{ color: "white" }}>
                            Simplify Your Financial<br /> Management
                        </h2>
                        <p className='text-base md:text-lg mt-4' style={{ color: "white" }}>
                            We help businesses stand out in crowded markets. When customers have a<br /> positive experience with a brand, they are more likely to remember it.
                        </p>
                        <button style={{ ...buttonStyle, marginTop: "40px" }} onClick={handleButtonClick}>Discover More</button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
