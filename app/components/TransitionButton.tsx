'use client';
import { IoMdArrowForward } from "react-icons/io";

import { useLoader } from '@/app/context/LoaderContext';

interface TransitionButtonProps {
    text: React.ReactNode;
    url: string;
    className?: string;
    arrow?: boolean;
}

const TransitionButton = ({ text, url, className, arrow }: TransitionButtonProps) => {
    const { transitionTo } = useLoader();

    const handleClick = () => {
        transitionTo(url);
    };

    return (
        <button className={className} onClick={handleClick}>
            {text}
            {arrow && <IoMdArrowForward className='arrow-button' />}
        </button>
    );
};

export default TransitionButton;
