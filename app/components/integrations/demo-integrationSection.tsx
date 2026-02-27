"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
    Activity,
    CreditCard,
    ShieldCheck,
    Settings,
    Globe,
    Zap,
    Bell,
    ShoppingCart
} from "lucide-react";

const BASE_INTEGRATIONS = [
    { name: "Stripe", icon: CreditCard, color: "#635BFF" },
    { name: "Shopify", icon: ShoppingCart, color: "#96BF48" },
    { name: "PayPal", icon: Globe, color: "#003087" },
    { name: "Adyen", icon: ShieldCheck, color: "#00FFD1" },
    { name: "Checkout", icon: Zap, color: "#00CCFF" },
    { name: "Braintree", icon: Settings, color: "#FFFFFF" },
    { name: "Authorize", icon: Activity, color: "#004B8D" },
    { name: "Square", icon: Bell, color: "#3E4347" },
    { name: "Visa", icon: Globe, color: "#1A1F71" },
    { name: "Mastercard", icon: CreditCard, color: "#EB001B" },
];

type IntegrationWithPos = (typeof BASE_INTEGRATIONS)[number] & {
    startX: number;
    startY: number;
};

function createRandomIntegrations(): IntegrationWithPos[] {
    return BASE_INTEGRATIONS.map((item) => ({
        ...item,
        startX: (Math.random() - 0.5) * 1000,
        startY: (Math.random() - 0.5) * 800,
    }));
}

const IntegrationsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // Same-length array every render so hook order is stable; positions filled in after mount
    const [integrations, setIntegrations] = useState<IntegrationWithPos[]>(() =>
        BASE_INTEGRATIONS.map((item) => ({ ...item, startX: 0, startY: 0 }))
    );

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        setIntegrations(createRandomIntegrations());
    }, []);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-black overflow-clip">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {/* Background Grid/Mesh */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,transparent_70%)]" />
                </div>

                {/* Central Hub - fades in as icons merge */}
                <motion.div
                    style={{
                        scale: useTransform(smoothProgress, [0, 0.4], [0.8, 1]),
                        opacity: useTransform(smoothProgress, [0, 0.05, 0.8, 1], [1, 1, 1, 0]),
                    }}
                    className="relative z-20 text-center"
                >
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                        Connectivity Ecosystem
                    </div>
                    <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9]">
                        One Platform<br />
                        <span className="text-blue-500">Unlimited</span><br />
                        Integrations
                    </h2>
                    <p className="mt-8 text-gray-500 text-sm max-w-[400px] mx-auto font-medium leading-relaxed uppercase tracking-wider">
                        We connect to your existing stack in seconds, creating a unified narrative for your financial data.
                    </p>
                </motion.div>

                {/* Central single icon - appears when others merge and disappear */}
                <motion.div
                    style={{
                        scale: useTransform(smoothProgress, [0.7, 0.9], [0, 1.2]),
                        opacity: useTransform(smoothProgress, [0.7, 0.85], [0, 1]),
                        left: "50%",
                        top: "50%",
                        marginLeft: "-40px",
                        marginTop: "-40px",
                    }}
                    className="absolute z-30 w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)] border border-blue-400/50"
                >
                    <Zap size={40} className="text-white" />
                </motion.div>

                {/* Integration Icons - random start, centralize then fade out */}
                <div className="absolute inset-0 pointer-events-none">
                    {integrations.map((item) => {
                        const scale = useTransform(smoothProgress, [0.1, 0.6, 0.8, 1], [0.5, 1, 1.1, 0]);
                        const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 0.9], [0, 1, 1, 0]);
                        const x = useTransform(smoothProgress, [0.1, 0.8], [item.startX, 0]);
                        const y = useTransform(smoothProgress, [0.1, 0.8], [item.startY, 0]);

                        return (
                            <motion.div
                                key={item.name}
                                style={{
                                    x,
                                    y,
                                    scale,
                                    opacity,
                                    left: "50%",
                                    top: "50%",
                                    marginLeft: "-32px",
                                    marginTop: "-32px",
                                }}
                                className="absolute z-10 p-4 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl"
                            >
                                <item.icon
                                    size={30}
                                    style={{ color: item.color }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
                <div className="w-[1px] h-12 bg-white/20" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Scroll to Connect</span>
            </div>
        </section>
    );
};

export default IntegrationsSection;
