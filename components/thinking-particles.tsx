"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function ThinkingParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles: Particle[] = [];

        // Configuration
        const isMobile = width < 768; // Mobile check
        const particleCount = isMobile ? 25 : 80; // Reduced from 40 to 25 on mobile
        const connectionDistance = isMobile ? 120 : 150; // Slightly shorter connections on mobile
        const mouseDistance = 200;
        const driftSpeed = isMobile ? 0.2 : 0.3; // Slower drift on mobile

        // Resize handler
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Re-init on resize to adjust count if crossing breakpoint
            // But usually resize on mobile is just address bar, so maybe keep it simple
            // For now, re-init is fine
            initParticles();
        };

        // Mouse tracking
        let mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * driftSpeed; // Adjusted drift
                this.vy = (Math.random() - 0.5) * driftSpeed;
                // Smaller particles on mobile: 0.5-2px vs 1-3px
                this.size = isMobile ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 1;
            }

            update() {
                // Mouse attraction (Thought forming)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 0.05; // Gentle attraction
                    const directionY = forceDirectionY * force * 0.05;
                    this.vx += directionX;
                    this.vy += directionY;
                }

                // Move
                this.x += this.vx;
                this.y += this.vy;

                // Wall bounce or Wrap? Let's Bounce to keep them in view
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Friction to prevent infinite acceleration from mouse
                this.vx *= 0.99;
                this.vy *= 0.99;

                // Minimum movement to keep it alive
                if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.01;
                if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.01;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                // Subtler dots on mobile
                ctx.fillStyle = isMobile ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.1)";
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            // Re-calculate isMobile and params in case of resize crossing breakpoint?
            // Since this runs inside an effect that depends on nothing (empty deps), variables are closed over initial load.
            // For proper resize handling, we'd need to update these vars.
            // But we're inside the closure. 
            // Better to re-calc count inside the loop if we want full responsiveness, 
            // but for now, initial load config is usually sufficient for mobile.
            // Let's stick to the initial closure logic for simplicity unless rotation happens.

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Draw connections
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        // Subtler lines on mobile (max 0.05 opacity vs 0.1)
                        const maxOpacity = isMobile ? 0.05 : 0.1;
                        const opacity = maxOpacity - (distance / connectionDistance) * maxOpacity;

                        ctx.strokeStyle = `rgba(0,0,0,${opacity})`; // Fade out with distance
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        // Init
        canvas.width = width;
        canvas.height = height;
        initParticles();
        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        />
    );
}
