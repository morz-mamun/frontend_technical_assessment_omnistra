'use client';

import { motion } from 'motion/react';
import React from 'react';
import { IntegrationCard } from './IntegrationCard';
import { INTEGRATIONS } from './IntegrationLogos';

export function IntegrationsSection() {
    // Array of configuration for absolute positioning on desktop
    // We want a scattered, floating look around the center text
    const floatingCards = [
        { id: 0, size: 'xl' as const, position: { top: '15%', left: '10%' }, delay: 0, parallax: 1.2 },
        { id: 1, size: 'lg' as const, position: { top: '8%', left: '32%' }, delay: 1.5, parallax: 0.8 },
        { id: 2, size: 'md' as const, position: { top: '35%', left: '4%' }, delay: 0.8, parallax: 1.5 },
        { id: 3, size: 'lg' as const, position: { bottom: '30%', left: '18%' }, delay: 2.1, parallax: 1.0 },
        { id: 4, size: 'sm' as const, position: { bottom: '10%', left: '8%' }, delay: 0.5, parallax: 0.6 },
        { id: 5, size: 'md' as const, position: { bottom: '8%', left: '35%' }, delay: 1.2, parallax: 1.3 },

        { id: 6, size: 'lg' as const, position: { top: '12%', right: '15%' }, delay: 0.3, parallax: 0.9 },
        { id: 7, size: 'md' as const, position: { top: '32%', right: '5%' }, delay: 1.8, parallax: 1.4 },
        { id: 8, size: 'xl' as const, position: { top: '48%', right: '22%' }, delay: 2.5, parallax: 1.1 },
        { id: 9, size: 'sm' as const, position: { bottom: '25%', right: '8%' }, delay: 0.9, parallax: 0.7 },
        { id: 10, size: 'lg' as const, position: { bottom: '8%', right: '30%' }, delay: 1.6, parallax: 1.2 },
        { id: 11, size: 'md' as const, position: { bottom: '5%', right: '12%' }, delay: 2.2, parallax: 0.5 },
    ];

    return (
        <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f0f5ff_50%,#ffffff_100%)] py-24 md:py-40 text-center">

            {/* Subtle radial glow in center */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_60%)] pointer-events-none" />

            {/* Desktop Floating Cards */}
            <div className="absolute inset-0 max-w-[1400px] mx-auto w-full h-full pointer-events-none z-0">
                {floatingCards.map((config, index) => {
                    // Make sure we have enough integrations, cycle if needed
                    const integration = INTEGRATIONS[index % INTEGRATIONS.length];
                    return (
                        <div className="pointer-events-auto" key={`float-${index}`}>
                            <IntegrationCard
                                size={config.size}
                                position={config.position}
                                floatDelay={config.delay}
                                parallaxFactor={config.parallax}
                            >
                                {integration.logo}
                            </IntegrationCard>
                        </div>
                    );
                })}
            </div>

            {/* Main Content Area */}
            <div className="relative z-20 max-w-3xl px-6 flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-5xl lg:text-[64px] font-bold text-[#0B1528] tracking-tight leading-[1.1] mb-8"
                >
                    One platform,
                    <br />
                    unlimited integrations
                </motion.h2>

                <motion.a
                    href="#"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 bg-white text-[#0B1528] px-8 py-4 rounded-full text-[15px] font-semibold transition-all duration-300 shadow-[0_4px_14px_0_rgb(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 border border-slate-200"
                >
                    View all integrations
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-blue-600 transition-transform group-hover:translate-x-0.5">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.a>
            </div>

            {/* Mobile/Tablet Stacked Grid Fallback */}
            {/* Displaying on small screens since absolute positioning is hidden */}
            <div className="md:hidden relative z-20 mt-16 w-full px-6 max-w-md mx-auto">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center">
                    {INTEGRATIONS.map((integration, i) => (
                        <motion.div
                            key={`grid-${i}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                        >
                            <IntegrationCard
                                size="md"
                                floatDelay={i * 0.2}
                                parallaxFactor={0} // Disable parallax on mobile grid
                            >
                                {integration.logo}
                            </IntegrationCard>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
}
