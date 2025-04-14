"use client"

import { useState, useEffect } from "react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Disc,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
} from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { toast } from "./ui/use-toast"

export function RightSidebar() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const { theme, setTheme } = useTheme()

  const tracks = [
    "/music/1.mp3",
    "/music/2.mp3",
    "/music/3.mp3",
    "/music/4.mp3",
    "/music/5.mp3",
    "/music/6.mp3",
    "/music/7.mp3",
    "/music/8.mp3"
    
  ]

  useEffect(() => {
    // Initialize audio
    const audioElement = new Audio(tracks[currentTrack])
    audioElement.volume = volume
    
    // Add error handling
    audioElement.onerror = () => {
      toast({
        title: "Error",
        description: "Could not load audio file. Please try another track.",
        variant: "destructive",
      })
      setIsPlaying(false)
    }

    // Add loaded data handler
    audioElement.onloadeddata = () => {
      setAudio(audioElement)
      // If isPlaying is true, start playing the new track
      if (isPlaying) {
        audioElement.play().catch(() => {
          toast({
            title: "Playback Error",
            description: "Could not play the audio. Please try again.",
            variant: "destructive",
          })
          setIsPlaying(false)
        })
      }
    }

    // Add ended handler
    audioElement.onended = () => {
      nextTrack()
    }

    setAudio(audioElement)

    // Cleanup
    return () => {
      if (audioElement) {
        audioElement.pause()
        audioElement.currentTime = 0
        audioElement.remove()
      }
    }
  }, [currentTrack, isPlaying])

  // Add a separate effect to handle volume changes
  useEffect(() => {
    if (audio) {
      audio.volume = volume
    }
  }, [volume, audio])

  const toggleMusic = async () => {
    if (audio) {
      try {
        if (isPlaying) {
          await audio.pause()
        } else {
          const playPromise = audio.play()
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              toast({
                title: "Playback Error",
                description: "Could not play the audio. Please try again.",
                variant: "destructive",
              })
              setIsPlaying(false)
            })
          }
        }
        setIsPlaying(!isPlaying)
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while playing the audio.",
          variant: "destructive",
        })
        setIsPlaying(false)
      }
    }
  }

  const nextTrack = () => {
    if (audio) {
      const wasPlaying = isPlaying
      audio.pause()
      setCurrentTrack((prev) => (prev + 1) % tracks.length)
      if (wasPlaying) {
        // We'll let the useEffect handle playing the new track
        // since we need to wait for it to load
        setIsPlaying(true)
      }
    }
  }

  const previousTrack = () => {
    if (audio) {
      const wasPlaying = isPlaying
      audio.pause()
      setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
      if (wasPlaying) {
        // We'll let the useEffect handle playing the new track
        // since we need to wait for it to load
        setIsPlaying(true)
      }
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const getSidebarWidth = () => {
    if (window.innerWidth < 768) return "w-16"
    if (window.innerWidth < 1024) return "w-20"
    return "w-24"
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  return (
    <div className={`fixed right-0 top-20 h-[calc(100vh-5rem)] ${getSidebarWidth()} z-40 bg-background/80 backdrop-blur-md border-l border-border/40`}>
      <div className="flex flex-col items-center justify-center h-full gap-8">
        {/* Theme Toggle */}
        <div>
          <motion.button
            onClick={toggleTheme}
            className="cursor-default"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "dark" ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sun className="h-5 w-5 text-yellow-400" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Moon className="h-5 w-5 text-blue-400" />
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-col items-center gap-6">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
        </div>

        {/* Music Player */}
        <div className="group relative">
          {/* Vinyl Record */}
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
            className="relative cursor-pointer"
            onClick={toggleMusic}
          >
            <div className={`relative rounded-full p-1.5 ${isPlaying ? "text-primary" : "text-muted-foreground hover:text-primary transition-colors"}`}>
              {/* Vinyl Image */}
              <motion.img
                src="/docs/vinyl-music.png"
                alt="Vinyl Record"
                className="h-5 w-5 object-contain"
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={isPlaying ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
              />
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-current" />
            </div>
          </motion.div>

          {/* Controls - Show on hover */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0.5 bg-background/95 rounded-lg border border-border/40 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={previousTrack}
                className="h-2.5 w-2.5 hover:text-primary p-0"
              >
                <SkipBack className="h-1.5 w-1.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMusic}
                className="h-2.5 w-2.5 hover:text-primary p-0"
              >
                {isPlaying ? (
                  <Pause className="h-1.5 w-1.5" />
                ) : (
                  <Play className="h-1.5 w-1.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextTrack}
                className="h-2.5 w-2.5 hover:text-primary p-0"
              >
                <SkipForward className="h-1.5 w-1.5" />
              </Button>
            </div>
            {/* Volume Control */}
            <div className="flex items-center gap-2 w-[120%] px-2 pt-1 border-t border-border/40">
              <Volume2 className="h-1.5 w-1.5 text-muted-foreground flex-shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 accent-primary bg-primary/20 rounded-full appearance-none cursor-pointer hover:bg-primary/30 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 