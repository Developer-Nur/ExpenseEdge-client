import React from 'react';
import { ImSpinner10 } from "react-icons/im";
const LoadingSpinner = ({ smallHeight }) => {
    return (
        <div
            className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
        flex 
        flex-col 
        justify-center 
        items-center `}
        >
            <ImSpinner10  className="animate-spin" size={100} color='#433D8B' />
        </div>
    );
};

export default LoadingSpinner;