"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function MouseFollower({ text, variant }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Motion values for smoother animation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for quick following with minimal delay
  const springConfig = { damping: 15, stiffness: 500, mass: 0.2 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const updateMousePosition = (e) => {
      const { clientX, clientY } = e
      setMousePosition({ x: clientX, y: clientY })
      mouseX.set(clientX)
      mouseY.set(clientY)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  // Base styles for different variants
  const baseStyles = {
    default: {
      height: 40,
      width: 40,
      backgroundColor: "rgba(124, 58, 237, 0.05)",
      border: "1px solid rgba(124, 58, 237, 0.1)",
      boxShadow: "0 0 15px 5px rgba(124, 58, 237, 0.15)",
    },
    button: {
      height: 80,
      width: 80,
      backgroundColor: "rgba(124, 58, 237, 0.1)",
      border: "1px solid rgba(124, 58, 237, 0.2)",
      boxShadow: "0 0 20px 8px rgba(124, 58, 237, 0.2)",
    },
    link: {
      height: 60,
      width: 60,
      backgroundColor: "rgba(124, 58, 237, 0.08)",
      border: "1px solid rgba(124, 58, 237, 0.15)",
      boxShadow: "0 0 18px 6px rgba(124, 58, 237, 0.18)",
    },
  }

  // Get current variant style
  const currentVariant = variant || "default"
  const variantStyle = baseStyles[currentVariant]

  return (
    <>
      {/* Glowing circle that follows the cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-40 mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          height: variantStyle.height,
          width: variantStyle.width,
          backgroundColor: variantStyle.backgroundColor,
          border: variantStyle.border,
          boxShadow: variantStyle.boxShadow,
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        {text && (
          <div className="h-full w-full flex items-center justify-center">
            <motion.span
              className="text-xs font-medium text-white bg-primary px-2 py-0.5 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {text}
            </motion.span>
          </div>
        )}
      </motion.div>

      {/* Additional glow effect for emphasis */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-30 opacity-50 blur-xl"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "rgba(124, 58, 237, 0.3)",
          height: variantStyle.height * 1.5,
          width: variantStyle.width * 1.5,
        }}
        animate={{
          scale: isClicking ? 0.6 : [0.8, 1.1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </>
  )
}
