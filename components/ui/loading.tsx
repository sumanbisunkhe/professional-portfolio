"use client"

import React from "react";
import { LoadingAnimation } from "@/components/loading-animation";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  progress?: number;
  fullScreen?: boolean;
}

export function Loading({ className, progress, fullScreen = false }: LoadingProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <LoadingAnimation className="w-full max-w-md" progress={progress} />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <LoadingAnimation progress={progress} />
    </div>
  );
} 