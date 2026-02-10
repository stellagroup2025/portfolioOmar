"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function OrganicOrderBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
        const particleCount = 120;
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
                vx: (Math.random() - 0.5) * 0.5, // Slow random drift
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 1.5 + 0.5, // Tiny points
                opacity: Math.random() * 0.3 + 0.1, // Very subtle
                state: "chaos",
                timer: Math.random() * 200 + 100 // Delay before finding form
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
                    p.timer--;

                    // Boundary bounce for chaos
                    if (p.x < 0 || p.x > width) p.vx *= -1;
                    if (p.y < 0 || p.y > height) p.vy *= -1;

                    if (p.timer <= 0) p.state = "forming";
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
                        p.vx *= 0.96;
                        p.vy *= 0.96;

                        p.x += p.vx;
                        p.y += p.vy;

                        // Check if roughly "docked"
                        if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(p.vx) < 0.1) {
                            p.state = "growth";
                        }
                    }
                }

                // 3. GROWTH: Gentle upward flow with structure
                else if (p.state === "growth") {
                    // Move strictly upward, very slowly, reinforcing vertical growth
                    p.y -= 0.1;
                    // Correct x to stay perfectly aligned (vertical structure)
                    if (p.targetX !== null) p.x += (p.targetX - p.x) * 0.1;

                    // Reset if goes off top
                    if (p.y < -10) {
                        p.y = height + 10;
                        p.state = "chaos"; // Recycle into chaos
                        p.timer = Math.random() * 100;
                    }
                }

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Dynamic opacity based on state
                // Chaos = faint, Form = pulsing, Growth = stable
                let alpha = p.opacity;
                if (p.state === "forming") alpha = p.opacity * 1.5; // Slightly brighter when finding form

                ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
                ctx.fill();

                // Draw faint connections if forming/growth and close neighbors (Structure hint)
                // Optimization: only check a few neighbors or use grid proximity
                // For performance/subtlety, maybe just draw vertically from p.y to p.y+10 in growth
                if (p.state === "growth") {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x, p.y + 10); // Slight trail implies upward movement
                    ctx.strokeStyle = `rgba(0,0,0, ${alpha * 0.5})`;
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
