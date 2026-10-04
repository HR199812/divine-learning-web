import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import anime from 'animejs'

/*
 * The mandala — seven counter-rotating rings of points.
 *
 * ─── A LIGHT GROUND INVERTS THE SIZING PROBLEM ───
 * These were authored for a black page, where a bright dot blooms and reads
 * larger than it is. On cream the opposite happens: a dark dot on a light ground
 * reads *smaller*, so the same geometry fades out.
 *
 * It was also literally sub-pixel. With `sizeAttenuation` on, rendered size is
 * about `size * 144` at this camera distance, so the three outer rings came out
 * at **1.15, 1.44 and 1.88px** — invisible before contrast even entered into it.
 * Sizes now run 6.6px at the centre to 2.7px at the rim.
 *
 * ─── OPACITY CARRIES THE DEPTH NOW ───
 * The old ramp was a flat 0.8 and let size alone suggest distance. With sizes
 * compressed into a narrower band, recession has to come from somewhere else, so
 * each ring fades outward instead.
 *
 * Colours are the app mark's own (`constants/padma.ts`): #A84200 is the
 * Sandalwood accent, #8F6B43 the darkened chandan — both measured on this cream.
 * The originals (#FF6B00 / #FFB340) are 2.4:1 and 1.6:1 here.
 */
const RING_DEFS = [
  { r: 0.5,  n: 20,  color: 0xA84200, size: 0.046, opacity: 0.85, speed:  0.008 },
  { r: 1.0,  n: 32,  color: 0x8F6B43, size: 0.039, opacity: 0.78, speed: -0.006 },
  { r: 1.6,  n: 48,  color: 0xA84200, size: 0.033, opacity: 0.70, speed:  0.004 },
  { r: 2.2,  n: 64,  color: 0x8F6B43, size: 0.029, opacity: 0.62, speed: -0.003 },
  { r: 2.9,  n: 80,  color: 0xA84200, size: 0.025, opacity: 0.52, speed:  0.002 },
  { r: 3.6,  n: 96,  color: 0xB08A5E, size: 0.022, opacity: 0.44, speed: -0.0015 },
  { r: 4.4,  n: 108, color: 0x8F6B43, size: 0.019, opacity: 0.34, speed:  0.001 },
]

export default function HeroSection() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 6

    const isMobile = window.innerWidth < 768
    const rings = []

    RING_DEFS.slice(0, isMobile ? 4 : 7).forEach(def => {
      const positions = new Float32Array(def.n * 3)
      for (let i = 0; i < def.n; i++) {
        const a = (i / def.n) * Math.PI * 2
        positions[i * 3]     = Math.cos(a) * def.r
        positions[i * 3 + 1] = Math.sin(a) * def.r
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const mat = new THREE.PointsMaterial({ color: def.color, size: def.size, transparent: true, opacity: def.opacity })
      const pts = new THREE.Points(geo, mat)
      pts.userData.speed = def.speed
      scene.add(pts)
      rings.push(pts)
    })

    const centerGeo = new THREE.SphereGeometry(0.06, 16, 16)
    const centerMat = new THREE.MeshBasicMaterial({ color: 0xA84200 })
    scene.add(new THREE.Mesh(centerGeo, centerMat))

    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.3
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3
    }
    document.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    let animFrameId
    const tick = () => {
      animFrameId = requestAnimationFrame(tick)
      rings.forEach(r => { r.rotation.z += r.userData.speed })
      camera.position.x += (mouseX - camera.position.x) * 0.03
      camera.position.y += (-mouseY - camera.position.y) * 0.03
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(animFrameId)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    anime.timeline({ easing: 'easeOutCubic' })
      .add({ targets: '.hero-badge',   opacity: [0, 1], translateY: [20, 0], duration: 700 }, 400)
      .add({ targets: '.hero-title',   opacity: [0, 1], translateY: [40, 0], duration: 800 }, 600)
      .add({ targets: '.hero-sub',     opacity: [0, 1], translateY: [24, 0], duration: 700 }, 900)
      .add({ targets: '.hero-actions', opacity: [0, 1], translateY: [20, 0], duration: 600 }, 1100)
  }, [])

  return (
    <section className="hero">
      <canvas id="hero-canvas" ref={canvasRef}></canvas>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <i className="fa-solid fa-heart"></i>
          Free Forever &nbsp;·&nbsp; No Ads &nbsp;·&nbsp; No Paywalls
        </div>
        <h1 className="hero-title"><em>Aradhana Kit</em></h1>
        <p className="hero-sub">Your complete Hindu spiritual companion. Japa Mala, sacred texts, 195+ temples, and AI guidance — in 10 Indian languages.</p>
        <div className="hero-actions">
          <a href="#download" className="btn-primary">
            <i className="fa-solid fa-mobile-screen"></i> Get the App
          </a>
          <a href="#features" className="btn-ghost">
            Explore <i className="fa-solid fa-arrow-down"></i>
          </a>
        </div>
      </div>
      <div className="scroll-hint">
        <span>Scroll</span>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
    </section>
  )
}
