'use client';
import { IoMdArrowForward } from "react-icons/io";

import { useLoader } from '@/app/context/LoaderContext';

interface TransitionButtonProps {
    text: React.ReactNode;
    url: string;
    className?: string;
    arrow?: boolean;
    icon?: any;
    scroll?: boolean;
}

const TransitionButton = ({ text, url, className, arrow, icon, scroll = true }: TransitionButtonProps) => {
    const { transitionTo } = useLoader();

    const handleClick = () => {
        transitionTo(url, { scroll });
    };

    return (
        <button className={className} onClick={handleClick}>
            {text}
            {arrow && <IoMdArrowForward className='arrow-button' />}
            {icon && icon}
        </button>
    );
};

export default TransitionButton;