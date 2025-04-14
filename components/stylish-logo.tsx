"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function StylishLogo({ className = "", size = "medium", compact = false, vertical = false }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  if (compact) {
    return (
      <div className={`font-serif font-bold ${className}`}>
        <motion.span
          className="relative inline-block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className={`${isDark ? "text-white" : "text-gray-800"}`}>SB</span>
          <span className="absolute -top-1 -right-1 text-primary text-opacity-70 blur-[0.5px]">SB</span>
        </motion.span>
      </div>
    )
  }

  if (vertical) {
    const firstNameLetters = "SUMAN".split("")
    const lastNameLetters = "BISUNKHE".split("")

    const sizeClasses = {
      small: "text-lg",
      medium: "text-xl",
      large: "text-3xl",
    }

    return (
      <div
        className={`fixed left-4 top-0 bottom-0 flex flex-col justify-center gap-6 h-full z-50 pointer-events-none ${className}`}
      >
        <div className="flex flex-col items-center space-y-4">
          {firstNameLetters.map((letter, i) => (
            <motion.div
              key={`first-${i}`}
              custom={i}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              className="relative h-6 flex items-center justify-center"
            >
              <span
                className={`font-serif font-bold italic ${sizeClasses[size]} ${isDark ? "text-white" : "text-gray-800"} drop-shadow-[0_0_2px_rgba(124,58,237,0.5)]`}
              >
                {letter}
              </span>
              <span
                className={`absolute -top-[1px] -right-[1px] font-serif font-bold italic ${sizeClasses[size]} text-primary text-opacity-60 blur-[0.5px]`}
              >
                {letter}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center space-y-4 mt-6">
          {lastNameLetters.map((letter, i) => (
            <motion.div
              key={`last-${i}`}
              custom={i + 6} // Start after first name animation
              variants={letterVariants}
              initial="initial"
              animate="animate"
              className="relative h-6 flex items-center justify-center"
            >
              <span
                className={`font-serif font-bold italic ${sizeClasses[size]} ${isDark ? "text-white" : "text-gray-800"} drop-shadow-[0_0_2px_rgba(124,58,237,0.5)]`}
              >
                {letter}
              </span>
              <span
                className={`absolute -top-[1px] -right-[1px] font-serif font-bold italic ${sizeClasses[size]} text-primary text-opacity-60 blur-[0.5px]`}
              >
                {letter}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  const name = "SUMAN BISUNKHE"
  const letters = name.split("")

  const sizeClasses = {
    small: "text-lg gap-[2px]",
    medium: "text-xl gap-[3px]",
    large: "text-3xl gap-[4px]",
  }

  return (
    <div className={`flex ${sizeClasses[size]} font-serif font-bold italic tracking-wider ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          className={`relative ${letter === " " ? "w-4" : ""}`}
        >
          {letter !== " " && (
            <>
              <span className={`${isDark ? "text-white" : "text-gray-800"} drop-shadow-[0_0_2px_rgba(124,58,237,0.5)]`}>
                {letter}
              </span>
              <span className="absolute -top-[1px] -right-[1px] text-primary text-opacity-60 blur-[0.5px]">
                {letter}
              </span>
            </>
          )}
        </motion.span>
      ))}
    </div>
  )
}
