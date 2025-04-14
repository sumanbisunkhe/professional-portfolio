"use client"

import React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Spinner({ className, size = "md" }: SpinnerProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const primaryColor = isDark ? "#3b82f6" : "#2563eb"; // blue-500 : blue-600
  const accentColor = isDark ? "#8b5cf6" : "#7c3aed"; // violet-500 : violet-600
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };
  
  return (
    <div className={cn("animate-spin", sizeClasses[size], className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(37, 99, 235, 0.1)"}
          strokeWidth="2"
        />
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12"
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-spinner"
          style={{
            animation: "spinner 1.5s linear infinite",
            transformOrigin: "center",
            willChange: "stroke-dasharray, stroke-dashoffset"
          }}
        />
        <circle
          cx="12"
          cy="12"
          r="2"
          fill={accentColor}
          className="animate-pulse"
          style={{
            animation: "pulse 2s ease-in-out infinite"
          }}
        />
      </svg>
    </div>
  );
} 