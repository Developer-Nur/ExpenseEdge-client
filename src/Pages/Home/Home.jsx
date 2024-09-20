import React from 'react';
import Form from '../../Components/Form/Form';
import Reports from '../../Components/Reports/Reports';
import Testimonial from '../../Components/Testimonial/Testimonial';
import Partner from '../../Components/Partners/Partners';
import Features from '../../Components/Features/Features';


const Home = () => {
    return (
        <div>
            <Form></Form>
            <Reports></Reports>
            <Testimonial></Testimonial>
            <Partner></Partner>
            <Features></Features>
        </div>
    );
};

export default Home;