"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    axis: 'x' | 'y' // Constrain movement to one axis
}

export function StructureBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []
        let width = 0
        let height = 0

        // Handle resize
        const resize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
            initParticles()
        }

        const initParticles = () => {
            const particleCount = Math.floor((width * height) / 25000) // Slightly denser
            particles = []

            for (let i = 0; i < particleCount; i++) {
                const axis = Math.random() > 0.5 ? 'x' : 'y'
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: axis === 'x' ? (Math.random() - 0.5) * 0.4 : 0, // Slower, structured movement
                    vy: axis === 'y' ? (Math.random() - 0.5) * 0.4 : 0,
                    size: Math.random() * 1.5 + 0.5,
                    axis: axis
                })
            }
        }

        const draw = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, width, height)

            // Update and draw particles
            particles.forEach((p, i) => {
                // Move
                p.x += p.vx
                p.y += p.vy

                // Wrap around edges
                if (p.x < 0) p.x = width
                if (p.x > width) p.x = 0
                if (p.y < 0) p.y = height
                if (p.y > height) p.y = 0

                // Draw particle
                ctx.fillStyle = `rgba(0, 0, 0, 0.15)` // Slightly clearer dots
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()

                // Draw connections (Grid-like effect)
                // Connect to nearby particles, but emphasize 'grid' feeling
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    // Connect if close enough
                    if (dist < 100) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(0, 0, 0, ${0.08 - (dist / 100) * 0.08})`
                        ctx.lineWidth = 0.5
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }
            })

            animationFrameId = requestAnimationFrame(draw)
        }

        resize()
        draw()

        window.addEventListener("resize", resize)

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        />
    )
}
