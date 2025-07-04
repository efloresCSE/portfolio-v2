"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, PerspectiveCamera, Html } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ExternalLink, Menu, X } from "lucide-react"
import { ThreeEvent } from '@react-three/fiber'



// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}

// Types
interface Project {
  title: string
  description: string
  tech: string[]
  link: string
}

interface ProjectPlanet {
  title: string
  link: string
  color: string
  particleIndex: number
}

interface Certification {
  title: string
  company: string
  location: string
  year: string
}

interface Education {
  degree: string
  school: string
  gpa: string
  location: string
}

// Data
const navigation = [
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Education", id: "education" },
  { name: "Projects", id: "projects" },
  { name: "Certifications", id: "certifications" },
]

const projects: Project[] = [
  {
    title: "PomoXV",
    description: "Time Management Web Application",
    tech: ["JavaScript", "HTML", "CSS", "Github"],
    link: "https://nickkro25.github.io/cse112_team15/",
  },
  {
    title: "TXT2DB",
    description: "Custom Built Relational Database with SQL Functionality",
    tech: ["C++", "SQL", "QT", "Github"],
    link: "https://github.com/efloresCSE/relational_database",
  },
  {
    title: "3D Portfolio Website v2",
    description: "Personal Website built with Modern Frontend and 3D Technologies",
    tech: ["React", "Next.js", "Three.js", "TypeScript", "Tailwind CSS"],
    link: "https://eflorescse.github.io/",
  },
  {
    title: "Eco Musica - AR Poster",
    description: "Immersive Augmented Reality Experience",
    tech: ["A-Frame", "JavaScript", "HTML", "CSS", "8th Wall"],
    link: "https://github.com/efloresCSE/Eco-Musica-AR-Poster",
  },
  {
    title: "Public Perception and Crime: Yelp Review Analysis of San Diego Parks",
    description: "Data Analysis and Visualization Project",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Github"],
    link: "https://eflorescse.github.io/data-analysis-project/",
  },
]

const certifications: Certification[] = [
  {
    title: "Front End Developer",
    company: "Meta",
    location: "Menlo Park, CA",
    year: "2025",
  },
  {
    title: "Back End Developer",
    company: "Meta",
    location: "Menlo Park, CA",
    year: "2025",
  },
  {
    title: "Database Engineer",
    company: "Meta",
    location: "Menlo Park, CA",
    year: "2025",
  },
  {
    title: "Android Developer",
    company: "Meta",
    location: "Menlo Park, CA",
    year: "2025",
  },
  {
    title: "Certified Solutions Architect - Associate",
    company: "AWS",
    location: "Seattle, WA",
    year: "2024",
  },
  {
    title: "Certified Cloud Practitioner",
    company: "AWS",
    location: "Seattle, WA",
    year: "2023",
  },
]

const education: Education[] = [
  {
    degree: "B.S. in Computer Science",
    school: "University of California, San Diego",
    gpa: "3.9",
    location: "San Diego, CA",
  },
]

const projectPlanets: ProjectPlanet[] = [
  {
    title: "PomoXV",
    link: "https://nickkro25.github.io/cse112_team15/",
    color: "#3b82f6",
    particleIndex: 0,
  },
  {
    title: "TXT2DB",
    link: "https://github.com/efloresCSE/relational_database",
    color: "#f59e0b",
    particleIndex: 5,
  },
  {
    title: "3D Portfolio Website v2",
    link: "https://eflorescse.github.io/",
    color: "#3b82f6",
    particleIndex: 10,
  },
  {
    title: "Eco Musica - AR Poster",
    link: "https://github.com/efloresCSE/Eco-Musica-AR-Poster",
    color: "#f59e0b",
    particleIndex: 15,
  },
  {
    title: "Yelp Review Analysis",
    link: "https://eflorescse.github.io/data-analysis-project/",
    color: "#10b981",
    particleIndex: 20,
  },
]

const mobileProjectPlanets: ProjectPlanet[] = [
  {
    title: "PomoXV",
    link: "https://nickkro25.github.io/cse112_team15/",
    color: "#3b82f6",
    particleIndex: 0,
  },
  {
    title: "TXT2DB",
    link: "https://github.com/efloresCSE/relational_database",
    color: "#f59e0b",
    particleIndex: 2,
  },
  {
    title: "3D Portfolio Website v2",
    link: "https://eflorescse.github.io/",
    color: "#3b82f6",
    particleIndex: 4,
  },
  {
    title: "Eco Musica - AR Poster",
    link: "https://github.com/efloresCSE/Eco-Musica-AR-Poster",
    color: "#10b981",
    particleIndex: 6,
  },
  {
    title: "Yelp Review Analysis",
    link: "https://eflorescse.github.io/data-analysis-project/",
    color: "#8b5cf6",
    particleIndex: 8,
  },
]

