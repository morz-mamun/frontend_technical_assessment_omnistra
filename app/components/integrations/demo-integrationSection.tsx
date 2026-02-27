"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimationFrame } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrbitalNode {
    id: string;
    label: string;
    icon: React.ReactNode;
    orbit: number;       // orbit ring index (0 = innermost)
    angle: number;       // starting angle in degrees
    speed: number;       // radians per second (positive = CCW, negative = CW)
    color: string;
    size: number;
}

// ─── Integration logos (SVG inline) ──────────────────────────────────────────

const SalesforceLogo = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-7 h-7">
        <path d="M26.7 14.3a10.5 10.5 0 0 1 7.5-3.1c3.9 0 7.3 2 9.2 5a12.3 12.3 0 0 1 4.6-.9c6.6 0 12 5.4 12 12s-5.4 12-12 12H17a9 9 0 0 1-9-9 9 9 0 0 1 7.7-8.9 10.5 10.5 0 0 1 11-7.1z" fill="#00A1E0" />
    </svg>
);

const NiceLogo = () => (
    <span style={{ fontFamily: "'Georgia', serif", fontWeight: 900, fontSize: 13, color: "#fff", letterSpacing: "-0.5px" }}>
        NICE
    </span>
);

const GenesysLogo = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-7 h-7">
        <circle cx="32" cy="32" r="28" fill="#FF4F1F" opacity="0.9" />
        <text x="32" y="38" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="serif">G</text>
    </svg>
);

const FiservLogo = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-7 h-7">
        <rect width="64" height="64" rx="10" fill="#FF6900" />
        <text x="32" y="42" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">fiserv</text>
    </svg>
);

const TwilioLogo = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-7 h-7">
        <circle cx="32" cy="32" r="30" fill="#F22F46" />
        <circle cx="22" cy="22" r="6" fill="white" />
        <circle cx="42" cy="22" r="6" fill="white" />
        <circle cx="22" cy="42" r="6" fill="white" />
        <circle cx="42" cy="42" r="6" fill="white" />
    </svg>
);

const ZendeskLogo = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-7 h-7">
        <circle cx="32" cy="32" r="30" fill="#03363D" />
        <text x="32" y="40" textAnchor="middle" fill="#00D4AA" fontSize="22" fontWeight="bold" fontFamily="serif">Z</text>
    </svg>
);

const AWSLogo = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-7 h-7">
        <text x="32" y="30" textAnchor="middle" fill="#FF9900" fontSize="11" fontWeight="bold" fontFamily="sans-serif">aws</text>
        <path d="M14 38 Q32 48 50 38" stroke="#FF9900" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
);

const ServiceNowLogo = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-7 h-7">
        <circle cx="32" cy="32" r="28" fill="#62D84E" />
        <text x="32" y="38" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">S</text>
    </svg>
);

const AvayaLogo = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-7 h-7">
        <circle cx="32" cy="32" r="28" fill="#CC0000" />
        <text x="32" y="38" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">AVAYA</text>
    </svg>
);

const MicrosoftLogo = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-7 h-7">
        <rect x="4" y="4" width="26" height="26" fill="#F25022" />
        <rect x="34" y="4" width="26" height="26" fill="#7FBA00" />
        <rect x="4" y="34" width="26" height="26" fill="#00A4EF" />
        <rect x="34" y="34" width="26" height="26" fill="#FFB900" />
    </svg>
);

// ─── Orbital configuration ────────────────────────────────────────────────────

const ORBIT_RADII = [130, 220, 310]; // px from center

