"use client"

import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function LeftSidebar() {
  const { isMobile, isTablet, sizeClass, scaleFactor } = useMobile()
  const { theme } = useTheme()

  const getSidebarWidth = () => {
    if (window.innerWidth < 768) return "w-16"
    if (window.innerWidth < 1024) return "w-20"
    return "w-24"
  }

  const getTextSize = () => {
    switch (sizeClass) {
      case "mobile":
        return "text-2xl"
      case "tablet":
        return "text-2xl"
      default:
        return "text-3xl"
    }
  }

  const letterVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10
      },
    }),
    hover: {
      scale: 1.2 * scaleFactor,
      y: -5 * scaleFactor,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  }

  const firstName = "SUMAN".split("")
  const lastName = "BISUNKHE".split("")

  return (
    <div 
      className={`fixed left-0 top-20 h-[calc(100vh-5rem)] ${getSidebarWidth()} z-40 bg-background/80 backdrop-blur-md border-r border-border/40`}
      style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'left center' }}
    >
      <div className="flex flex-col items-center justify-start h-full py-8">
        <div className="flex flex-col items-center">
          {/* First Name */}
          <div className="flex flex-col items-center gap-2">
            {firstName.map((letter, i) => (
              <motion.span
                key={`first-${i}`}
                custom={i}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className={`
                  ${getTextSize()} font-black tracking-wider
                  bg-clip-text text-transparent
                  ${theme === "dark" 
                    ? "bg-gradient-to-br from-primary via-primary/80 to-primary/60" 
                    : "bg-gradient-to-br from-primary to-primary/60"
                  }
                  cursor-default
                  transition-all duration-300
                  hover:tracking-widest
                  transform-gpu
                  drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px]
                  after:bg-primary/20 after:transform after:scale-x-0 after:origin-right
                  hover:after:scale-x-100 hover:after:origin-left after:transition-transform
                  after:duration-300
                  font-['Qurova']
                `}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Separator */}
          <motion.div 
            className={`my-4 ${sizeClass === "mobile" ? "w-6" : "w-8"} h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />

          {/* Last Name */}
          <div className="flex flex-col items-center gap-2">
            {lastName.map((letter, i) => (
              <motion.span
                key={`last-${i}`}
                custom={i + firstName.length + 1}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className={`
                  ${getTextSize()} font-black tracking-wider
                  bg-clip-text text-transparent
                  ${theme === "dark"
                    ? "bg-gradient-to-br from-primary/60 via-primary/80 to-primary"
                    : "bg-gradient-to-br from-primary/60 to-primary"
                  }
                  cursor-default
                  transition-all duration-300
                  hover:tracking-widest
                  transform-gpu
                  drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px]
                  after:bg-primary/20 after:transform after:scale-x-0 after:origin-left
                  hover:after:scale-x-100 hover:after:origin-right after:transition-transform
                  after:duration-300
                  font-['Qurova']
                `}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 