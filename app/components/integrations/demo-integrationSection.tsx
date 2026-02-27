"use client";

import React, { useRef, useEffect, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useAnimationFrame,
    MotionValue,
} from "motion/react";
import { Cloud, Share2, RefreshCw, Zap, ArrowRight } from "lucide-react";

// ─── Scroll-animated nodes (first section) ───────────────────────────────────

const SCROLL_NODES = [
    {
        id: "nice",
        icon: (
            <span className="font-extrabold text-black text-xl tracking-tighter">
                NICE<sup className="text-[9px] bg-black text-white px-0.5 rounded-full ml-0.5">®</sup>
            </span>
        ),
        x: 10, y: 10, size: 96,
    },
    {
        id: "salesforce",
        icon: <Cloud strokeWidth={1} size={44} className="text-[#00A1E0] fill-[#00A1E0]" />,
        x: 18, y: 50, size: 88,
    },
    {
        id: "p",
        icon: <span className="font-extrabold text-[#F38622] text-4xl italic">P</span>,
        x: 12, y: 82, size: 88,
    },
    {
        id: "e",
        icon: (
            <div className="rounded-full bg-[#00C193] w-11 h-11 flex items-center justify-center text-white font-bold text-xl">
                e
            </div>
        ),
        x: 25, y: 28, size: 80,
    },
    {
        id: "share",
        icon: <Share2 strokeWidth={1} size={38} className="text-[#6588A6]" />,
        x: 38, y: 12, size: 88,
    },
    {
        id: "cloud2",
        icon: <Cloud strokeWidth={1.5} size={30} className="text-[#F15D22]" />,
        x: 63, y: 10, size: 88,
    },
    {
        id: "dots",
        icon: (
            <div className="grid grid-cols-3 gap-[5px]">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-[#F15D22] rounded-full" />
                ))}
            </div>
        ),
        x: 85, y: 8, size: 88,
    },
    {
        id: "blue",
        icon: <div className="rounded-full bg-[#0055A5] w-11 h-11" />,
        x: 82, y: 32, size: 88,
    },
    {
        id: "fiserv",
        icon: <div className="rounded-full bg-[#FF6A00] w-16 h-16" />,
        x: 50, y: 88, size: 88,
    },
    {
        id: "refresh",
        icon: <RefreshCw strokeWidth={1.5} size={38} className="text-[#FF5C35]" />,
        x: 83, y: 80, size: 88,
    },
] as const;

function ScrollNode({
    node,
    smooth,
}: {
    node: (typeof SCROLL_NODES)[number];
    smooth: MotionValue<number>;
}) {
    const offsetX = 50 - node.x;
    const offsetY = 50 - node.y;
    const opacity = useTransform(smooth, [0, 0.08, 0.41, 0.55], [1, 1, 1, 0]);
    const scale = useTransform(smooth, [0.08, 0.40, 0.55], [1, 1.05, 0.08]);
    const x = useTransform(smooth, [0.10, 0.44], ["0vw", `${offsetX * 0.9}vw`]);
    const y = useTransform(smooth, [0.10, 0.44], ["0vh", `${offsetY * 0.9}vh`]);

    return (
        <motion.div
            style={{
                position: "absolute",
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: node.size,
                height: node.size,
                marginLeft: -(node.size / 2),
                marginTop: -(node.size / 2),
                x, y, scale, opacity,
            }}
            className="flex items-center justify-center bg-white rounded-2xl shadow-lg border border-[#E8EEF8]"
        >
            {node.icon}
        </motion.div>
    );
}

// ─── Orbital section logos ────────────────────────────────────────────────────

