const TOOLS = [
  { icon: 'fa-fire-flame-curved', title: 'Streak Tracking',     desc: 'Build daily chanting habits with streak counters and a full calendar of your practice history.' },
  { icon: 'fa-bell',              title: 'Daily Reminders',      desc: 'Morning Pooja and evening Mala Jaap notifications, scheduled locally on your device.' },
  { icon: 'fa-face-smile-beam',   title: 'Mood-based Gita',      desc: 'Pick your mood — get the perfect Bhagavad Gita shloka, recited aloud in your language.' },
  { icon: 'fa-list-check',        title: 'Pooja Guide',          desc: 'Step-by-step rituals with Samagri lists, mantras, and durations for 10+ Poojas.' },
  { icon: 'fa-user-shield',       title: 'Guest Mode',           desc: 'Use the full app without an account. Chanting data syncs automatically when you sign in.' },
  { icon: 'fa-circle-half-stroke',title: 'Light & Dark Theme',   desc: 'A warm saffron design that adapts to your system — beautiful in any lighting.' },
]

export default function ToolsSection() {
  return (
    <section id="tools" className="section">
      <div className="container">
        <div className="section-eyebrow"><i className="fa-solid fa-hands-praying"></i> Daily Practice</div>
        <h2 className="section-title">Built for <em>Consistency</em></h2>
        <p className="section-sub">Structured tools to support a meaningful, uninterrupted spiritual routine — every single day.</p>
        <div className="tools-bento">
          {TOOLS.map(t => (
            <div key={t.title} className="tool-item">
              <div className="tool-icon"><i className={`fa-solid ${t.icon}`}></i></div>
              <div className="tool-text">
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
