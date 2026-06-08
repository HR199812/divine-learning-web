import { useEffect } from 'react'
import anime from 'animejs'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import StatsStrip from '../components/StatsStrip'
import GallerySection from '../components/GallerySection'
import FeaturesSection from '../components/FeaturesSection'
import TemplesSection from '../components/TemplesSection'
import LanguagesSection from '../components/LanguagesSection'
import ToolsSection from '../components/ToolsSection'
import DownloadSection from '../components/DownloadSection'

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target
        if (el.classList.contains('bento-item')) {
          const siblings = [...el.closest('.bento').querySelectorAll('.bento-item')]
          anime({ targets: siblings, opacity: [0, 1], translateY: [30, 0], delay: anime.stagger(70), duration: 800, easing: 'easeOutCubic' })
          siblings.forEach(s => observer.unobserve(s))
        } else if (el.classList.contains('tool-item')) {
          const siblings = [...el.closest('.tools-bento').querySelectorAll('.tool-item')]
          anime({ targets: siblings, opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(60), duration: 700, easing: 'easeOutCubic' })
          siblings.forEach(s => observer.unobserve(s))
        } else {
          anime({ targets: el, opacity: [0, 1], translateY: [20, 0], duration: 700, easing: 'easeOutCubic' })
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll(
      '.bento-item, .tool-item, .section-eyebrow, .section-title, .section-sub, .temples-big-num, .lang-layout'
    ).forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

export default function Home() {
  useScrollReveal()

  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <GallerySection />
      <FeaturesSection />
      <TemplesSection />
      <LanguagesSection />
      <ToolsSection />
      <DownloadSection />
      <Footer />
    </>
  )
}
