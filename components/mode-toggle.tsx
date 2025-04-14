"use client"

import { Moon, Sun, Stars } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface ModeToggleProps {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function ModeToggle({ onMouseEnter, onMouseLeave }: ModeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-background/20 backdrop-blur-sm border-primary/20 w-12 h-12"
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark = theme === "dark" || (!theme && resolvedTheme === "dark")

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative rounded-full ${
        isDark ? "bg-gray-800/40" : "bg-white/40"
      } w-12 h-12 overflow-hidden shadow-lg backdrop-blur-md border-0 hover:bg-primary/10 transition-all duration-500`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative w-full h-full">
        {/* Sun Icon with Enhanced Animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={isDark ? { opacity: 0, rotate: -180, scale: 0 } : { opacity: 1, rotate: 0, scale: 1 }}
          animate={isDark ? { opacity: 0, rotate: -180, scale: 0 } : { opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="relative">
            {/* Enhanced Gradient Sun */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 blur-[2px] opacity-90 animate-pulse"></div>
            <Sun className="h-6 w-6 text-yellow-50 drop-shadow-lg relative z-10" />

            {/* Enhanced Animated rays */}
            <motion.div
              className="absolute inset-[-12px] z-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-3 bg-gradient-to-t from-yellow-300 to-orange-400 rounded-full opacity-80"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                    transform: `rotate(${i * 30}deg) translateY(-14px)`,
                  }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Moon Icon with Enhanced Animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={isDark ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: 180, scale: 0 }}
          animate={isDark ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: 180, scale: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="relative">
            {/* Enhanced Gradient Moon */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300 via-indigo-400 to-purple-600 blur-[2px] opacity-90 animate-pulse"></div>
            <Moon className="h-6 w-6 text-indigo-50 drop-shadow-lg relative z-10" />

            {/* Enhanced Stars around the moon */}
            <motion.div
              className="absolute inset-[-20px] z-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${15 + Math.random() * 70}%`,
                    left: `${15 + Math.random() * 70}%`,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.6, 1.2, 0.6],
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <div className="w-1 h-1 rounded-full bg-blue-200 shadow-[0_0_3px_2px_rgba(147,197,253,0.5)]" />
                </motion.div>
              ))}
            </motion.div>

            {/* Craters on the moon */}
            <div className="absolute inset-0 z-20">
              <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-indigo-200/20" />
              <div className="absolute bottom-2 right-1 w-1 h-1 rounded-full bg-indigo-200/20" />
              <div className="absolute top-3 right-2 w-0.5 h-0.5 rounded-full bg-indigo-200/20" />
            </div>
          </div>
        </motion.div>
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
