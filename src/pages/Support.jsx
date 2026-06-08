import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LegalNav from '../components/LegalNav'

function CopyEmailCard() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('admin@canvadb.com').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="contact-card">
      <div className="contact-icon"><i className="fa-solid fa-envelope"></i></div>
      <h3>Email Support</h3>
      <p>For account issues, data requests, or anything else.</p>
      <div className="copy-email-wrap">
        <button className="copy-email-btn" onClick={handleCopy}>
          <i className="fa-solid fa-copy"></i> admin@canvadb.com
        </button>
        <div className={`copy-tooltip${copied ? ' show' : ''}`}>Copied!</div>
      </div>
    </div>
  )
}

export default function Support() {
  useEffect(() => { document.title = 'Support — Aradhana' }, [])

  return (
    <>
      <LegalNav />

      <div className="support-hero">
        <div className="page-eyebrow"><i className="fa-solid fa-circle-question"></i> Help Centre</div>
        <h1 className="page-title">How can we help?</h1>
        <p className="page-sub">Find answers below or reach out directly — we're here to support your spiritual journey.</p>
      </div>

      <div className="contact-strip">
        <CopyEmailCard />
        <div className="contact-card">
          <div className="contact-icon"><i className="fa-solid fa-mobile-screen"></i></div>
          <h3>In-App Feedback</h3>
          <p>Send feedback directly from the app.</p>
          <span>Profile → Give Feedback</span>
        </div>
        <div className="contact-card">
          <div className="contact-icon"><i className="fa-solid fa-clock"></i></div>
          <h3>Response Time</h3>
          <p>We aim to reply to all emails within 2 business days.</p>
          <span>Mon – Sat, 10 AM – 6 PM IST</span>
        </div>
      </div>

      <div className="faq-section">
        <h2 className="faq-header"><i className="fa-solid fa-circle-question"></i> Frequently Asked Questions</h2>

        <div className="faq-group">
          <div className="faq-group-title"><i className="fa-solid fa-user"></i> Account & Login</div>
          <details>
            <summary>How do I create an account?</summary>
            <div className="faq-answer">Open the app and tap "Continue with Phone". Enter your mobile number, receive an OTP, and verify. You can optionally add your name and preferred language during registration.</div>
          </details>
          <details>
            <summary>I didn't receive the OTP. What should I do?</summary>
            <div className="faq-answer">OTPs are currently delivered as a development feature and may be logged server-side. If you're facing issues, please contact us at <a href="mailto:admin@canvadb.com">admin@canvadb.com</a> and we'll help you access your account.</div>
          </details>
          <details>
            <summary>Can I use the app without an account?</summary>
            <div className="faq-answer">Yes. Tap "Continue without account" on the login screen. You can use all features in guest mode. Your chanting data will be stored locally on your device and will sync automatically if you sign in later.</div>
          </details>
          <details>
            <summary>How do I delete my account?</summary>
            <div className="faq-answer">Email us at <a href="mailto:admin@canvadb.com">admin@canvadb.com</a> with your registered phone number and we will permanently delete your account and all associated data within 7 business days.</div>
          </details>
          <details>
            <summary>How do I change my language?</summary>
            <div className="faq-answer">Go to Profile → Language Preferences and select from 10 available languages: English, Hindi, Bengali, Marathi, Gujarati, Odia, Tamil, Telugu, Kannada, Malayalam. The app UI, temple information, and Panchang will update immediately.</div>
          </details>
        </div>

        <div className="faq-group">
          <div className="faq-group-title"><i className="fa-solid fa-circle-dot"></i> Mala Jaap & Chanting</div>
          <details>
            <summary>How does the Mala counter work?</summary>
            <div className="faq-answer">Tap the rudraksha bead to count each repetition. Every 108 taps completes one Mala round. The counter tracks your total Jaap count, total Malas, and daily streaks. You can switch between different chants (Om, Ram, Krishna, Radha, etc.) using the chips below the bead.</div>
          </details>
          <details>
            <summary>My chant count reset after closing the app. What happened?</summary>
            <div className="faq-answer">Counts sync to the server every 5 seconds via a debounced background sync. If you closed the app very quickly after chanting, a few counts may not have synced. The count shown on app open is fetched from the server. If you're a guest user, data is in AsyncStorage on your device and should persist.</div>
          </details>
          <details>
            <summary>How is the streak calculated?</summary>
            <div className="faq-answer">A streak counts consecutive days on which you completed at least one chanting session. Chanting again on the same day does not reset or extend the streak — it updates the next day. If you miss a day, your streak resets to 1.</div>
          </details>
        </div>

        <div className="faq-group">
          <div className="faq-group-title"><i className="fa-solid fa-moon"></i> Panchang, Muhurat & Kundli</div>
          <details>
            <summary>The Panchang shows wrong data for my location.</summary>
            <div className="faq-answer">Make sure location permission is granted in your device settings (Settings → Aradhana → Location → While Using). The app falls back to New Delhi if permission is denied. Panchang data is fetched from the VedAstro API using your coordinates.</div>
          </details>
          <details>
            <summary>How accurate is the Kundli / birth chart?</summary>
            <div className="faq-answer">The Kundli is computed by the VedAstro public API using Vedic (sidereal) astrology. It is provided for informational purposes only. For important life decisions, please consult a qualified Jyotishi (astrologer).</div>
          </details>
          <details>
            <summary>Why is Brahma Muhurta absent on some days?</summary>
            <div className="faq-answer">Brahma Muhurta is computed as 96 minutes before sunrise. On days with very early sunrise or missing VedAstro data, it may not display. Abhijit Muhurat is absent on Wednesdays as per tradition.</div>
          </details>
        </div>

        <div className="faq-group">
          <div className="faq-group-title"><i className="fa-solid fa-map-location-dot"></i> Temple Map</div>
          <details>
            <summary>A temple's information seems incorrect or outdated.</summary>
            <div className="faq-answer">Temple information — timings, directions, descriptions — can change. If you notice something incorrect, please email us at <a href="mailto:admin@canvadb.com">admin@canvadb.com</a> with the temple name and the correction. We review and update regularly.</div>
          </details>
          <details>
            <summary>Can I suggest a temple to be added?</summary>
            <div className="faq-answer">Yes! Open the Temple Map screen, tap the "+" button (suggest temple), and fill in the name, deity, and coordinates. Our team will review and add it if it meets our guidelines. You can also email us with temple details.</div>
          </details>
          <details>
            <summary>Temple details are showing in English even though I selected Hindi.</summary>
            <div className="faq-answer">Most temples are fully translated into all 9 Indian languages. For a small number of recently added temples, on-the-fly translation may take a few seconds on first load. The translated text is then cached for future visits.</div>
          </details>
        </div>

        <div className="faq-group">
          <div className="faq-group-title"><i className="fa-solid fa-wand-magic-sparkles"></i> AI Guide & Content</div>
          <details>
            <summary>The AI gave an incorrect or inaccurate answer about Hindu scripture.</summary>
            <div className="faq-answer">AI responses are generated by a language model and can contain inaccuracies. We include a disclaimer: <em>"AI is not a pandit or God. Responses may be inaccurate — always consult a pandit or spiritual person."</em> For authoritative answers, please refer to a qualified religious scholar.</div>
          </details>
          <details>
            <summary>The AI chat is not responding / shows a connection error.</summary>
            <div className="faq-answer">The AI feature requires an active internet connection and depends on our AI provider's availability. If you see an error, please check your connection and try again. If the issue persists for more than a few hours, contact us at <a href="mailto:admin@canvadb.com">admin@canvadb.com</a>.</div>
          </details>
        </div>

        <div className="faq-group">
          <div className="faq-group-title"><i className="fa-solid fa-circle-info"></i> General</div>
          <details>
            <summary>Is the app really free? Are there hidden costs?</summary>
            <div className="faq-answer">Yes, completely free. No ads, no subscriptions, no in-app purchases, no premium tier. If you'd like to support the app's development, you can donate via the UPI option in Profile → Support This App. Every contribution is optional and deeply appreciated.</div>
          </details>
          <details>
            <summary>The app is not working / keeps crashing.</summary>
            <div className="faq-answer">
              Try these steps:
              <ul>
                <li>Force-close and reopen the app</li>
                <li>Check for app updates in the App Store / Google Play</li>
                <li>Restart your device</li>
                <li>Uninstall and reinstall the app (your account data is stored on our servers and will sync back)</li>
              </ul>
              If the problem persists, email us with your device model, OS version, and a description of what happened.
            </div>
          </details>
          <details>
            <summary>How do I enable / disable daily reminders?</summary>
            <div className="faq-answer">Go to Profile → Daily Reminders and toggle it on or off. When enabled, you'll receive a morning Pooja reminder at 7 AM and an evening Mala Jaap reminder at 6 PM. You can also manage notification permissions in your device's system settings.</div>
          </details>
          <details>
            <summary>I want to request a new feature.</summary>
            <div className="faq-answer">We love hearing from users! Use Profile → Give Feedback or email <a href="mailto:admin@canvadb.com">admin@canvadb.com</a> with your suggestion. We read every message.</div>
          </details>
        </div>
      </div>

      <footer className="legal-footer">
        <p>© 2026 Aradhana &nbsp;·&nbsp; <Link to="/">Home</Link> &nbsp;·&nbsp; <Link to="/privacy-policy">Privacy Policy</Link> &nbsp;·&nbsp; <Link to="/terms">Terms &amp; Conditions</Link></p>
      </footer>
    </>
  )
}
