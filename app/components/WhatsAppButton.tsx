'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const WhatsAppButton = () => {
    const phoneNumber = '923086762402';
    const message = encodeURIComponent('Hello! I would like to inquire about your premium clothing manufacturing services.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "fixed bottom-8 right-8 z-[9999] group flex items-center justify-center",
                "w-14 h-14 md:w-16 md:h-16",
                "bg-[#25D366] text-white rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.3)]",
                "transition-all duration-500 hover:scale-110 active:scale-95 hover:shadow-[0_12px_48px_rgba(37,211,102,0.5)]",
                "border border-white/20 backdrop-blur-sm"
            )}
            aria-label="Contact us on WhatsApp"
        >
            {/* Pulsing Ring Effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40" />
            
            <FaWhatsapp className="relative z-10 text-2xl md:text-3xl" />
            
            {/* Tooltip */}
            <span className="absolute right-full mr-4 px-4 py-2 bg-[#111111] text-[#EDEEE7] text-xs font-medium uppercase tracking-widest whitespace-nowrap rounded-md opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 pointer-events-none border border-white/10 shadow-2xl">
                Chat with us
            </span>
        </a>
    );
};

export default WhatsAppButton;
