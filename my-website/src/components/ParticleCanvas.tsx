import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
  opacity: number
}

interface ParticleCanvasProps {
  className?: string
}

const PARTICLE_COUNT = 80
const PARTICLE_COLOR_LIGHT = 'rgba(59, 130, 246, 0.4)'
const PARTICLE_COLOR_DARK = 'rgba(56, 189, 248, 0.35)'

function getParticleColor(): string {
  return document.documentElement.classList.contains('dark')
    ? PARTICLE_COLOR_DARK
    : PARTICLE_COLOR_LIGHT
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.2,
  }
}

export default function ParticleCanvas({ className }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)
    const color = getParticleColor()

    particlesRef.current.forEach((p) => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = color.replace(/[\d.]+\)$/, `${p.opacity})`)
      ctx.fill()
    })
  }

  const resize = (canvas: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
      particlesRef.current = Array.from(
        { length: PARTICLE_COUNT },
        () => createParticle(window.innerWidth, window.innerHeight)
      )
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 初始化粒子
    resize(canvas)
    draw(ctx, window.innerWidth, window.innerHeight)

    // 检查是否需要动画（prefers-reduced-motion）
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mediaQuery.matches) {
      let angle = 0
      const animate = () => {
        angle += 0.002
        particlesRef.current.forEach((p) => {
          // 缓慢漂移
          p.x += Math.cos(angle + p.y * 0.001) * 0.15
          p.y += Math.sin(angle + p.x * 0.001) * 0.15
          // 边界循环
          if (p.x < 0) p.x = window.innerWidth
          if (p.x > window.innerWidth) p.x = 0
          if (p.y < 0) p.y = window.innerHeight
          if (p.y > window.innerHeight) p.y = 0
        })
        draw(ctx, window.innerWidth, window.innerHeight)
        animationFrameRef.current = requestAnimationFrame(animate)
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // resize 监听
    const handleResize = () => resize(canvas)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className ?? ''}`}
    />
  )
}
