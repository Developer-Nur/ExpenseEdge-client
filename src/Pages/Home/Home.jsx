import React from 'react';
import Form from '../../Components/Form/Form';
import Reports from '../../Components/Reports/Reports';
import Partner from '../../Components/Partners/Partners';
import Features from '../../Components/Features/Features';


const Home = () => {
    return (
        <div>
            <Form></Form>
            <Reports></Reports>
            <Partner></Partner>
            <Features></Features>
        </div>
    );
};

export default Home;