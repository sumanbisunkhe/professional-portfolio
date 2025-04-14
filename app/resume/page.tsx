"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import {
  Download,
  ExternalLink,
  Github,
  Linkedin,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Award,
} from "lucide-react"

export default function Resume() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const downloadResume = () => {
    // Use the actual PDF file instead of generating a text file
    const link = document.createElement("a")
    link.href = "/docs/sumanbisunkhe-resume.pdf"
    link.download = "Suman_Bisunkhe_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!mounted) {
    return <div className="h-screen bg-background"></div>
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-5xl font-bold">My Resume</h1>
            <div className="h-1 w-20 bg-primary mt-2 rounded-full"></div>
            <p className={`mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              A detailed overview of my skills, education, and projects
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Button
              onClick={downloadResume}
              className="flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-white px-6 py-6 h-auto"
            >
              <Download className="h-5 w-5" />
              <span className="font-medium">Download Resume</span>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Profile Card */}
            <Card
              className={`overflow-hidden ${
                theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"
              }`}
            >
              <div className="relative h-32 bg-gradient-to-r from-primary/80 to-primary/40">
                <div className="absolute -bottom-16 left-6">
                  <div className="rounded-full border-4 border-background overflow-hidden h-32 w-32">
                    <img
                      src="/placeholder.svg?height=128&width=128"
                      alt="Suman Bisunkhe"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-20 pb-6 px-6">
                <h2 className="text-2xl font-bold">Suman Bisunkhe</h2>
                <p className="text-primary">Java Programmer</p>
              </div>
            </Card>

            {/* Personal Details */}
            <Card
              className={`p-6 ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Personal Details</h2>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">ADDRESS</h3>
                    <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                      Kathmandu
                      <br />
                      Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">PHONE</h3>
                    <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>9840948274</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">EMAIL</h3>
                    <a href="mailto:sumanbisunkhe304@gmail.com" className="text-primary hover:underline">
                      sumanbisunkhe304@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            {/* Links */}
            <Card
              className={`p-6 ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ExternalLink className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Links</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="bg-primary/5 p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <a href="#" className="text-primary hover:underline">
                    Portfolio
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="bg-primary/5 p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                    <Github className="h-5 w-5 text-primary" />
                  </div>
                  <a href="#" className="text-primary hover:underline">
                    GitHub
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="bg-primary/5 p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </div>
                  <a href="#" className="text-primary hover:underline">
                    LinkedIn
                  </a>
                </div>
              </div>
            </Card>

            {/* Skills */}
            <Card
              className={`p-6 ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Skills</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "Java",
                  "Spring Boot",
                  "IntelliJ IDEA",
                  "Postman",
                  "Git",
                  "GitHub",
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React",
                  "SQL",
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Badge
                      variant="outline"
                      className={`${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-gray-200"
                          : "bg-gray-100 border-gray-200 text-gray-800"
                      } px-3 py-1 text-sm`}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-8 space-y-8"
          >
            {/* Professional Summary */}
            <Card
              className={`p-8 ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Professional Summary</h2>
              </div>
              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} leading-relaxed text-lg`}>
                Seeking a significant position in software development with a focus on Java and Spring Boot framework
                applications. With hands-on experience in Spring Boot applications and a strong foundation in core Java
                concepts, coupled with a passion for continuous learning and innovation, I am eager to contribute team
                and grow within the tech industry.
              </p>
            </Card>

            {/* Education */}
            <Card
              className={`p-8 ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Education</h2>
              </div>

              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-primary/30">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold">B.Sc. CSIT</h3>
                      <p className="text-primary">Texas International College</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Apr, 2023 - Present</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className={`${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-gray-200"
                          : "bg-gray-100 border-gray-200 text-gray-800"
                      }`}
                    >
                      Kathmandu
                    </Badge>
                  </div>
                </div>

                <div className="relative pl-8 border-l-2 border-primary/30">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold">+2</h3>
                      <p className="text-primary">St. Xavier's College</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">June, 2020 - Nov, 2022</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className={`${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-gray-200"
                          : "bg-gray-100 border-gray-200 text-gray-800"
                      }`}
                    >
                      Kathmandu
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Projects */}
            <Card
              className={`p-8 ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Projects</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Inventory Control System",
                    description:
                      "An efficient solution that automates owner registration, supplier onboarding, product tracking, and order processing with real-time email notifications.",
                    tags: ["Java", "Spring Boot", "Email"],
                  },
                  {
                    title: "Library Management System",
                    description:
                      "A comprehensive platform built with Spring Boot for managing books, user transactions, reservations, and fines with secure JWT-based access.",
                    tags: ["Java", "Spring Boot", "JWT"],
                  },
                  {
                    title: "Kurakani Chat Application",
                    description:
                      "A real-time chat platform with OTP-based registration, JWT-secured login, and WebSocket-powered messaging functionality.",
                    tags: ["Java", "WebSocket", "JWT"],
                  },
                  {
                    title: "BlogEcho Application",
                    description:
                      "A backend platform for blog and user management with secure JWT authentication and PostgreSQL integration.",
                    tags: ["Java", "Spring Boot", "PostgreSQL"],
                  },
                  {
                    title: "Room Radar",
                    description:
                      "A web-based platform designed to bridge the gap between landlords and individuals searching for rental properties.",
                    tags: ["Java", "Web", "Database"],
                  },
                  {
                    title: "ATM Application",
                    description:
                      "A simulated system that handles account creation, authentication, and transaction tracking for basic banking operations.",
                    tags: ["Java", "OOP", "Authentication"],
                  },
                ].map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className={`p-5 rounded-lg border ${
                      theme === "dark" ? "border-gray-700 bg-gray-800/30" : "border-gray-200 bg-gray-50/50"
                    }`}
                  >
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className={`mb-4 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className={`${
                            theme === "dark"
                              ? "bg-gray-700 border-gray-600 text-gray-200"
                              : "bg-white border-gray-200 text-gray-800"
                          }`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