// Components
function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const timer = setTimeout(() => onComplete(), 4500)
    return () => clearTimeout(timer)
  }, [onComplete])

  const particles = useMemo(() => {
    if (!hasMounted) return []
    return Array.from({ length: 60 }).map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      delay: Math.random(),
      repeatDelay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }))
  }, [hasMounted])

  if (!hasMounted) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-blue-900 to-amber-900 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            initial={{ x: particle.x, y: particle.y, scale: 1, opacity: 0.3 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: particle.repeatDelay,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        className="text-center z-10 px-8"
      >
        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6">Welcome</h1>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-blue-400 to-amber-400 mx-auto mb-12"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-amber-400 bg-clip-text text-transparent">
            EDGAR FLORES
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-blue-200 font-light">Software Engineer & Digital Craftsman</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="flex items-center justify-center space-x-4"
        >
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-blue-400 to-amber-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <span className="text-blue-200 text-sm tracking-wide">Loading Portfolio...</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

function ProjectPlanet({
  position,
  project,
  isMobile = false,
}: {
  position: [number, number, number]
  project: ProjectPlanet
  isMobile?: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)

  // Scale down for mobile and make them always highlighted
  const scale = isMobile ? 0.35 : 1
  const isHighlighted = isMobile || hovered

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02
      meshRef.current.rotation.x += 0.01
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.01
    }
  })

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setHovered(true)
    document.body.style.cursor = "pointer"
  }

  const handlePointerLeave = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    hoverTimeout.current = setTimeout(() => {
      setHovered(false)
      document.body.style.cursor = "default"
    }, 100)
  }

  const handleClick = () => {
    window.open(project.link, "_blank")
  }

  return (
    <group
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <mesh ref={glowRef} scale={(isHighlighted ? 2.4 : 2.0) * scale}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={isHighlighted ? 0.5 : 0.25}
          transparent
          opacity={isHighlighted ? 0.28 : 0.14}
        />
      </mesh>

      <mesh ref={meshRef} scale={(isHighlighted ? 1.6 : 1.3) * scale}>
        <icosahedronGeometry args={[0.1, 1]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={isHighlighted ? 0.5 : 0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} scale={(isHighlighted ? 1.8 : 1.5) * scale}>
        <ringGeometry args={[0.15, 0.18, 32]} />
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={isHighlighted ? 0.8 : 0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh scale={(isHighlighted ? 0.75 : 0.55) * scale}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={isHighlighted ? 1 : 0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Always show labels on mobile, only on hover for desktop */}
      {(isMobile || hovered) && (
        <Html center style={{ pointerEvents: "none" }}>
          <div
            className={`bg-black/90 text-white px-2 py-1 rounded-lg font-medium whitespace-nowrap transform border border-white/20 ${
              isMobile ? "text-xs -translate-y-6" : "text-sm -translate-y-8"
            }`}
          >
            <div className={`font-bold ${isMobile ? "text-xs" : ""}`}>{project.title}</div>
            {!isMobile && <div className="text-xs text-gray-300 mt-1">Tap to view project</div>}
          </div>
        </Html>
      )}
    </group>
  )
}

function OrbitingParticles() {
  const particlesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.06
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.1
      particlesRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.017) * 0.08

      const wobbleX = Math.sin(state.clock.elapsedTime * 0.07) * 0.18
      const wobbleZ = Math.cos(state.clock.elapsedTime * 0.06) * 0.15
      particlesRef.current.rotation.x += wobbleX
      particlesRef.current.rotation.z += wobbleZ
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.015) * 0.4
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 24 }).map((_, i) => {
        const planetAtThisIndex = projectPlanets.find((p) => p.particleIndex === i)

        if (planetAtThisIndex) {
          const position: [number, number, number] = [
            Math.cos((i / 24) * Math.PI * 2) * 4.2,
            0,
            Math.sin((i / 24) * Math.PI * 2) * 4.2,
          ]
          return (
            <ProjectPlanet key={`planet-${planetAtThisIndex.title}`} position={position} project={planetAtThisIndex} />
          )
        }

        return (
          <mesh
            key={`particle-${i}`}
            position={[Math.cos((i / 24) * Math.PI * 2) * 4.2, 0, Math.sin((i / 24) * Math.PI * 2) * 4.2]}
          >
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#f59e0b" : "#10b981"}
              emissive={i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#f59e0b" : "#10b981"}
              emissiveIntensity={0.3}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function MobileOrbitingParticles() {
  const particlesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.08
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.025) * 0.15
      particlesRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.03) * 0.12

      const wobbleX = Math.sin(state.clock.elapsedTime * 0.08) * 0.12
      const wobbleZ = Math.cos(state.clock.elapsedTime * 0.07) * 0.1
      particlesRef.current.rotation.x += wobbleX
      particlesRef.current.rotation.z += wobbleZ

      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.02) * 0.2 - 1.7
    }
  })

  const radius = 1.6
  const planetCount = mobileProjectPlanets.length

  return (
    <group ref={particlesRef} rotation={[Math.PI / 6, 0, Math.PI / 8]}>
      {/* Project Planets */}
      {mobileProjectPlanets.map((project, i) => {
        const angle = (i / planetCount) * Math.PI * 2
        const pos: [number, number, number] = [
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius,
        ]

        return (
          <ProjectPlanet
            key={`mobile-planet-${project.title}`}
            position={pos}
            project={project}
            isMobile={true}
          />
        )
      })}

      {/* In-between Particles with blended colors */}
      {mobileProjectPlanets.map((_, i) => {
        const nextIndex = (i + 1) % planetCount

        const angle1 = (i / planetCount) * Math.PI * 2
        const angle2 = ((i + 1) / planetCount) * Math.PI * 2
        const midAngle = (angle1 + angle2) / 2
        const pos: [number, number, number] = [
          Math.cos(midAngle) * radius,
          0,
          Math.sin(midAngle) * radius,
        ]

        const colorA = new THREE.Color(mobileProjectPlanets[i].color)
        const colorB = new THREE.Color(mobileProjectPlanets[nextIndex].color)
        const midColor = colorA.clone().lerp(colorB, 0.5)

        return (
          <mesh key={`mid-particle-${i}`} position={pos}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshStandardMaterial
              color={midColor}
              emissive={midColor}
              emissiveIntensity={0.25}
            />
          </mesh>
        )
      })}
    </group>
  )
}




