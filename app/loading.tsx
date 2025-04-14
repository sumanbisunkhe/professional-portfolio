"use client"

import { LoadingAnimation } from "@/components/loading-animation";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <LoadingAnimation className="w-full max-w-md" progress={0.5} />
    </div>
  );
} 