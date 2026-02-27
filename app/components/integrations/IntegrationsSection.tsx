"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "motion/react";
import { Cloud, Share2, RefreshCw, Zap } from "lucide-react";

// x/y = percent position from top-left (card is centered on this point)
const NODES = [
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

// ─── Per-node card ─────────────────────────────────────────────────────────────

function IntegrationNode({
    node,
    smooth,
}: {
    node: (typeof NODES)[number];
    smooth: MotionValue<number>;
}) {
    const offsetX = 50 - node.x;
    const offsetY = 50 - node.y;

    // All action within 0 → 1 of a 200vh section
    // 0.00–0.15 : fade in
    // 0.15–0.65 : fly to center
    // 0.65–0.85 : shrink + fade (merge)
    const opacity = useTransform(smooth, [0, 0.12, 0.62, 0.82], [0, 1, 1, 0]);
    const scale = useTransform(smooth, [0.12, 0.60, 0.82], [1, 1.05, 0.08]);
    const x = useTransform(smooth, [0.15, 0.66], ["0vw", `${offsetX * 0.9}vw`]);
    const y = useTransform(smooth, [0.15, 0.66], ["0vh", `${offsetY * 0.9}vh`]);

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

function RippleRing({ smooth, offset }: { smooth: MotionValue<number>; offset: number }) {
    const s = 0.82 + offset;
    const opacity = useTransform(smooth, [s, s + 0.05, s + 0.15], [0, 0.65, 0]);
    const scale = useTransform(smooth, [s, s + 0.15], [1, 4.5]);
    return (
        <motion.div
            style={{ scale, opacity }}
            className="absolute w-28 h-28 rounded-3xl border-[1.5px] border-[#1E5AF1] pointer-events-none"
        />
    );
}

// ─── Section — only 200vh so full animation fits in ~1 viewport of scrolling ──

export default function IntegrationsSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Tight spring so motion closely tracks scroll
    const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const headlineOpacity = useTransform(smooth, [0, 0.08, 0.28], [1, 1, 0]);
    const headlineY = useTransform(smooth, [0.08, 0.28], ["0px", "-18px"]);

    const mergedOpacity = useTransform(smooth, [0.78, 0.88], [0, 1]);
    const mergedScale = useTransform(smooth, [0.78, 0.90], [0.3, 1]);
    const bgGlow = useTransform(smooth, [0.76, 0.92], [0, 1]);
    const bgFlash = useTransform(smooth, [0.76, 0.80, 0.86], [0, 0.18, 0]);

    return (
        <section
            ref={containerRef}
            className="relative bg-[#F8FAFF]"
            style={{ height: "200vh" }}   // ← 200vh = exactly one viewport of scrolling
        >
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                {/* Bloom */}
                <motion.div style={{ opacity: bgGlow }} className="absolute inset-0 pointer-events-none" aria-hidden>
                    <div
                        className="w-full h-full"
                        style={{ background: "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(30,90,241,0.13) 0%, transparent 70%)" }}
                    />
                </motion.div>

                {/* Flash */}
                <motion.div style={{ opacity: bgFlash }} className="absolute inset-0 bg-white pointer-events-none z-40" aria-hidden />

                {/* Headline */}
                <motion.div
                    style={{ opacity: headlineOpacity, y: headlineY }}
                    className="relative z-20 text-center select-none pointer-events-none"
                >
                    <p className="text-[#1E5AF1] text-xs font-bold tracking-[0.25em] uppercase mb-3">
                        Integrations
                    </p>
                    <h2 className="text-[#0B1528] font-semibold text-5xl tracking-tight leading-tight">
                        One platform,<br />unlimited integrations
                    </h2>
                    <p className="mt-4 text-[#64748B] text-lg max-w-sm mx-auto">
                        Connect every tool your team already loves.
                    </p>
                </motion.div>

                {/* Nodes */}
                <div className="absolute inset-0 z-10">
                    {NODES.map((node) => (
                        <IntegrationNode key={node.id} node={node} smooth={smooth} />
                    ))}
                </div>

                {/* Merged icon */}
                <motion.div
                    style={{
                        scale: mergedScale,
                        opacity: mergedOpacity,
                        boxShadow: "0 0 80px 24px rgba(30,90,241,0.50)",
                    }}
                    className="absolute z-30 w-28 h-28 bg-[#1E5AF1] rounded-3xl flex items-center justify-center"
                >
                    <Zap size={52} className="text-white" fill="white" />
                </motion.div>

                {/* Ripples */}
                <RippleRing smooth={smooth} offset={0} />
                <RippleRing smooth={smooth} offset={0.04} />
                <RippleRing smooth={smooth} offset={0.08} />

            </div>
        </section>
    );
}