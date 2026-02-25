'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';

export function IntegrationCard({
    children,
    size,
    position,
    floatDelay,
    parallaxFactor = 1,
}: {
    children?: React.ReactNode;
    size: 'sm' | 'md' | 'lg' | 'xl';
    position?: React.CSSProperties;
    floatDelay: number;
    parallaxFactor?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    // Parallax effect mapped to scroll progress
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Different cards move at different speeds for depth
    const y = useTransform(scrollYProgress, [0, 1], [60 * parallaxFactor, -60 * parallaxFactor]);

    const sizeClasses = {
        sm: 'w-14 h-14 md:w-16 md:h-16 rounded-[14px] md:rounded-2xl p-3',
        md: 'w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[20px] p-3.5 md:p-4',
        lg: 'w-20 h-20 md:w-24 md:h-24 rounded-[20px] md:rounded-3xl p-4 md:p-5',
        xl: 'w-24 h-24 md:w-28 md:h-28 rounded-3xl md:rounded-[28px] p-5 md:p-6',
    };

    return (
        <motion.div
            ref={ref}
            style={{ ...position, y: position ? y : 0 }}
            className={`
                ${position ? 'absolute hidden md:flex' : 'relative flex'} 
                bg-white items-center justify-center 
                ${sizeClasses[size]} 
                border-2 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]
                transition-shadow duration-300
                z-10
            `}
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: floatDelay
            }}
            whileHover={{
                scale: 1.05,
                zIndex: 40,
                transition: { duration: 0.2 }
            }}
        >
            {children}
        </motion.div>
    );
}
