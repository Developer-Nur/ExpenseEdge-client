import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/bundle'; 
import 'swiper/css/pagination'; 
import 'swiper/css/navigation'; 

import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Import necessary Swiper modules

import revenueImage1 from '../../assets/revenue-image2.png'; 
import revenueImage2 from '../../assets/Investing 1.png';
import revenueImage3 from '../../assets/rag-doll-pointing-with-stick-one-bar-graph.png';

const Banner = () => {
    // Define styles for the Swiper and slides
    const sliderStyle = {
        width: "100%",
        height: "700px", 
    };

    const slideStyle = {
        display: "flex", // Use flexbox for side-by-side layout
        justifyContent: "center", 
        alignItems: "center", 
        height: "100%", 
        width: "100%", 
    };

    const imageStyle = {
        maxWidth: "600px", // Set a maximum width for the image
        maxHeight: "100%", 
        objectFit: "cover", 
        borderRadius: "10px 0 0 10px", 
    };

    const textContainerStyle = {
        flex: 1, // Allow the text container to take remaining space
        width: "100%", 
        padding: "20px", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        textAlign: "center", 
        height: "100%", 
    };

    const buttonStyle = {
        marginTop: "50px", // Increase space above the button for more separation
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

    const handleButtonClick = () => {
        // Define the action when the button is clicked
        alert('Button clicked!'); 
    };

    return (
        <div 
        className='flex flex-col lg:flex-row pb-10 lg:pb-0' 
        style={{
            background: 'linear-gradient(to right, #BB9AB1, #A594F9)' // Gradient from left (#BB9AB1) to right (#A594F9)
        }}
    >
            <Swiper
                modules={[Navigation, Pagination, Autoplay]} // Use the imported modules
                autoplay={{ delay: 2000 }} // Set autoplay delay
                loop={true} // Enable looping of slides
                navigation={true} // Enable navigation buttons
                pagination={{ clickable: true }} // Enable pagination
                style={sliderStyle} 
                className="w-full h-full" 
            >
                <SwiperSlide style={slideStyle}>
                    <div style={textContainerStyle}>
                        <h2 className='text-3xl md:text-4xl lg:text-6xl font-bold text-black'>
                            Comprehensive Accounting Platform for Growing Businesses
                        </h2>
                        <p className='text-lg text-black mt-8'>
                            Our platform streamlines your accounting processes, making it easier for you to manage your finances efficiently.
                        </p>
                        <button style={buttonStyle} onClick={handleButtonClick}>Get Started</button>
                    </div>
                    <img className='shadow-black' src={revenueImage1} alt="Revenue Illustration 1" style={imageStyle} />
                </SwiperSlide>
                <SwiperSlide style={slideStyle}>
                    <img src={revenueImage2} alt="Revenue Illustration 2" style={imageStyle} />
                    <div style={textContainerStyle}>
                        <h2 className='text-3xl md:text-4xl lg:text-6xl font-bold text-black'>
                            Take Control of Your <br></br> Financial Future
                        </h2>
                        <p className='text-lg text-black mt-8'>
                            Empower your business with tools that help you track spending, analyze cash flow, and forecast profits with confidence.
                        </p>
                        <button style={buttonStyle} onClick={handleButtonClick}>Learn More</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={slideStyle}>
                    <div style={textContainerStyle}>
                        <h2 className='text-3xl md:text-4xl lg:text-6xl font-bold text-black'>
                            Simplify Your Financial Management
                        </h2>
                        <p className='text-lg text-black mt-8'>
                            We help businesses stand out in crowded markets. When customers have a positive experience with a brand, they are more likely to remember it.
                        </p>
                        <button style={buttonStyle} onClick={handleButtonClick}>Discover More</button>
                    </div>
                    <img src={revenueImage3} alt="Revenue Illustration 3" style={imageStyle} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
