"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  progress?: number;
  className?: string;
  fullScreen?: boolean;
}

export function LoadingAnimation({ progress = 0, className = '', fullScreen = false }: LoadingAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  
  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
    
    // Start the animation after a short delay for a smoother entrance
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  // Calculate positions for text in a circle
  const radius = 150; // Radius of the circle
  const textLength = "SUMANBISUNKHE".length;
  const angleStep = (2 * Math.PI) / textLength; // Distribute text evenly around the circle
  
  // Generate positions for each letter
  const letterPositions = Array.from({ length: textLength }, (_, i) => {
    const angle = i * angleStep;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      rotation: (angle * 180) / Math.PI + 90 // Convert to degrees and add 90 to make text face outward
    };
  });
  
  return (
    <div className={`${fullScreen ? 'fixed' : 'absolute'} inset-0 flex items-center justify-center ${className} transition-opacity duration-1000 ${animationStarted ? 'opacity-100' : 'opacity-0'} z-50 bg-black`}>
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-black z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)] animate-pulse"></div>
        </div>
        
        {/* Animated neon grid */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Rotating text animation */}
        <div className="relative z-10 flex items-center justify-center w-full">
          <motion.div
            className="relative w-[400px] h-[400px] flex items-center justify-center"
            animate={{ 
              rotate: 360
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Circle outline */}
            <div className="absolute inset-0 rounded-full border border-white/20"></div>
            
            {/* Letters positioned in a circle */}
            {Array.from("BISUNKHESUMAN").map((letter, index) => {
              if (letter === " ") return null; // Skip spaces
              
              const position = letterPositions[index];
              return (
                <motion.div
                  key={index}
                  className="absolute text-white text-2xl font-bold"
                  style={{
                    x: position.x,
                    y: position.y,
                    rotate: position.rotation,
                    transformOrigin: "center center",
                    textShadow: "0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.7)"
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.7)",
                      "0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.8)",
                      "0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.7)"
                    ]
                  }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: index * 0.1 },
                    scale: { duration: 0.5, delay: index * 0.1 },
                    textShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                  }}
                >
                  {letter}
                </motion.div>
              );
            })}
            
            {/* Center text */}
            <motion.div
              className="absolute text-white text-4xl font-bold tracking-widest"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.7)",
                  "0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.8)",
                  "0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.7)"
                ]
              }}
              transition={{ 
                opacity: { duration: 0.5, delay: 0.5 },
                scale: { duration: 0.5, delay: 0.5 },
                textShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
              style={{
                textShadow: "0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.7)"
              }}
            >
              
            </motion.div>
          </motion.div>
        </div>
        
        {/* Welcome text below the animation */}
        <motion.div
          className="relative z-10 mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            textShadow: [
              "0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.7)",
              "0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.8)",
              "0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.7)"
            ]
          }}
          transition={{ 
            opacity: { duration: 0.5, delay: 1 },
            y: { duration: 0.5, delay: 1 },
            textShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          <h2 className="text-5xl font-bold text-white tracking-widest" style={{
            textShadow: "0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.7)"
          }}>
            Welcome
          </h2>
        </motion.div>
      </div>
    </div>
  );
} 