const NODES: OrbitalNode[] = [
    { id: "salesforce", label: "Salesforce", icon: <SalesforceLogo />, orbit: 0, angle: 0, speed: 0.22, color: "#00A1E0", size: 56 },
    { id: "nice", label: "NICE", icon: <NiceLogo />, orbit: 0, angle: 120, speed: 0.22, color: "#FFFFFF", size: 56 },
    { id: "genesys", label: "Genesys", icon: <GenesysLogo />, orbit: 0, angle: 240, speed: 0.22, color: "#FF4F1F", size: 56 },

    { id: "fiserv", label: "Fiserv", icon: <FiservLogo />, orbit: 1, angle: 30, speed: -0.14, color: "#FF6900", size: 62 },
    { id: "twilio", label: "Twilio", icon: <TwilioLogo />, orbit: 1, angle: 120, speed: -0.14, color: "#F22F46", size: 62 },
    { id: "zendesk", label: "Zendesk", icon: <ZendeskLogo />, orbit: 1, angle: 210, speed: -0.14, color: "#03363D", size: 62 },
    { id: "avaya", label: "Avaya", icon: <AvayaLogo />, orbit: 1, angle: 300, speed: -0.14, color: "#CC0000", size: 62 },

    { id: "aws", label: "AWS", icon: <AWSLogo />, orbit: 2, angle: 60, speed: 0.09, color: "#FF9900", size: 66 },
    { id: "servicenow", label: "ServiceNow", icon: <ServiceNowLogo />, orbit: 2, angle: 180, speed: 0.09, color: "#62D84E", size: 66 },
    { id: "microsoft", label: "Microsoft", icon: <MicrosoftLogo />, orbit: 2, angle: 300, speed: 0.09, color: "#00A4EF", size: 66 },
];

// ─── Animated beam line between center and a node ────────────────────────────

