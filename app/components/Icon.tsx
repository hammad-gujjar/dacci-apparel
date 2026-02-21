'use client';
import React from 'react';
import { cn } from '@/lib/utils';

export type IconName = 'login' | 'search' | 'shopping-bag' | 'user' | 'menu' | 'arrow' | 'chevron' | 'close';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
    className?: string;
    strokeWidth?: number;
    fill?: string;
}

const iconPaths: Record<IconName, React.ReactNode> = {
    'login': (
        <>
            <path d="M2 12H14.88" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.65 8.65039L16 12.0004L12.65 15.3504" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21.5 13V15.26C21.5 19.73 19.71 21.52 15.24 21.52H15.11C11.09 21.52 9.24 20.07 8.91 16.53" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.89999 7.56023C9.20999 3.96023 11.06 2.49023 15.11 2.49023H15.24C19.71 2.49023 21.5 4.28023 21.5 8.75023" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    'search': (
        <>
            <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 22L20 20" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    'shopping-bag': (
        <>
            <path d="M8.40002 6.5H15.6C19 6.5 19.34 8.09 19.57 10.03L20.47 17.53C20.76 19.99 20 22 16.5 22H7.51003C4.00003 22 3.24002 19.99 3.54002 17.53L4.44003 10.03C4.66003 8.09 5.00002 6.5 8.40002 6.5Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 8V4.5C8 3 9 2 10.5 2H13.5C15 2 16 3 16 4.5V8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.41 17.0293H8" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    'user': (
        <>
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    'menu': (
        <>
            <path d="M3 7H21" strokeLinecap="round" />
            {/* <path d="M3 12H21" strokeLinecap="round" /> */}
            <path d="M3 17H21" strokeLinecap="round" />
        </>
    ),
    'arrow': (
        <>
            <path d="M14.4302 5.92969L20.5002 11.9997L14.4302 18.0697" stroke="#000000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3.5 12H20.33" stroke="#000000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </>
    ),
    'chevron': (
        <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round" />
    ),
    'close': (
        <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
    )
};

const Icon = ({ name, className, strokeWidth = 1, fill, ...props }: IconProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill || 'none'}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className={cn("w-4 h-4 md:w-5 md:h-5", className)}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {iconPaths[name]}
        </svg>
    );
};

export default Icon;