"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    life: number
    maxLife: number
    pulsing: boolean
}

export function SparkBackground() {
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
            // Very few particles - Minimalist
            const particleCount = Math.floor((width * height) / 50000)
            particles = []

            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle())
            }
        }

        const createParticle = (): Particle => {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.05, // Ultra slow drift
                vy: (Math.random() - 0.5) * 0.05,
                size: Math.random() * 1.5 + 0.5,
                life: Math.random() * 100,
                maxLife: 100 + Math.random() * 100,
                pulsing: Math.random() > 0.95 // 5% chance to start pulsing
            }
        }

        const draw = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, width, height)

            particles.forEach((p) => {
                // Update
                p.x += p.vx
                p.y += p.vy
                p.life++

                // Wrap
                if (p.x < 0) p.x = width
                if (p.x > width) p.x = 0
                if (p.y < 0) p.y = height
                if (p.y > height) p.y = 0

                // Pulse effect
                let currentSize = p.size
                let opacity = 0.03 // Very faint base opacity

                if (p.pulsing) {
                    // Sine wave pulse - Slower
                    const pulseFactor = (Math.sin(p.life * 0.02) + 1) / 2 // 0 to 1
                    currentSize = p.size + (pulseFactor * 1) // Grow only +1px
                    opacity = 0.03 + (pulseFactor * 0.1) // Max opacity ~0.13

                    if (p.life > p.maxLife) {
                        p.pulsing = false
                        p.life = 0
                    }
                } else {
                    // Randomly start pulsing again
                    if (Math.random() < 0.002) { // Less frequent
                        p.pulsing = true
                        p.life = 0
                    }
                }

                // Draw
                ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
                ctx.beginPath()
                ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2)
                ctx.fill()
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
