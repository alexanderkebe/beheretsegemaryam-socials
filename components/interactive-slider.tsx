"use client"

import { useState, useRef, useEffect } from "react"
import type { LucideIcon } from "lucide-react"

interface InteractiveSliderProps {
  title: string
  subtitle?: string
  icon?: LucideIcon
  iconSrc?: string
  rightLabel: string
  leftLabel: string
  glowColor: string
  onRight: () => void
  onLeft: () => void
}

export default function InteractiveSlider({
  title,
  subtitle,
  icon: Icon,
  iconSrc,
  rightLabel,
  leftLabel,
  glowColor,
  onRight,
  onLeft,
}: InteractiveSliderProps) {
  const [position, setPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [direction, setDirection] = useState<"idle" | "left" | "right">("idle")
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const velocityRef = useRef(0)
  const lastPositionRef = useRef(0)
  const lastTimeRef = useRef(0)
  const animationRef = useRef<number>()

  const TRIGGER_THRESHOLD = 0.3 // 30% of width to trigger action
  const MAX_POSITION = 50
  const FRICTION = 0.92 // Natural deceleration
  const SPRING_TENSION = 0.15 // Elastic return force

  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    touchStartX.current = clientX
    lastPositionRef.current = position
    lastTimeRef.current = Date.now()
    velocityRef.current = 0
    cancelAnimationFrame(animationRef.current!)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return

    const currentTime = Date.now()
    const timeDelta = Math.max(currentTime - lastTimeRef.current, 16) // Minimum 16ms

    const rect = containerRef.current.getBoundingClientRect()
    const containerWidth = rect.width
    const deltaX = clientX - touchStartX.current
    const percentage = (deltaX / containerWidth) * 100

    const limitedPosition = Math.max(-MAX_POSITION, Math.min(MAX_POSITION, percentage))

    // Calculate velocity for momentum
    velocityRef.current = (limitedPosition - lastPositionRef.current) / (timeDelta / 1000)
    lastPositionRef.current = limitedPosition
    lastTimeRef.current = currentTime

    setPosition(limitedPosition)

    // Determine direction
    if (limitedPosition > 10) {
      setDirection("right")
    } else if (limitedPosition < -10) {
      setDirection("left")
    } else {
      setDirection("idle")
    }
  }

  const handleDragEnd = () => {
    if (!isDragging || !containerRef.current) return
    setIsDragging(false)
    setIsAnimating(true)

    const rect = containerRef.current.getBoundingClientRect()
    const triggerDistance = rect.width * TRIGGER_THRESHOLD

    if (position > rect.width * (TRIGGER_THRESHOLD / 100) * 100) {
      // Trigger right action
      onRight()
      animateWithMomentum(0)
    } else if (position < -rect.width * (TRIGGER_THRESHOLD / 100) * 100) {
      // Trigger left action
      onLeft()
      animateWithMomentum(0)
    } else {
      animateWithMomentum(0)
    }
  }

  const animateWithMomentum = (targetPosition: number) => {
    let currentPos = position
    let currentVelocity = velocityRef.current
    let lastTime = Date.now()

    const animate = () => {
      const currentTime = Date.now()
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      // Calculate spring force pulling towards target
      const springForce = (targetPosition - currentPos) * SPRING_TENSION

      // Apply friction to velocity
      currentVelocity *= Math.pow(FRICTION, deltaTime * 60)

      // Update position based on velocity and spring force
      currentPos += currentVelocity * deltaTime + springForce * deltaTime

      // Stop animation when velocity is negligible and position is close to target
      const velocityThreshold = 0.1
      const positionThreshold = 0.5
      const isNearTarget = Math.abs(currentPos - targetPosition) < positionThreshold
      const isVelocityLow = Math.abs(currentVelocity) < velocityThreshold

      if (isNearTarget && isVelocityLow) {
        setPosition(targetPosition)
        setDirection("idle")
        setIsAnimating(false)
        return
      }

      setPosition(currentPos)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleDragMove(e.clientX)
    }

    const handleMouseUp = () => {
      if (isDragging) handleDragEnd()
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) handleDragMove(e.touches[0].clientX)
    }

    const handleTouchEnd = () => {
      if (isDragging) handleDragEnd()
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleTouchMove, { passive: true })
      document.addEventListener("touchend", handleTouchEnd)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [isDragging, position])

  return (
    <div>
      {/* Slider Container - full-width with increased height */}
      <div
        ref={containerRef}
        className="relative h-20 bg-white dark:bg-slate-800 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing shadow-lg border border-gray-200 dark:border-slate-700"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      >
        <div className="absolute inset-0 bg-white/[0.02] dark:bg-white/[0.02] backdrop-blur-sm pointer-events-none z-0" />

        {/* Background gradient for direction - stays behind (z-0) */}
        <div
          className={`absolute inset-0 transition-opacity duration-200 opacity-0 ${
            direction === "right" ? "opacity-10" : ""
          } bg-gradient-to-r from-green-400 to-emerald-500 z-0`}
          style={direction === "right" ? { opacity: 0.1 } : {}}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-200 opacity-0 ${
            direction === "left" ? "opacity-10" : ""
          } bg-gradient-to-l from-blue-400 to-blue-500 z-0`}
          style={direction === "left" ? { opacity: 0.1 } : {}}
        />

        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br ${glowColor} shadow-xl flex items-center justify-center z-20 ${
            isDragging ? "scale-110" : "scale-100"
          } ${direction === "right" ? "shadow-green-400/50" : direction === "left" ? "shadow-blue-400/50" : ""}`}
          style={{
            transform: `translateX(calc(${position}% - 50%)) translateY(-50%)`,
            boxShadow:
              direction === "right"
                ? "0 0 30px rgba(74, 222, 128, 0.6)"
                : direction === "left"
                  ? "0 0 30px rgba(96, 165, 250, 0.6)"
                  : "none",
            transition: !isDragging && !isAnimating ? "box-shadow 0.3s ease-out" : "none",
          }}
        />
      </div>
    </div>
  )
}
