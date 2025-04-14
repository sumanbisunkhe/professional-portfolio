"use client"

import { useEffect, useState } from "react"

interface ScreenSize {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  sizeClass: "mobile" | "tablet" | "desktop"
  scaleFactor: number
}

export function useMobile(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    sizeClass: "desktop",
    scaleFactor: 1
  })

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Define breakpoints for scaling
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      
      // Calculate scale factor based on screen width
      let scaleFactor = 1
      if (width < 768) {
        scaleFactor = 0.8 // Mobile scale
      } else if (width < 1024) {
        scaleFactor = 0.9 // Tablet scale
      }

      setScreenSize({
        width,
        height,
        isMobile,
        isTablet,
        sizeClass: isMobile ? "mobile" : isTablet ? "tablet" : "desktop",
        scaleFactor
      })
    }

    // Initial call
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return screenSize
}
