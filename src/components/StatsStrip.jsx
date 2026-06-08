import { useEffect } from 'react'
import anime from 'animejs'

const STATS = [
  { target: 195, suffix: '+', label: 'Sacred Temples' },
  { target: 10,  suffix: '',  label: 'Indian Languages' },
  { target: 500, suffix: '+', label: 'Sacred Texts' },
  { target: 100, suffix: '%', label: 'Free Forever' },
]

export default function StatsStrip() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target
        const target = parseInt(el.dataset.target)
        const suffix = el.dataset.suffix || ''
        anime({
          targets: { val: 0 },
          val: target,
          round: 1,
          duration: 1600,
          easing: 'easeOutCubic',
          update(anim) {
            el.textContent = Math.round(anim.animations[0].currentValue) + suffix
          },
        })
        observer.unobserve(el)
      })
    }, { threshold: 0.6 })

    document.querySelectorAll('.stat-num[data-target]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="stats-strip">
      <div className="stats-inner">
        {STATS.map(s => (
          <div key={s.label} className="stat-item">
            <div className="stat-num" data-target={s.target} data-suffix={s.suffix}>0</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
