import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import revenueImage1 from '../../assets/revenue-image2.png';
import revenueImage2 from '../../assets/Investing 1.png';
import revenueImage3 from '../../assets/rag-doll-pointing-with-stick-one-bar-graph.png';
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        padding: "20px",
    };

    const imageStyle = {
        maxWidth: "100%",
        maxHeight: "50%",
        objectFit: "cover",
        borderRadius: "10px",
        marginBottom: "20px",
    };

    const textContainerStyle = {
        width: "100%",
        padding: "10px",
        textAlign: "center",
    };

    const buttonStyle = {
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#2E236C",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s",
        maxWidth: "200px",
        margin: "0 auto",
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
                    <img className='shadow-black' src={revenueImage1} alt="Revenue Illustration 1" style={imageStyle} />
                    <div style={textContainerStyle}>
                        <h2 className='text-2xl md:text-4xl font-bold text-black'>
                            Accounting Platform for <br />Growing Businesses
                        </h2>
                        <p className='text-base md:text-lg text-black mt-4'>
                            Our platform streamlines your accounting processes, making it easier<br /> for you to manage your finances efficiently.
                        </p>
                        <button style={buttonStyle} onClick={handleButtonClick}>Get Started</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={slideStyle}>
                    <img src={revenueImage2} alt="Revenue Illustration 2" style={imageStyle} />
                    <div style={textContainerStyle}>
                        <h2 className='text-2xl md:text-4xl font-bold text-black'>
                            Take Control of Your <br /> Financial Future
                        </h2>
                        <p className='text-base md:text-lg text-black mt-4'>
                            Empower your business with tools that help you track spending, analyze<br /> cash flow, and forecast profits with confidence.
                        </p>
                        <button style={buttonStyle} onClick={handleButtonClick}>Learn More</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={slideStyle}>
                    <img src={revenueImage3} alt="Revenue Illustration 3" style={imageStyle} />
                    <div style={textContainerStyle}>
                        <h2 className='text-2xl md:text-4xl font-bold text-black'>
                            Simplify Your Financial<br /> Management
                        </h2>
                        <p className='text-base md:text-lg text-black mt-4'>
                            We help businesses stand out in crowded markets. When customers have a<br /> positive experience with a brand, they are more likely to remember it.
                        </p>
                        <button style={buttonStyle} onClick={handleButtonClick}>Discover More</button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
