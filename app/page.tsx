"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { MouseFollower } from "@/components/mouse-follower"
import { StylishLogo } from "@/components/stylish-logo"
import { useMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"
import {
  ArrowRight,
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Star,
  BookOpen,
  Briefcase,
  ChevronDown,
  Sparkles,
  Download,
  Facebook,
  Instagram,
  Twitter,
  FileText,
  User,
  MapPin,
  Phone,
  Calendar,
  Award,
  GraduationCap,
  Database,
  Globe,
  SkipBack,
  Pause,
  Play,
  SkipForward,
  Volume2,
  Sun,
  Moon,
} from "lucide-react"
import { RightSidebar } from "@/components/right-sidebar"
import { LeftSidebar } from "@/components/left-sidebar"
import { Loading } from "@/components/ui/loading"
import { Spinner } from "@/components/ui/spinner"
import { LoadingAnimation } from "@/components/loading-animation"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const { theme, setTheme } = useTheme()
  const isMobile = useMobile()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
    
    // Check if the loading animation has been shown in this session
    const hasShownLoading = sessionStorage.getItem('hasShownLoading')
    
    if (!hasShownLoading) {
      // Mark that we've shown the loading animation
      sessionStorage.setItem('hasShownLoading', 'true')
      
      // Simulate loading progress with a smoother animation
      const startTime = Date.now()
      const duration = 3000 // 3 seconds
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        setLoadingProgress(progress)
        
        if (progress >= 1) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
          }, 500) // Short delay to allow the name animation to complete
        }
      }, 16) // ~60fps for smooth animation
      
      return () => clearInterval(interval)
    } else {
      // If we've already shown the loading animation, just set mounted to true
      setIsLoading(false)
    }
  }, [])

  const sections = ["home", "about", "skills", "projects", "experience", "resume", "contact"]
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sections.find((section) => {
        if (section === "home") return window.scrollY < 300
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection)
        document.documentElement.style.setProperty("--progress", scrollYProgress.get().toString())
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollYProgress])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
    closeMobileMenu()
  }

  const enterButton = () => {
    setCursorText("Click")
    setCursorVariant("button")
  }

  const leaveButton = () => {
    setCursorText("")
    setCursorVariant("default")
  }

  const enterLink = () => {
    setCursorVariant("link")
  }

  const leaveLink = () => {
    setCursorVariant("default")
  }

  const downloadResumePDF = () => {
    // Create a link element
    const link = document.createElement("a")
    // Set the href to the PDF file path in the public directory
    link.href = "/docs/sumanbisunkhe-resume.pdf"
    // Set the download attribute with the desired filename
    link.download = "sumanbisunkhe-resume.pdf"
    // Append the link to the document
    document.body.appendChild(link)
    // Trigger the click event
    link.click()
    // Remove the link from the document
    document.body.removeChild(link)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          to: "sumanbisunkhe304@gmail.com"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to send message")
      }

      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 1000)
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // If the component is not mounted yet, we show a blank div to avoid hydration mismatch
  if (!mounted) {
    return <div className="h-screen bg-background"></div>
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background overflow-x-hidden">
      {isLoading && <LoadingAnimation fullScreen progress={loadingProgress} />}
      
      {!isLoading && (
        <>
      {!isMobile && <MouseFollower text={cursorText} variant={cursorVariant} />}

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Left Sidebar */}
      <div className="hidden lg:block">
      <LeftSidebar />
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block">
      <RightSidebar />
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container flex h-16 sm:h-20 items-center justify-between px-2 sm:px-4 md:px-8">
          {/* Theme toggler and logo only on mobile/tablet */}
          <div className="flex items-center gap-2 flex-shrink-0 lg:hidden">
            <ThemeToggler />
          </div>
          <div className="flex-1 flex justify-center items-center lg:hidden">
            {/* Show full name on mobile and tablet */}
            <span className="block font-serif font-extrabold tracking-widest text-primary select-none text-base xs:text-lg sm:text-xl md:text-2xl" style={{ letterSpacing: '0.15em' }}>
              SUMAN BISUNKHE
            </span>
          </div>
          {/* Desktop Navigation (hidden on mobile/tablet) */}
          <nav className="hidden lg:flex gap-0.5 sm:gap-1 flex-1 justify-center">
            {sections.map((section, index) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative px-1.5 sm:px-2 md:px-4 py-2 text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wider ${theme === "dark" ? "text-white" : "text-gray-800"} header-nav-item transition-colors`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
              >
                {section}
                {activeSection === section && (
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
          {/* Mobile/Tablet Hamburger (shown for md and below lg) */}
          <div className="flex md:flex lg:hidden items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container h-full flex flex-col">
              <div className="flex items-center justify-between py-6">
                <div className="flex items-center gap-2">
                  <ThemeToggler />
                  <span className="block font-serif font-extrabold tracking-widest text-primary select-none text-base xs:text-lg sm:text-xl md:text-2xl" style={{ letterSpacing: '0.15em' }}>
                    SUMAN BISUNKHE
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col gap-4 py-8">
                {sections.map((section, index) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-xl sm:text-2xl font-medium uppercase tracking-wider ${activeSection === section ? "text-primary" : "text-muted-foreground"
                      }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                  >
                    {section}
                  </motion.button>
                ))}
              </nav>
              {/* Music Player for mobile/tablet */}
              <div className="flex flex-row items-center justify-center gap-6 py-4 border-t border-border/20">
                <MobileMusicPlayer />
              </div>
              <div className="mt-auto pb-8 flex gap-4 justify-center">
                <Button asChild variant="outline" size="icon" className="rounded-full">
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon" className="rounded-full">
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon" className="rounded-full">
                  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon" className="rounded-full">
                  <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon" className="rounded-full">
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20 sm:pt-24 px-2 sm:px-4 md:px-8 lg:px-10 xl:px-12 md:ml-24 md:mr-24 ml-0 mr-0 overflow-x-hidden">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-[80vh] flex flex-col items-center justify-center px-2 sm:px-6 md:px-8 lg:px-12 xl:px-16"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/20" />
          </div>

          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content */}
              <motion.div
                className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h1
                  className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Suman Bisunkhe
                  </span>
                </motion.h1>

                <motion.h2
                  className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Java Programmer
                </motion.h2>

                <motion.div
                  className="space-y-4 sm:space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <p className={`text-sm sm:text-base md:text-lg max-w-[600px] mx-auto lg:mx-0 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Currently doing an internship in Java development. Focusing on Spring Boot applications and building
                    a strong foundation in core Java concepts.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                    <Button
                      asChild
                      size="lg"
                      className="group relative overflow-hidden rounded-full text-sm sm:text-base"
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      <Link href="#projects">
                        <span className="relative z-10 flex items-center gap-2">
                          View My Work
                          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 group-hover:opacity-90 transition-opacity"></span>
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Content - Profile Image */}
              <motion.div
                className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative mx-auto aspect-square w-28 sm:w-40 md:w-48 lg:w-64 xl:w-80">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 blur-xl" />
                  <div className="relative rounded-full overflow-hidden">
                    <img
                      alt="Suman Bisunkhe - Java Programmer"
                      className="mx-auto aspect-square overflow-hidden rounded-full object-cover object-center border-4 border-background shadow-xl w-full h-full"
                      src="/docs/pp.png"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-32 mb-32">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50"></div>
            <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-background to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-background to-transparent"></div>

            {/* Decorative Elements */}
            <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content - Title */}
              <motion.div
                className="lg:col-span-4 flex flex-col items-center lg:items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative text-center lg:text-left">
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary/10">ABOUT</h2>
                  <h3 className="absolute top-1/2 -translate-y-1/2 text-3xl md:text-4xl font-bold">My Story</h3>
                </div>
              </motion.div>

              {/* Right Content - Description */}
              <motion.div
                className="lg:col-span-8 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  I started my programming journey with a fascination for how software could solve real-world
                      problems. Currently, I'm pursuing my B.Sc. CSIT at <a href="https://texasintl.edu.np/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Texas International College</a> while gaining
                  practical experience through my Java development internship.
                </p>
                <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  I believe in writing clean, maintainable code that stands the test of time. My approach combines
                  technical excellence with a deep understanding of business needs, resulting in solutions that
                  deliver real value.
                </p>
              </motion.div>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <AboutCard
                  icon={<Code className="h-8 w-8 text-primary" />}
                  title="Technical Excellence"
                  description="Focusing on Java and Spring Boot with an emphasis on building scalable, maintainable solutions."
                  onMouseEnter={enterLink}
                  onMouseLeave={leaveLink}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <AboutCard
                  icon={<Briefcase className="h-8 w-8 text-primary" />}
                  title="Practical Experience"
                  description="Gaining hands-on experience through internship and building real-world projects."
                  onMouseEnter={enterLink}
                  onMouseLeave={leaveLink}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AboutCard
                  icon={<BookOpen className="h-8 w-8 text-primary" />}
                  title="Continuous Learning"
                  description="Constantly expanding my knowledge through education, projects, and staying current with industry trends."
                  onMouseEnter={enterLink}
                  onMouseLeave={leaveLink}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="relative py-32 mb-32">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50"></div>
            <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-background to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-background to-transparent"></div>

            {/* Decorative Elements */}
            <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content - Title */}
              <motion.div
                className="lg:col-span-4 flex flex-col items-center lg:items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative text-center lg:text-left">
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary/10">SKILLS</h2>
                  <h3 className="absolute top-1/2 -translate-y-1/2 text-3xl md:text-4xl font-bold">My Expertise</h3>
                </div>
              </motion.div>

              {/* Right Content - Description */}
              <motion.div
                className="lg:col-span-8 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  I specialize in Java development with a focus on Spring Boot applications. My skill set includes both
                  backend development and modern web technologies.
                </p>
              </motion.div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <SkillCard
                  icon={<Code className="h-8 w-8 text-primary" />}
                  title="Java Development"
                  description="Core Java, Spring Boot, Hibernate, REST APIs"
                  onMouseEnter={enterLink}
                  onMouseLeave={leaveLink}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <SkillCard
                  icon={<Database className="h-8 w-8 text-primary" />}
                  title="Database"
                  description="MySQL, PostgreSQL, MongoDB"
                  onMouseEnter={enterLink}
                  onMouseLeave={leaveLink}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <SkillCard
                  icon={<Globe className="h-8 w-8 text-primary" />}
                  title="Web Technologies"
                  description="HTML, CSS, JavaScript, React"
                  onMouseEnter={enterLink}
                  onMouseLeave={leaveLink}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="relative py-32 mb-32">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50"></div>
            <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-background to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-background to-transparent"></div>

            {/* Decorative Elements */}
            <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content - Title */}
              <motion.div
                className="lg:col-span-4 flex flex-col items-center lg:items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative text-center lg:text-left">
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary/10">PROJECTS</h2>
                  <h3 className="absolute top-1/2 -translate-y-1/2 text-3xl md:text-4xl font-bold">My Work</h3>
                </div>
              </motion.div>

              {/* Right Content - Description */}
              <motion.div
                className="lg:col-span-8 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Here are some of my notable projects that showcase my skills in Java development and problem-solving abilities.
                </p>
              </motion.div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard
                  title="Inventory Control System"
                  description="An efficient solution that automates owner registration, supplier onboarding, product tracking, and order processing."
                  tags={["Java", "Spring Boot", "PostgreSQL", "Email"]}
                      image="/inventory.svg"
                      githubLink="https://github.com/sumanbisunkhe/inventory-control-system"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ProjectCard
                  title="Library Management System"
                  description="A comprehensive platform built with Spring Boot for managing books, user transactions, reservations, and fines."
                  tags={["Java", "Spring Boot", "JWT", "SQL"]}
                      image="/library.svg"
                      githubLink="https://github.com/sumanbisunkhe/library-management-system"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ProjectCard
                  title="Kurakani Chat Application"
                  description="A real-time chat platform with OTP-based registration, JWT-secured login, and WebSocket-powered messaging."
                  tags={["Java", "WebSocket", "JWT", "OTP"]}
                      image="/chat.svg?height=300&width=400"
                      githubLink="https://github.com/sumanbisunkhe/kurakani"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ProjectCard
                  title="BlogEcho Application"
                  description="A backend platform for blog and user management with secure JWT authentication and PostgreSQL integration."
                  tags={["Java", "Spring Boot", "JWT", "PostgreSQL"]}
                      image="/blog.svg"
                      githubLink="https://github.com/sumanbisunkhe/BlogEcho"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ProjectCard
                  title="Room Radar"
                  description="A web-based platform designed to bridge the gap between landlords and individuals searching for rental properties."
                  tags={["Java", "Spring Boot", "Web", "Database"]}
                      image="/roomradar.svg?height=300&width=400"
                      githubLink="https://github.com/sumanbisunkhe/room-finder-system-backend"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <ProjectCard
                  title="ATM Application"
                  description="A simulated system that handles account creation, authentication, and transaction tracking for basic banking operations."
                  tags={["Java", "OOP", "Authentication"]}
                      image="/atm.svg?height=300&width=400"
                      githubLink="https://github.com/sumanbisunkhe/ATM_app"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="relative py-32 mb-32">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50"></div>
            <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-background to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-background to-transparent"></div>

            {/* Decorative Elements */}
            <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content - Title */}
              <motion.div
                className="lg:col-span-4 flex flex-col items-center lg:items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative text-center lg:text-left">
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary/10">My Journey</h2>
                  <h3 className="absolute top-1/2 -translate-y-1/2 text-3xl md:text-4xl font-bold">EXPERIENCE</h3>
                </div>
              </motion.div>

              {/* Right Content - Description */}
              <motion.div
                className="lg:col-span-8 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  A timeline of my professional journey, showcasing my growth and achievements in the field of Java development.
                </p>
              </motion.div>
            </div>

            {/* Timeline */}
            <div className="relative max-w-3xl mx-auto mt-16">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>

              <div className="space-y-12 md:space-y-24">
                <TimelineItem
                  year="2023 - Present"
                  title="Java Programmer Intern"
                  company="Qpixel"
                  description="Working on Spring Boot applications and gaining hands-on experience with real-world Java development. Contributing to backend services and API development."
                  isLeft={true}
                  onMouseEnter={() => { }}
                  onMouseLeave={() => { }}
                  severity="default"
                      companyUrl="https://theqpixel.com/"
                />

                <TimelineItem
                  year="2023 - Present"
                  title="B.Sc. CSIT Student"
                  company="Texas International College"
                  description="Pursuing a Bachelor's degree in Computer Science and Information Technology, focusing on software development, algorithms, and data structures."
                  isLeft={false}
                  onMouseEnter={() => { }}
                  onMouseLeave={() => { }}
                  severity="default"
                      companyUrl="https://texasintl.edu.np/"
                />

                <TimelineItem
                  year="2019 - 2022"
                  title="+2 Student"
                  company="St. Xavier's College"
                  description="Completed higher secondary education with a focus on science and mathematics, building a strong foundation for further studies in computer science."
                  isLeft={true}
                  onMouseEnter={() => { }}
                  onMouseLeave={() => { }}
                  severity="default"
                      companyUrl="https://sxc.edu.np/"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="relative py-32 mb-32">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50"></div>
            <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-background to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-background to-transparent"></div>

            {/* Decorative Elements */}
            <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content - Title */}
              <motion.div
                className="lg:col-span-4 flex flex-col items-center lg:items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative text-center lg:text-left">
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary/10">RESUME</h2>
                  <h3 className="absolute top-1/2 -translate-y-1/2 text-3xl md:text-4xl font-bold">My CV</h3>
                </div>
              </motion.div>

              {/* Right Content - Description */}
              <motion.div
                className="lg:col-span-8 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  A comprehensive overview of my skills, education, and professional experience.
                </p>
              </motion.div>
            </div>

            {/* Resume Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
              {/* Left Column - Personal Info */}
              <motion.div
                className="lg:col-span-4 space-y-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Profile Card */}
                <Card className={`overflow-hidden ${theme === "dark" ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm border ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                  <div className="relative h-36 bg-gradient-to-r from-primary/80 to-primary/40">
                    <div className="absolute -bottom-16 left-6">
                      <div className="rounded-full border-4 border-background overflow-hidden h-32 w-32">
                        <img src="/docs/profile.jpeg" alt="Profile" className="h-full w-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-20 pb-6 px-6">
                    <h2 className="text-2xl font-bold">Suman Bisunkhe</h2>
                    <p className="text-primary">Java Programmer</p>
                  </div>
                </Card>

                {/* Contact Info */}
                <Card className={`p-6 ${theme === "dark" ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm border ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-11 w-5 text-primary flex-shrink-0" />
                      <a
                        href="mailto:sumanbisunkhe304@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors break-all text-sm sm:text-base"
                        onMouseEnter={enterLink}
                        onMouseLeave={leaveLink}
                      >
                        sumanbisunkhe304@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-11 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm sm:text-base">9840948274</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm sm:text-base">Kathmandu, Nepal</span>
                    </div>
                  </div>
                </Card>

                {/* Skills */}
                <Card className={`p-6 ${theme === "dark" ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm border ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                  <h3 className="text-xl font-bold mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "Spring Boot", "PostgreSQL", "JWT", "WebSocket", "HTML", "CSS", "JavaScript", "React", "Git"].map((skill) => (
                      <Badge key={skill} variant="outline" className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Right Column - Main Content */}
              <motion.div
                className="lg:col-span-8 space-y-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Professional Summary */}
                <Card className={`p-6 ${theme === "dark" ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm border ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                  <h3 className="text-xl font-bold mb-4">Professional Summary</h3>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Seeking a significant position in software development with a focus on Java and Spring Boot framework applications. With hands-on experience in Spring Boot applications and a strong foundation in core Java concepts, coupled with a passion for continuous learning and innovation, I am eager to contribute to a team and grow within the tech industry.
                  </p>
                </Card>

                {/* Education */}
                <Card className={`p-6 ${theme === "dark" ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm border ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                  <h3 className="text-xl font-bold mb-4">Education</h3>
                  <div className="space-y-6">
                    <div className="relative pl-8 border-l-2 border-primary/30">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <div>
                        <h4 className="text-lg font-semibold">B.Sc. CSIT</h4>
                            <a href="https://texasintl.edu.np/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Texas International College</a>
                        <p className="text-sm text-muted-foreground">2023 - Present</p>
                      </div>
                    </div>
                    <div className="relative pl-8 border-l-2 border-primary/30">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <div>
                        <h4 className="text-lg font-semibold">+2</h4>
                            <a href="https://sxc.edu.np/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">St. Xavier's College</a>
                        <p className="text-sm text-muted-foreground">2019 - 2022</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Experience */}
                <Card className={`p-6 ${theme === "dark" ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm border ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                  <h3 className="text-xl font-bold mb-4">Experience</h3>
                  <div className="space-y-6">
                    <div className="relative pl-8 border-l-2 border-primary/30">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <div>
                        <h4 className="text-lg font-semibold">Java Programmer Intern</h4>
                            <a href="https://theqpixel.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Qpixel</a>
                        <p className="text-sm text-muted-foreground">2023 - Present</p>
                        <p className={`mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          Working on Spring Boot applications and gaining hands-on experience with real-world Java development. Contributing to backend services and API development.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>


              </motion.div>

            </div>
            {/* Download Button */}
            <div className="flex justify-center mt-8">
              <Button
                onClick={downloadResumePDF}
                className="flex items-center gap-2"
                size="lg"
              >
                <Download className="h-5 w-5" />
                Download Resume
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-32">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50"></div>
            <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-background to-transparent"></div>

            {/* Decorative Elements */}
            <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content - Title */}
              <motion.div
                className="lg:col-span-4 flex flex-col items-center lg:items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative text-center lg:text-left">
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary/10">CONNECT</h2>
                  <h3 className="absolute top-1/2 -translate-y-1/2 text-3xl md:text-4xl font-bold">Get In Touch</h3>
                </div>
              </motion.div>

              {/* Right Content - Description */}
              <motion.div
                className="lg:col-span-8 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Have a project in mind or want to discuss opportunities? Reach out to me.
                </p>
              </motion.div>
            </div>

            {/* Contact Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
              {/* Left Column - Contact Form */}
              <motion.div
                className="lg:col-span-7 h-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className={`h-full p-8 ${theme === "dark" ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm border ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                  <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                      <form onSubmit={handleSubmit} className="flex flex-col h-[calc(100%-4rem)]">
                    <div className="space-y-6 flex-1">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-background/50 border border-primary/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                              name="email"
                          type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-background/50 border border-primary/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                          placeholder="Your email"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                          className="w-full min-h-[120px] px-4 py-3 rounded-lg bg-background/50 border border-primary/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                          placeholder="Your message"
                          required
                        />
                      </div>
                    </div>
                        <div className="mt-6 space-y-4">
                          {submitStatus === "success" && (
                            <p className="text-green-500 text-sm">Message sent successfully!</p>
                          )}
                          {submitStatus === "error" && (
                            <p className="text-red-500 text-sm">{errorMessage}</p>
                          )}
                      <Button
                        type="submit"
                        className="w-full rounded-lg group relative overflow-hidden"
                        onMouseEnter={enterButton}
                        onMouseLeave={leaveButton}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <div className="flex items-center justify-center gap-2">
                                <Spinner size="sm" />
                                <span>Sending...</span>
                              </div>
                            ) : (
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Send Message
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                            )}
                        <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 group-hover:opacity-90 transition-opacity"></span>
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>

              {/* Right Column - Contact Info */}
              <motion.div
                className="lg:col-span-5 h-full"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className={`h-full p-8 ${theme === "dark" ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm border ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-6 h-full flex flex-col">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <a
                          href="mailto:sumanbisunkhe304@gmail.com"
                          className="text-muted-foreground hover:text-primary transition-colors break-all text-sm sm:text-base"
                          onMouseEnter={enterLink}
                          onMouseLeave={leaveLink}
                        >
                          sumanbisunkhe304@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Linkedin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">LinkedIn</h4>
                        <a
                          href="https://linkedin.com/in/sumanbisunkhe"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors break-all text-sm sm:text-base"
                          onMouseEnter={enterLink}
                          onMouseLeave={leaveLink}
                        >
                          linkedin.com/in/sumanbisunkhe
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Github className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">GitHub</h4>
                        <a
                          href="https://github.com/sumanbisunkhe"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors break-all text-sm sm:text-base"
                          onMouseEnter={enterLink}
                          onMouseLeave={leaveLink}
                        >
                          github.com/sumanbisunkhe
                        </a>
                      </div>
                    </div>

                    <div className="mt-auto p-6 rounded-xl bg-primary/5 border border-primary/10">
                      <h4 className="font-medium mb-2">Current Status</h4>
                      <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                            I'm currently doing my internship at <a href="https://theqpixel.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Qpixel</a>.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
        </>
      )}
    </div>
  )
}

interface AboutCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function AboutCard({ icon, title, description, onMouseEnter, onMouseLeave }: AboutCardProps) {
  const { theme } = useTheme()

  return (
    <Card
      className={`h-full ${theme === "dark" ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm border ${theme === "dark" ? "border-gray-800" : "border-gray-200"} overflow-hidden group hover:border-primary/30 transition-all duration-300`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-6 relative">
        <div
          className={`absolute top-0 right-0 w-20 h-20 ${theme === "dark" ? "bg-primary/10" : "bg-primary/5"} rounded-bl-full`}
        ></div>
        <div className="relative z-10">
          <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{description}</p>
        </div>
      </div>
    </Card>
  )
}

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function SkillCard({ icon, title, description, onMouseEnter, onMouseLeave }: SkillCardProps) {
  const { theme } = useTheme()

  return (
    <Card
      className={`h-full ${theme === "dark" ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm border ${theme === "dark" ? "border-gray-800" : "border-gray-200"} overflow-hidden group hover:border-primary/30 transition-all duration-300`}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{description}</p>
      </div>
    </Card>
  )
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubLink?: string;
}

function ProjectCard({ title, description, tags, image, githubLink }: ProjectCardProps) {
  const { theme } = useTheme()

  return (
    <Card
      className={`h-full ${theme === "dark" ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm border ${theme === "dark" ? "border-gray-800" : "border-gray-200"} overflow-hidden group hover:border-primary/30 transition-all duration-300`}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <Button
            variant="outline"
            size="sm"
            className={`gap-1 ${theme === "dark" ? "bg-gray-900/80" : "bg-white/80"} backdrop-blur-sm border-primary/20`}
            asChild
          >
            <a href={githubLink || "#"} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            View Project
            </a>
          </Button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className={`mb-4 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="outline"
              className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-200 text-gray-800"}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  )
}

function TimelineItem({
  year,
  title,
  company,
  description,
  isLeft,
  onMouseEnter = () => { },
  onMouseLeave = () => { },
  severity = "default",
  companyUrl = "#"
}: {
  year: string;
  title: string;
  company: string;
  description: string;
  isLeft: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  severity?: "default" | "success" | "warning" | "error";
  companyUrl?: string;
}) {
  const { theme } = useTheme()

  return (
    <motion.div
      className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-primary/20 border-4 border-background transform md:-translate-x-1/2 z-10"></div>

      {/* Content */}
      <div className={`md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
        <Card
          className={`${theme === "dark" ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm border ${theme === "dark" ? "border-gray-800" : "border-gray-200"} overflow-hidden group hover:border-primary/30 transition-all duration-300`}
        >
          <div className="p-6">
            <Badge
              variant="outline"
              className={`mb-2 ${theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-200 text-gray-800"}`}
            >
              {year}
            </Badge>
            <h3 className="text-xl font-bold">{title}</h3>
            <a 
              href={companyUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary mb-2 hover:underline inline-block"
            >
              {company}
            </a>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{description}</p>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

function MobileMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(0.5)
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
    const audioElement = new Audio(tracks[currentTrack])
    audioElement.volume = volume
    audioElement.onended = () => nextTrack()
    setAudio(audioElement)
    return () => {
      audioElement.pause()
      audioElement.currentTime = 0
      audioElement.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack])

  useEffect(() => {
    if (audio) audio.volume = volume
  }, [volume, audio])

  const toggleMusic = async () => {
    if (audio) {
      if (isPlaying) {
        await audio.pause()
      } else {
        await audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  const nextTrack = () => {
    if (audio) {
      audio.pause()
      setCurrentTrack((prev) => (prev + 1) % tracks.length)
      setIsPlaying(true)
    }
  }
  const previousTrack = () => {
    if (audio) {
      audio.pause()
      setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
      setIsPlaying(true)
    }
  }
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={previousTrack} className="h-8 w-8 p-0">
        <SkipBack className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={toggleMusic} className="h-8 w-8 p-0">
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <Button variant="ghost" size="icon" onClick={nextTrack} className="h-8 w-8 p-0">
        <SkipForward className="h-4 w-4" />
      </Button>
      <Volume2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-16 h-1 accent-primary bg-primary/20 rounded-full appearance-none cursor-pointer hover:bg-primary/30 transition-colors"
      />
    </div>
  )
}

function ThemeToggler() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"
  const toggleTheme = () => setTheme(isDark ? "light" : "dark")
  return (
    <motion.button
      onClick={toggleTheme}
      className="cursor-pointer flex items-center justify-center rounded-full bg-background/60 border border-border/30 shadow-md w-10 h-10 sm:w-12 sm:h-12"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Sun className="h-6 w-6 text-yellow-400" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Moon className="h-6 w-6 text-blue-400" />
        </motion.div>
      )}
    </motion.button>
  )
}