function CentralContent() {
  const isMobile = useIsMobile()

  return (
      <Html center position={[0, 0.6, 0]} style={{ pointerEvents: "none" }}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <div className="w-20 h-20 md:w-32 md:h-32 mx-auto relative pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-amber-400 rounded-full animate-pulse pointer-events-none" />
            <div className="absolute inset-2 rounded-full overflow-hidden pointer-events-auto">
              <Image
                src="/profile.jpg"
                alt="Edgar Flores"
                width={isMobile ? 64 : 120}
                height={isMobile ? 64 : 120}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-3xl md:text-6xl font-bold text-amber-400 whitespace-nowrap mb-3 md:mb-4 pointer-events-none"
        >
          EDGAR FLORES
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-lg md:text-2xl text-blue-200 font-light mb-4 md:mb-6 pointer-events-none"
        >
          Software Engineer
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-sm md:text-lg text-blue-100 font-light max-w-xs md:max-w-2xl leading-relaxed mb-4 md:mb-6 pointer-events-none px-4"
        >
          Turning ideas into reliable software, from backend logic to intuitive interfaces.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-xs md:text-sm text-blue-300 font-light pointer-events-none"
        >
          {isMobile ? "Tap the planets to explore my projects" : "Hover over the planets to explore my projects"}
        </motion.div>
      </div>
    </Html>
  )
}

function Scene3D() {
  const isMobile = useIsMobile()

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#f59e0b" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
      <spotLight position={[5, 5, 5]} intensity={0.3} color="#10b981" />
      <Environment preset="night" />
      <CentralContent />
      {isMobile ? <MobileOrbitingParticles /> : <OrbitingParticles />}
    </>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
      <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">{children}</span>
    </h2>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="group block"
    >
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 overflow-hidden h-full hover:border-amber-400/50 hover:scale-105 transition-all">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-blue-100 mb-4 leading-relaxed text-sm md:text-base">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <Badge key={tech} className="bg-white/10 text-white border border-white/20 hover:bg-white/20 text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="text-amber-400 hover:text-amber-300 flex items-center text-sm md:text-base">
              View Project
              <ExternalLink className="w-4 h-4 ml-2" />
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  )
}