function BeamLine({ x, y, active }: { x: number; y: number; active: boolean }) {
    return (
        <line
            x1="0" y1="0" x2={x} y2={y}
            stroke={active ? "rgba(99,179,237,0.5)" : "rgba(99,179,237,0.12)"}
            strokeWidth={active ? 1.5 : 0.8}
            strokeDasharray="4 6"
            style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
        />
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function IntegrationsSection() {
    const [angles, setAngles] = useState<Record<string, number>>(() =>
        Object.fromEntries(NODES.map((n) => [n.id, (n.angle * Math.PI) / 180]))
    );
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [pulseId, setPulseId] = useState<string | null>(null);
    const timeRef = useRef(0);

    // Animate orbital positions
    useAnimationFrame((t, delta) => {
        const dt = delta / 1000; // seconds
        setAngles((prev) => {
            const next = { ...prev };
            NODES.forEach((n) => {
                next[n.id] = prev[n.id] + n.speed * dt;
            });
            return next;
        });
    });

    // Randomly pulse a beam every few seconds
    useEffect(() => {
        const ids = NODES.map((n) => n.id);
        const tick = () => {
            setPulseId(ids[Math.floor(Math.random() * ids.length)]);
            setTimeout(() => setPulseId(null), 800);
        };
        const interval = setInterval(tick, 1200);
        return () => clearInterval(interval);
    }, []);

    // Canvas size (centered coords)
    const W = 700;
    const H = 680;
    const cx = W / 2;
    const cy = H / 2;

    return (
        <section
            className="relative flex flex-col items-center justify-center overflow-hidden py-24 px-6"
            style={{
                background: "radial-gradient(ellipse 80% 70% at 50% 40%, #0d1829 0%, #060b14 100%)",
                minHeight: "100vh",
            }}
        >
            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(#63b3ed 1px, transparent 1px), linear-gradient(90deg, #63b3ed 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Header text */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center mb-16"
            >
                <p className="text-[#63b3ed] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                    Integrations
                </p>
                <h2
                    className="text-white text-5xl font-semibold tracking-tight leading-tight mb-5"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    One platform,<br />unlimited integrations
                </h2>
                <motion.a
                    href="#"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 text-[#63b3ed] text-sm font-medium border border-[#63b3ed33] rounded-full px-5 py-2.5 hover:border-[#63b3ed88] hover:bg-[#63b3ed11] transition-all"
                >
                    View all integrations
                    <ArrowRight size={14} />
                </motion.a>
            </motion.div>

            {/* Orbital diagram */}
            <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
                style={{ width: W, maxWidth: "100vw", height: H }}
            >
                <svg
                    width={W}
                    height={H}
                    viewBox={`0 0 ${W} ${H}`}
                    className="absolute inset-0 w-full h-full"
                    style={{ overflow: "visible" }}
                >
                    <defs>
                        {/* Orbit ring gradient */}
                        {ORBIT_RADII.map((r, i) => (
                            <radialGradient key={i} id={`ring-grad-${i}`} cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#63b3ed" stopOpacity="0" />
                                <stop offset="100%" stopColor="#63b3ed" stopOpacity="0.18" />
                            </radialGradient>
                        ))}

                        {/* Center glow */}
                        <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                            <stop offset="60%" stopColor="#1d4ed8" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
                        </radialGradient>

                        {/* Node glow filter */}
                        <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <filter id="center-filter" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Orbit rings */}
                    {ORBIT_RADII.map((r, i) => (
                        <g key={i}>
                            {/* Dashed orbit path */}
                            <circle
                                cx={cx} cy={cy} r={r}
                                fill="none"
                                stroke="#63b3ed"
                                strokeWidth="1"
                                strokeOpacity={0.12 + i * 0.04}
                                strokeDasharray="3 8"
                            />
                        </g>
                    ))}

                    {/* Beam lines from center to each node */}
                    <g transform={`translate(${cx},${cy})`}>
                        {NODES.map((node) => {
                            const r = ORBIT_RADII[node.orbit];
                            const a = angles[node.id] ?? 0;
                            const nx = Math.cos(a) * r;
                            const ny = Math.sin(a) * r;
                            const isActive = hoveredId === node.id || pulseId === node.id;
                            return <BeamLine key={node.id} x={nx} y={ny} active={isActive} />;
                        })}
                    </g>

                    {/* Center hub glow */}
                    <circle cx={cx} cy={cy} r={72} fill="url(#center-glow)" filter="url(#center-filter)" />
                    <circle cx={cx} cy={cy} r={40} fill="#1a3a8f" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.6" />
                    <circle cx={cx} cy={cy} r={52} fill="none" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 4" />

                    {/* Nodes — drawn as foreignObject so we can use React/Tailwind */}
                    {NODES.map((node) => {
                        const r = ORBIT_RADII[node.orbit];
                        const a = angles[node.id] ?? 0;
                        const nx = cx + Math.cos(a) * r;
                        const ny = cy + Math.sin(a) * r;
                        const s = node.size;
                        const isHovered = hoveredId === node.id;

                        return (
                            <g key={node.id} transform={`translate(${nx},${ny})`}>
                                {/* Glow ring on hover */}
                                {isHovered && (
                                    <circle
                                        r={s / 2 + 8}
                                        fill="none"
                                        stroke={node.color}
                                        strokeWidth="1.5"
                                        strokeOpacity="0.5"
                                    />
                                )}
                                <foreignObject
                                    x={-s / 2}
                                    y={-s / 2}
                                    width={s}
                                    height={s}
                                    style={{ overflow: "visible", cursor: "pointer" }}
                                    onMouseEnter={() => setHoveredId(node.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <div
                                        className="w-full h-full rounded-2xl flex items-center justify-center transition-all duration-300"
                                        style={{
                                            background: isHovered
                                                ? "rgba(255,255,255,0.14)"
                                                : "rgba(13,24,41,0.85)",
                                            border: `1px solid ${isHovered ? node.color + "88" : "rgba(99,179,237,0.18)"}`,
                                            backdropFilter: "blur(12px)",
                                            boxShadow: isHovered
                                                ? `0 0 20px ${node.color}44, inset 0 0 12px ${node.color}11`
                                                : "none",
                                            transform: isHovered ? "scale(1.12)" : "scale(1)",
                                        }}
                                    >
                                        {node.icon}
                                    </div>
                                </foreignObject>

                                {/* Label on hover */}
                                {isHovered && (
                                    <text
                                        y={s / 2 + 18}
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="11"
                                        fontFamily="'Georgia', serif"
                                        opacity="0.85"
                                    >
                                        {node.label}
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {/* Center icon */}
                    <g transform={`translate(${cx},${cy})`} filter="url(#node-glow)">
                        <text textAnchor="middle" dominantBaseline="middle" fontSize="28" fill="#93c5fd">⚡</text>
                    </g>
                </svg>
            </motion.div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{ background: "linear-gradient(to top, #060b14, transparent)" }} />
        </section>
    );
}