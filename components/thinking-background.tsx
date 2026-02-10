"use client";

import { motion } from "framer-motion";

export function ThinkingBackground() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {/* Orb 1: Logic (Blue-ish Tint) */}
            <motion.div
                className="absolute w-[60vh] h-[60vh] rounded-full bg-blue-300/20 blur-[100px] mix-blend-multiply"
                animate={{
                    x: ["-20%", "20%", "-20%"],
                    y: ["-20%", "10%", "-20%"],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    top: "10%",
                    left: "20%",
                }}
            />

            {/* Orb 2: Structure (Orange/Warm) */}
            <motion.div
                className="absolute w-[50vh] h-[50vh] rounded-full bg-orange-300/20 blur-[90px] mix-blend-multiply"
                animate={{
                    x: ["20%", "-10%", "20%"],
                    y: ["10%", "-20%", "10%"],
                    scale: [1.1, 0.9, 1.1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                style={{
                    bottom: "10%",
                    right: "10%",
                }}
            />

            {/* Orb 3: Creativity (Violet/Lavender) */}
            <motion.div
                className="absolute w-[45vh] h-[45vh] rounded-full bg-violet-300/20 blur-[80px] mix-blend-multiply"
                animate={{
                    x: ["-10%", "30%", "-10%"],
                    y: ["30%", "-10%", "30%"],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
                style={{
                    top: "40%",
                    left: "40%",
                }}
            />
        </div>
    );
}
