'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';

export function IntegrationCard({
    children,
    size,
    position,
    floatDelay
}: {
    children?: React.ReactNode;
    size: 'sm' | 'md' | 'lg';
    position?: React.CSSProperties;
    floatDelay: number
}) {
    const ref = useRef(null);

    // Minimal parallax effect mapping scroll progress to slight vertical shift
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

    const sizeClasses = {
        sm: 'w-16 h-16 rounded-[14px]',
        md: 'w-20 h-20 rounded-2xl',
        lg: 'w-24 h-24 rounded-3xl'
    };

    return (
        <motion.div
            ref={ref}
            style={{ ...position, y: position ? y : 0 }}
            className={`${position ? 'absolute' : 'relative'} bg-white flex items-center justify-center ${sizeClasses[size]} border border-[#e2e8f0] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] backdrop-blur-sm z-0`}
            animate={{ y: [0, -12, 0] }}
            transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: floatDelay
            }}
            whileHover={{
                scale: 1.08,
                zIndex: 10,
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                transition: { duration: 0.2 }
            }}
        >
            {children}
        </motion.div>
    );
}