const SalesforceLogo = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-7 h-7">
        <path d="M26.7 14.3a10.5 10.5 0 0 1 7.5-3.1c3.9 0 7.3 2 9.2 5a12.3 12.3 0 0 1 4.6-.9c6.6 0 12 5.4 12 12s-5.4 12-12 12H17a9 9 0 0 1-9-9 9 9 0 0 1 7.7-8.9 10.5 10.5 0 0 1 11-7.1z" fill="#00A1E0" />
    </svg>
);
const NiceLogo = () => (
    <span style={{ fontFamily: "'Georgia', serif", fontWeight: 900, fontSize: 13, color: "#fff", letterSpacing: "-0.5px" }}>NICE</span>
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
        <circle cx="22" cy="22" r="6" fill="white" /><circle cx="42" cy="22" r="6" fill="white" />
        <circle cx="22" cy="42" r="6" fill="white" /><circle cx="42" cy="42" r="6" fill="white" />
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

// ─── Orbital nodes config ─────────────────────────────────────────────────────

interface OrbitalNode {
    id: string; label: string; icon: React.ReactNode;
    orbit: number; angle: number; speed: number; color: string; size: number;
}

const ORBIT_RADII = [130, 220, 310];

const ORBITAL_NODES: OrbitalNode[] = [
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

function BeamLine({ x, y, active }: { x: number; y: number; active: boolean }) {
    return (
        <line x1="0" y1="0" x2={x} y2={y}
            stroke={active ? "rgba(99,179,237,0.5)" : "rgba(99,179,237,0.12)"}
            strokeWidth={active ? 1.5 : 0.8}
            strokeDasharray="4 6"
            style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
        />
    );
}

function OrbitalDiagram() {
    const [angles, setAngles] = useState<Record<string, number>>(() =>
        Object.fromEntries(ORBITAL_NODES.map((n) => [n.id, (n.angle * Math.PI) / 180]))
    );
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [pulseId, setPulseId] = useState<string | null>(null);

    useAnimationFrame((_t, delta) => {
        const dt = delta / 1000;
        setAngles((prev) => {
            const next = { ...prev };
            ORBITAL_NODES.forEach((n) => { next[n.id] = prev[n.id] + n.speed * dt; });
            return next;
        });
    });

    useEffect(() => {
        const ids = ORBITAL_NODES.map((n) => n.id);
        const tick = () => {
            setPulseId(ids[Math.floor(Math.random() * ids.length)]);
            setTimeout(() => setPulseId(null), 800);
        };
        const interval = setInterval(tick, 1200);
        return () => clearInterval(interval);
    }, []);

    const W = 700; const H = 680; const cx = W / 2; const cy = H / 2;

    return (
        <div className="relative" style={{ width: W, maxWidth: "100vw", height: H }}>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
                <defs>
                    <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#1d4ed8" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
                    </radialGradient>
                    <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="center-filter" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {ORBIT_RADII.map((r, i) => (
                    <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                        stroke="#63b3ed" strokeWidth="1"
                        strokeOpacity={0.12 + i * 0.04} strokeDasharray="3 8"
                    />
                ))}

                <g transform={`translate(${cx},${cy})`}>
                    {ORBITAL_NODES.map((node) => {
                        const r = ORBIT_RADII[node.orbit];
                        const a = angles[node.id] ?? 0;
                        return <BeamLine key={node.id} x={Math.cos(a) * r} y={Math.sin(a) * r}
                            active={hoveredId === node.id || pulseId === node.id} />;
                    })}
                </g>

                <circle cx={cx} cy={cy} r={72} fill="url(#center-glow)" filter="url(#center-filter)" />
                <circle cx={cx} cy={cy} r={40} fill="#1a3a8f" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.6" />
                <circle cx={cx} cy={cy} r={52} fill="none" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 4" />

                {ORBITAL_NODES.map((node) => {
                    const r = ORBIT_RADII[node.orbit];
                    const a = angles[node.id] ?? 0;
                    const nx = cx + Math.cos(a) * r;
                    const ny = cy + Math.sin(a) * r;
                    const s = node.size;
                    const isHovered = hoveredId === node.id;
                    return (
                        <g key={node.id} transform={`translate(${nx},${ny})`}>
                            {isHovered && <circle r={s / 2 + 8} fill="none" stroke={node.color} strokeWidth="1.5" strokeOpacity="0.5" />}
                            <foreignObject x={-s / 2} y={-s / 2} width={s} height={s}
                                style={{ overflow: "visible", cursor: "pointer" }}
                                onMouseEnter={() => setHoveredId(node.id)}
                                onMouseLeave={() => setHoveredId(null)}>
                                <div className="w-full h-full rounded-2xl flex items-center justify-center transition-all duration-300"
                                    style={{
                                        background: isHovered ? "rgba(255,255,255,0.14)" : "rgba(13,24,41,0.85)",
                                        border: `1px solid ${isHovered ? node.color + "88" : "rgba(99,179,237,0.18)"}`,
                                        backdropFilter: "blur(12px)",
                                        boxShadow: isHovered ? `0 0 20px ${node.color}44, inset 0 0 12px ${node.color}11` : "none",
                                        transform: isHovered ? "scale(1.12)" : "scale(1)",
                                    }}>
                                    {node.icon}
                                </div>
                            </foreignObject>
                            {isHovered && (
                                <text y={s / 2 + 18} textAnchor="middle" fill="white" fontSize="11"
                                    fontFamily="'Georgia', serif" opacity="0.85">{node.label}</text>
                            )}
                        </g>
                    );
                })}

                <g transform={`translate(${cx},${cy})`} filter="url(#node-glow)">
                    <text textAnchor="middle" dominantBaseline="middle" fontSize="28" fill="#93c5fd">⚡</text>
                </g>
            </svg>
        </div>
    );
}

// ─── Main combined component ──────────────────────────────────────────────────

export default function IntegrationsFull() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Scroll nodes
    const headlineOpacity = useTransform(smooth, [0, 0.08, 0.41, 0.53], [1, 1, 1, 0]);
    const headlineY = useTransform(smooth, [0.41, 0.53], ["0px", "-18px"]);
    const mergedOpacity = useTransform(smooth, [0.52, 0.60, 0.62, 0.68], [0, 1, 1, 0]);
    const mergedScale = useTransform(smooth, [0.52, 0.60, 0.62, 0.68], [0.3, 1, 1, 0.3]);
    const bgGlow = useTransform(smooth, [0.50, 0.62], [0, 1]);
    const bgFlash = useTransform(smooth, [0.50, 0.54, 0.60], [0, 0.18, 0]);

    // Bar: appears at center, shoots downward, then expands to fill screen
    const barWidth = useTransform(smooth, [0.60, 0.75, 0.90], ["8px", "100vw", "100vw"]);
    const barHeight = useTransform(smooth, [0.60, 0.73, 0.90], ["8px", "8px", "100vh"]);
    const barBorderRadius = useTransform(smooth, [0.60, 0.78, 0.90], ["50%", "16px", "0px"]);
    const barOpacity = useTransform(smooth, [0.58, 0.61], [0, 1]);
    const barY = useTransform(smooth, [0.60, 0.73], ["0vh", "40vh"]);

    // Once bar fills screen, fade it out to reveal orbital section
    const barRevealOpacity = useTransform(smooth, [0.88, 0.96], [1, 0]);

    // Orbital section fades in as bar fades out
    const orbitalOpacity = useTransform(smooth, [0.88, 0.98], [0, 1]);
    const orbitalScale = useTransform(smooth, [0.88, 0.98], [0.94, 1]);

    return (
        <section
            ref={containerRef}
            className="relative bg-[#F8FAFF]"
            style={{ height: "500vh" }}
        >
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                {/* ── Orbital section (underneath, revealed last) ── */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{
                        opacity: orbitalOpacity,
                        scale: orbitalScale,
                        background: "radial-gradient(ellipse 80% 70% at 50% 40%, #0d1829 0%, #060b14 100%)",
                    } as any}
                >
                    {/* Background grid */}
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: "linear-gradient(#63b3ed 1px, transparent 1px), linear-gradient(90deg, #63b3ed 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                    <div className="relative z-10 text-center mb-16">
                        <p className="text-[#63b3ed] text-xs font-semibold tracking-[0.3em] uppercase mb-4">Integrations</p>
                        <h2 className="text-white text-5xl font-semibold tracking-tight leading-tight mb-5"
                            style={{ fontFamily: "'Georgia', serif" }}>
                            One platform,<br />unlimited integrations
                        </h2>
                        <a href="#"
                            className="inline-flex items-center gap-2 text-[#63b3ed] text-sm font-medium border border-[#63b3ed33] rounded-full px-5 py-2.5 hover:border-[#63b3ed88] hover:bg-[#63b3ed11] transition-all">
                            View all integrations <ArrowRight size={14} />
                        </a>
                    </div>
                    <OrbitalDiagram />
                    <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                        style={{ background: "linear-gradient(to top, #060b14, transparent)" }} />
                </motion.div>

                {/* ── Blue bar (fades out after filling screen) ── */}
                <motion.div
                    aria-hidden
                    style={{
                        width: barWidth,
                        height: barHeight,
                        borderRadius: barBorderRadius,
                        opacity: barRevealOpacity,  // uses combined: appear + disappear
                        y: barY,
                        position: "absolute",
                        zIndex: 20,
                        background: "linear-gradient(135deg, #1E5AF1 0%, #0D3FBF 100%)",
                        boxShadow: "0 0 120px 40px rgba(30,90,241,0.35)",
                        left: "50%",
                        top: "50%",
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                />

                {/* ── Bloom ── */}
                <motion.div style={{ opacity: bgGlow }} className="absolute inset-0 z-10" aria-hidden>
                    <div className="w-full h-full"
                        style={{ background: "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(30,90,241,0.13) 0%, transparent 70%)" }} />
                </motion.div>

                {/* ── Flash ── */}
                <motion.div style={{ opacity: bgFlash }} className="absolute inset-0 bg-white z-40" aria-hidden />

                {/* ── Headline ── */}
                <motion.div style={{ opacity: headlineOpacity, y: headlineY }} className="relative z-50 text-center space-y-4">
                    <h2 className="text-[#0B1528] font-semibold text-5xl tracking-tight leading-tight">
                        One platform,<br />unlimited integrations
                    </h2>
                    <button className="group inline-flex items-center gap-3 bg-blue-600 text-white rounded-lg px-5 py-3 font-sans text-sm border-none relative overflow-hidden hover:ring-1 hover:ring-blue-600 pointer-events-auto cursor-pointer">
                        <span className="absolute inset-0 bg-white translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                        <span className="relative z-10 text-white group-hover:text-blue-600 transition-colors duration-500">View all integrations</span>
                        <span className="relative z-10 inline-flex items-center justify-center w-6 h-6 bg-white group-hover:bg-blue-600 rounded-full flex-shrink-0 transition-colors duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="14" height="14">
                                <path d="M 5.727 11.06 L 8.78 8 L 5.727 4.94 L 6.667 4 L 10.667 8 L 6.667 12 Z"
                                    className="fill-blue-600 group-hover:fill-white transition-colors duration-500" />
                            </svg>
                        </span>
                    </button>
                </motion.div>

                {/* ── Scroll nodes ── */}
                <div className="absolute inset-0 z-50 pointer-events-none">
                    {SCROLL_NODES.map((node) => (
                        <ScrollNode key={node.id} node={node} smooth={smooth} />
                    ))}
                </div>

                {/* ── Merged zap icon ── */}
                <motion.div
                    style={{ scale: mergedScale, opacity: mergedOpacity, boxShadow: "0 0 80px 24px rgba(30,90,241,0.50)" }}
                    className="absolute z-30 w-28 h-28 bg-[#1E5AF1] rounded-3xl flex items-center justify-center"
                >
                    <Zap size={52} className="text-white" fill="white" />
                </motion.div>

            </div>
        </section>
    );
}