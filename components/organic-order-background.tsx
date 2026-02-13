"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface OrganicOrderBackgroundProps {
    startAnimation?: boolean;
}

export function OrganicOrderBackground({ startAnimation = true }: OrganicOrderBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const startAnimationRef = useRef(startAnimation);

    // Update ref when prop changes
    useEffect(() => {
        startAnimationRef.current = startAnimation;
    }, [startAnimation]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Set canvas resolution
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        // Grid settings
        const gridSize = 60; // Distance between grid points
        const cols = Math.ceil(width / gridSize);
        const rows = Math.ceil(height / gridSize);

        // Particles
        const isSmallScreen = width < 768;
        const particleCount = isSmallScreen ? 50 : 120; // Reduced count for mobile
        const particles: {
            x: number;
            y: number;
            targetX: number | null;
            targetY: number | null;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
            state: "chaos" | "forming" | "growth";
            timer: number;
        }[] = [];

        // Initialize particles (CHAOS)
        for (let i = 0; i < particleCount; i++) {
            // Find a random target grid point for later
            const targetCol = Math.floor(Math.random() * cols);
            const targetRow = Math.floor(Math.random() * rows);

            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                targetX: targetCol * gridSize + gridSize / 2, // Center in cell
                targetY: targetRow * gridSize + gridSize / 2,
                vx: (Math.random() - 0.5) * 0.2, // Very slow drift for Phase 1
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 1.5 + 0.5, // Tiny points
                opacity: Math.random() * 0.2 + 0.1, // Slightly more visible (0.1 - 0.3)
                state: "chaos",
                timer: Math.random() * 100 + 50 // Shorter initial delay (50-150 frames)
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach((p) => {
                // STATE MACHINE

                // 1. CHAOS: Random drift
                if (p.state === "chaos") {
                    p.x += p.vx;
                    p.y += p.vy;

                    // Respond quickly once animation starts (accelerated countdown)
                    if (startAnimationRef.current) {
                        p.timer -= 5; // Much faster transition (was 1)
                    }

                    // Boundary bounce for chaos
                    if (p.x < 0 || p.x > width) p.vx *= -1;
                    if (p.y < 0 || p.y > height) p.vy *= -1;

                    if (p.timer <= 0 && startAnimationRef.current) p.state = "forming";
                }

                // 2. FORMING: Soft attraction to grid target
                else if (p.state === "forming") {
                    if (p.targetX !== null && p.targetY !== null) {
                        const dx = p.targetX - p.x;
                        const dy = p.targetY - p.y;

                        // Spring force
                        p.vx += dx * 0.0005;
                        p.vy += dy * 0.0005;

                        // Damping
                        p.vx *= 0.94; // Increased damping slightly to settle faster
                        p.vy *= 0.94;

                        p.x += p.vx;
                        p.y += p.vy;

                        // Check if roughly "docked" - Relaxed conditions
                        if (Math.abs(dx) < 5 && Math.abs(dy) < 5 && Math.abs(p.vx) < 1) {
                            p.state = "growth";
                        }
                    }
                }

                // 3. GROWTH: Gentle upward flow with structure
                else if (p.state === "growth") {
                    // Move strictly upward, slightly faster to be noticeable
                    p.y -= 0.5; // Increased from 0.1 to 0.5
                    // Correct x to stay perfectly aligned (vertical structure)
                    if (p.targetX !== null) p.x += (p.targetX - p.x) * 0.1;

                    // Reset if goes off top
                    if (p.y < -10) {
                        p.y = height + 10;
                        // Keep in growth state for continuous flow, or occasional chaos
                        if (Math.random() > 0.9) {
                            p.state = "chaos";
                            p.timer = Math.random() * 100;
                        }
                    }
                }

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Dynamic opacity based on state
                // Chaos = faint, Form = pulsing, Growth = stable
                let alpha = p.opacity;
                if (p.state === "forming") alpha = p.opacity * 1.5;

                ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
                ctx.fill();

                // Draw faint connections if forming/growth and close neighbors (Structure hint)
                if (p.state === "growth") {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x, p.y + 15); // Longer trail implies faster upward movement
                    ctx.strokeStyle = `rgba(0,0,0, ${alpha * 0.4})`; // Subtle trail
                    ctx.stroke();
                }
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#faf9f6]" /> {/* Solid light background base */}
            <motion.canvas
                ref={canvasRef}
                className="absolute inset-0 z-10 pointer-events-none opacity-60" // Reduced opacity for subtlety
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            />
        </div>
    );
}
