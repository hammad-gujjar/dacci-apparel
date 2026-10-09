'use client';

import React from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { useLoader } from '@/app/context/LoaderContext';
import { cn } from '@/lib/utils';

interface TransitionButtonProps {
    text: React.ReactNode;
    url?: string;
    className?: string;
    arrow?: boolean;
    icon?: any;
    scroll?: boolean;
    rollingText?: boolean;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TransitionButton = ({
    text,
    url,
    className,
    arrow,
    icon,
    scroll = true,
    rollingText = false,
    type = 'button',
    disabled = false,
    onClick
}: TransitionButtonProps) => {
    const { transitionTo } = useLoader();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
            return;
        }
        if (url) {
            transitionTo(url, { scroll });
        }
    };

    const renderContent = () => {
        if (!rollingText || typeof text !== 'string') {
            return text;
        }

        return (
            <span className="relative inline-flex items-center overflow-hidden leading-tight">
                {text.split('').map((char, i) => (
                    <span
                        key={i}
                        className="relative inline-flex flex-col overflow-hidden"
                    >
                        {/* Primary character: rolls UP out of view on hover */}
                        <span
                            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full will-change-transform"
                            style={{ transitionDelay: `${i * 15}ms` }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                        {/* Duplicate character: rolls UP into view on hover */}
                        <span
                            className="absolute top-full left-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full will-change-transform"
                            style={{ transitionDelay: `${i * 15}ms` }}
                            aria-hidden="true"
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    </span>
                ))}
            </span>
        );
    };

    return (
        <button
            type={type}
            disabled={disabled}
            className={cn(rollingText && 'group select-none inline-flex items-center justify-center gap-2 whitespace-nowrap', className)}
            onClick={handleClick}
        >
            {renderContent()}
            {arrow && <IoMdArrowForward className='arrow-button shrink-0' />}
            {icon && <span className="shrink-0">{icon}</span>}
        </button>
    );
};

export default TransitionButton;