export default function Portfolio() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeSection, setActiveSection] = useState("about")
  const [manualScrollLock, setManualScrollLock] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navigation.map((item) => item.id)
    const observers: IntersectionObserver[] = []

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                entry.isIntersecting &&
                entry.intersectionRatio > 0.5 &&
                !manualScrollLock &&
                activeSection !== sectionId
              ) {
                setActiveSection(sectionId)
              }
            })
          },
          {
            threshold: [0.3, 0.5, 0.7],
            rootMargin: "-10% 0px -10% 0px",
          },
        )

        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [manualScrollLock, activeSection])

  const scrollToSection = (sectionId: string) => {
    setManualScrollLock(true)
    setActiveSection(sectionId)
    setMobileMenuOpen(false) // Close mobile menu when navigating

    const target = document.getElementById(sectionId)
    if (target) {
      const topOffset = target.offsetTop
      window.scrollTo({ top: topOffset, behavior: "smooth" })
    }

    setTimeout(() => {
      setManualScrollLock(false)
    }, 1200)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-amber-900">
      <AnimatePresence mode="wait">
        {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{
          duration: 1,
          delay: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-amber-900"
      >
        {/* Desktop Navigation */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: showIntro ? -100 : 0,
            opacity: showIntro ? 0 : 1,
          }}
          transition={{
            duration: 0.8,
            delay: showIntro ? 0 : 1,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
            <div className="flex space-x-6">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    activeSection === item.id ? "bg-amber-500 text-blue-900" : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: showIntro ? -100 : 0,
            opacity: showIntro ? 0 : 1,
          }}
          transition={{
            duration: 0.8,
            delay: showIntro ? 0 : 1,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="fixed top-4 right-4 z-[75] md:hidden"
        >
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-white/10 backdrop-blur-xl rounded-full p-3 border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70] md:hidden"
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="absolute right-0 top-0 h-full w-64 bg-slate-900/98 backdrop-blur-xl border-l border-white/20 shadow-2xl"
              >
                <div className="flex flex-col pt-20 px-6">
                  {navigation.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left py-4 px-4 rounded-lg text-lg font-medium transition-all ${
                        activeSection === item.id ? "bg-amber-500 text-blue-900" : "text-white hover:bg-white/10"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <section id="about" className="h-screen relative overflow-hidden">
          <div className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? "blur-sm scale-95" : ""}`}>
            <Canvas
              className="absolute inset-0"
              onPointerMissed={() => {
                document.body.style.cursor = "default"
              }}
            >
              <Scene3D />
            </Canvas>
          </div>
        </section>

        <section id="experience" className="pt-20 md:pt-40 pb-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeader>Experience</SectionHeader>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        Full Stack Software Engineer (Startup)
                      </h3>
                      <p className="text-amber-300">Connectado Inc</p>
                    </div>
                    <Badge variant="outline" className="border-amber-500/50 text-amber-300 w-fit mt-2 md:mt-0">
                      Present
                    </Badge>
                  </div>
                  <p className="text-blue-100 leading-relaxed text-sm md:text-base">
                    Contributed end-to-end as a full-stack engineer—built UI components in React/Next.js, designed and
                    maintained backend data systems, and supported development across the stack.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white">Software Engineer</h3>
                      <p className="text-amber-300">Ad Astra Media</p>
                    </div>
                    <Badge variant="outline" className="border-amber-500/50 text-amber-300 w-fit mt-2 md:mt-0">
                      Present
                    </Badge>
                  </div>
                  <p className="text-blue-100 leading-relaxed text-sm md:text-base">
                    Spearheaded front-end and AR development for interactive web and mobile experiences using React,
                    Next.js, TypeScript, A-Frame and 8th Wall. Partnered with cross-functional teams to align immersive
                    features with project objectives and user needs.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="education" className="pt-20 md:pt-40 pb-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeader>Education</SectionHeader>
              {education.map((edu, index) => (
                <a
                  key={index}
                  href="https://cse.ucsd.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:border-amber-400/50 transition-all hover:scale-105">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                            {edu.degree}
                          </h3>
                          <p className="text-amber-300 font-medium">{edu.school}</p>
                          <p className="text-blue-200 text-sm">{edu.location}</p>
                        </div>
                        <Badge variant="outline" className="border-amber-500/50 text-amber-300 w-fit mt-2 md:mt-0">
                          GPA: {edu.gpa}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="projects" className="pt-20 md:pt-40 pb-32 md:pb-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeader>Featured Projects</SectionHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {projects.map((project, index) => (
                  <ProjectCard key={project.title} project={project} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="certifications"
          className="min-h-screen flex items-center justify-center pt-20 md:pt-40 pb-40 md:pb-60 px-4 md:px-8"
        >
          <div className="max-w-6xl w-full mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeader>Certifications</SectionHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={`${cert.company}-${cert.title}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 overflow-hidden h-full hover:border-amber-400/50 transition-all">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                              {cert.title}
                            </h3>
                            <p className="text-amber-300 font-medium">{cert.company}</p>
                            <p className="text-blue-200 text-sm">{cert.location}</p>
                          </div>
                          <Badge variant="outline" className="border-amber-500/50 text-amber-300 w-fit mt-2 md:mt-0">
                            {cert.year}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
