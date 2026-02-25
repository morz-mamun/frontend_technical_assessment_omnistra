'use client';

import { motion } from 'motion/react';
import React from 'react';
import { IntegrationCard } from './IntegrationCard';

export function IntegrationsSection() {
    const absoluteCards = [
        { size: 'md', position: { top: '15%', left: '15%' }, delay: 0 },
        { size: 'lg', position: { top: '10%', right: '20%' }, delay: 1.5 },
        { size: 'sm', position: { top: '35%', left: '8%' }, delay: 0.8 },
        { size: 'sm', position: { bottom: '40%', left: '18%' }, delay: 2.1 },
        { size: 'lg', position: { bottom: '15%', left: '25%' }, delay: 0.5 },
        { size: 'md', position: { bottom: '25%', right: '15%' }, delay: 1.2 },
        { size: 'sm', position: { top: '45%', right: '10%' }, delay: 0.3 },
        { size: 'lg', position: { bottom: '10%', right: '35%' }, delay: 2.5 },
    ];

    return (
        <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#eef4fd_0%,#dce8f8_50%,#eef4fd_100%)] py-32 text-center">

            {/* Edge Gradients for fading effect */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#eef4fd] to-transparent z-10 hidden md:block" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#eef4fd] to-transparent z-10 hidden md:block" />

            {/* Desktop Floating Cards (Absolute) */}
            <div className="absolute inset-0 max-w-7xl mx-auto w-full hidden lg:block pointer-events-none z-0">
                {absoluteCards.map((card, i) => (
                    <div className="pointer-events-auto" key={i}>
                        <IntegrationCard
                            size={card.size as 'sm' | 'md' | 'lg'}
                            position={card.position}
                            floatDelay={card.delay}
                        >
                            {/* Optional SVG placeholder for some cards */}
                            {i === 1 && <svg width="40" height="40" viewBox="0 0 24 24" fill="#00a1e0"><path d="M... (Salesforce icon here) " /></svg>}
                            {i === 4 && <div className="text-xl font-black text-blue-600">NICE</div>}
                            {i !== 1 && i !== 4 && <div className="w-8 h-8 rounded-full bg-gray-100" />}
                        </IntegrationCard>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="relative z-20 max-w-3xl px-6 flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#041031] tracking-tight leading-tight mb-10 whitespace-pre-wrap"
                >
                    {`One platform,\nunlimited integrations`}
                </motion.h2>

                <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-[#1E5AF1] hover:bg-[#1A4ED6] text-white px-8 py-3.5 rounded-full text-[15px] font-semibold tracking-wide transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30 flex items-center gap-2"
                >
                    View all integrations <span>→</span>
                </motion.button>
            </div>

            {/* Mobile/Tablet Stacked Grid Fallback */}
            <div className="lg:hidden relative z-20 mt-20 grid grid-cols-3 sm:grid-cols-4 gap-6 px-6">
                {absoluteCards.slice(0, 6).map((card, i) => (
                    <IntegrationCard
                        key={i}
                        size={card.size as 'sm' | 'md' | 'lg'}
                        floatDelay={card.delay}
                    >
                        {i === 1 && <div className="w-8 h-8 bg-blue-500 rounded-md" />}
                        {i === 4 && <div className="text-sm font-black text-blue-600">NICE</div>}
                        {i !== 1 && i !== 4 && <div className="w-6 h-6 rounded-full bg-gray-100" />}
                    </IntegrationCard>
                ))}
            </div>

        </section>
    );
}
