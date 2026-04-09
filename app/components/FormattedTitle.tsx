import React from 'react';

interface FormattedTitleProps {
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
}

export default function FormattedTitle({ as: Component = 'span', children, className = '' }: FormattedTitleProps) {
    if (typeof children !== 'string') return <Component className={className}>{children}</Component>;
    
    // Split the text to capture numbers and special characters like %, &, ?, —, -, etc.
    const parts = children.split(/([0-9%&?+—\-/]+)/);
    
    return (
        <Component className={className}>
            {parts.map((p, i) => /[0-9%&?+—\-/]/.test(p) ? (
                <span key={i} className="font-[middle] font-medium tracking-normal">{p}</span>
            ) : p)}
        </Component>
    );
}
