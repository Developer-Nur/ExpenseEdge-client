import React from 'react';
import Reports from '../../Components/Reports/Reports';
import Testimonial from '../../Components/Testimonial/Testimonial';
import Partner from '../../Components/Partners/Partners';
import Features from '../../Components/Features/Features';
import Banner from '../../Components/Banner/Banner';
import ReportPage from '../ReportPage/ReportPage';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Reports></Reports>
            <Testimonial></Testimonial>
            <Partner></Partner>
            <Features></Features>
            {/* <ReportPage></ReportPage> */}
        </div>
    );
};

export default Home;