'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsScrolled(latest > 20);
    });

    const navLinks = [
        { name: 'PRODUCT', hasDropdown: true },
        { name: 'CUSTOMERS', hasDropdown: true },
        { name: 'PRICING', hasDropdown: false },
        { name: 'INTEGRATIONS', hasDropdown: false },
        { name: 'RESOURCES', hasDropdown: false },
        { name: 'COMPANY', hasDropdown: false },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4 transition-all duration-300`}
            >
                <div
                    className={`flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-500 ease-out ${isScrolled
                            ? 'bg-[#111111]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                            : 'bg-transparent border-transparent'
                        }`}
                >
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform group-hover:scale-105">
                            <rect x="2" y="4" width="20" height="16" rx="4" fill="currentColor" fillOpacity="0.2" className="text-blue-500" />
                            <path d="M12 8L16 12H13V16H11V12H8L12 8Z" fill="#1E5AF1" />
                        </svg>
                        <span className="font-semibold text-white tracking-tight text-lg">chargeflow</span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative py-2"
                                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                                onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
                            >
                                <button className={`text-[12px] font-semibold tracking-wider hover:text-white transition-colors duration-200 flex items-center gap-1.5 ${activeDropdown === link.name ? 'text-white' : 'text-zinc-300'}`}>
                                    {link.name}
                                    {link.hasDropdown && (
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : 'opacity-70'}`}>
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>

                                {/* Simple Dropdown Stub */}
                                {link.hasDropdown && (
                                    <AnimatePresence>
                                        {activeDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-2 bg-[#1C1C1E] border border-white/10 rounded-2xl shadow-xl"
                                            >
                                                <div className="p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                                                    <div className="text-sm font-medium text-white mb-1">Overview</div>
                                                    <div className="text-xs text-zinc-400">Learn about our core features</div>
                                                </div>
                                                <div className="p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                                                    <div className="text-sm font-medium text-white mb-1">Features</div>
                                                    <div className="text-xs text-zinc-400">Deep dive into capabilities</div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-6">
                        <div className="hidden lg:block">
                            <a href="#" className="text-[13px] font-semibold text-white/90 hover:text-white transition-colors">
                                SIGN IN <span className="text-blue-500 font-normal">→</span>
                            </a>
                        </div>
                        <button className="hidden lg:block bg-[#1E5AF1] hover:bg-[#1A4ED6] text-white px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all transform hover:scale-105 active:scale-95">
                            SCHEDULE A DEMO
                        </button>
                        <button
                            className="lg:hidden p-2 text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 px-6 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <div key={link.name} className="border-b border-white/10 pb-4">
                                    <div className="text-sm font-semibold text-white tracking-widest flex justify-between items-center">
                                        {link.name}
                                        {link.hasDropdown && (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M9 18l6-6-6-6" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="mt-8 flex flex-col gap-4">
                                <button className="bg-[#1E5AF1] text-white py-4 rounded-xl text-sm font-bold tracking-widest text-center">
                                    SCHEDULE A DEMO
                                </button>
                                <button className="text-white py-4 rounded-xl text-sm font-bold tracking-widest text-center border border-white/20">
                                    SIGN IN →
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
