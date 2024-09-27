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
            <ImSpinner10  className="animate-spin" size={100} color='#16423C' />
        </div>
    );
};

export default LoadingSpinner;