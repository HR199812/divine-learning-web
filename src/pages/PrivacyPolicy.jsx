import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LegalNav from '../components/LegalNav'

export default function PrivacyPolicy() {
  useEffect(() => { document.title = 'Privacy Policy — Aradhana' }, [])

  return (
    <>
      <LegalNav />
      <div className="page-wrap">
        <div className="page-eyebrow"><i className="fa-solid fa-shield-halved"></i> Legal</div>
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-meta">Last updated: June 7, 2026 &nbsp;·&nbsp; Effective: June 7, 2026</p>

        <div className="prose">

          <div className="highlight-box">
            <strong>Our commitment:</strong> Aradhana does not sell your data, show ads, or share your personal information with third parties for marketing purposes. We collect only what is necessary to provide you with a spiritual experience.
          </div>

          <h2><i className="fa-solid fa-info-circle"></i>1. Introduction</h2>
          <p>Aradhana ("we", "us", "our") is a free Hindu devotional application developed by Justanothersupremesoul. This Privacy Policy explains how we collect, use, and protect your information when you use our mobile application ("App") and website.</p>
          <p>By using the App, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use the App.</p>

          <h2><i className="fa-solid fa-database"></i>2. Information We Collect</h2>
          <p><strong>Account Information</strong></p>
          <ul>
            <li><strong>Phone number</strong> — used for OTP-based authentication. We do not store OTPs after verification.</li>
            <li><strong>Name</strong> — optional, provided by you during registration or in profile settings.</li>
            <li><strong>Language preference</strong> — your chosen app language (e.g., Hindi, Bengali).</li>
            <li><strong>Theme preference</strong> — light, dark, or system.</li>
          </ul>

          <p><strong>Usage Data</strong></p>
          <ul>
            <li><strong>Chanting history</strong> — mantra name, count, and date of each chanting session.</li>
            <li><strong>Streak and Mala counts</strong> — derived from your chanting history.</li>
            <li><strong>Sankalpa details</strong> — vow intention, duration, and daily target you set.</li>
          </ul>

          <p><strong>Device &amp; Notification Data</strong></p>
          <ul>
            <li><strong>Expo Push Token</strong> — only if you enable daily reminders. Used solely to send you local chanting reminders. Never shared with advertisers.</li>
          </ul>

          <p><strong>Location Data</strong></p>
          <ul>
            <li><strong>Approximate location (lat/lng)</strong> — used only when you view the Panchang or Muhurat screens, to provide location-accurate astronomical data. Location is sent directly to the VedAstro API and is not stored on our servers.</li>
            <li>You can deny location permission; the app will fall back to New Delhi coordinates.</li>
          </ul>

          <p><strong>Kundli / Birth Data</strong></p>
          <ul>
            <li>Birth date, time, and place entered for Kundli or Guna Milan are sent directly to the VedAstro public API. We do not store this information on our servers.</li>
          </ul>

          <p><strong>AI Chat Data</strong></p>
          <ul>
            <li>Messages you send to the AI Spiritual Guide are processed by our configured AI provider (Ollama). We do not store individual chat messages on our servers beyond the duration of your session.</li>
          </ul>

          <p><strong>Guest Mode</strong></p>
          <ul>
            <li>If you use the app without an account, chanting data is stored only on your device via AsyncStorage. No data is transmitted to our servers.</li>
          </ul>

          <h2><i className="fa-solid fa-gears"></i>3. How We Use Your Information</h2>
          <ul>
            <li>To authenticate you and maintain your account</li>
            <li>To store and display your chanting history, streaks, and Sankalpa progress</li>
            <li>To send daily prayer reminders (only if you opt in)</li>
            <li>To provide location-based Panchang and Muhurat data</li>
            <li>To serve translated temple and sacred content in your preferred language</li>
            <li>To improve the App based on aggregate, anonymised usage patterns</li>
          </ul>
          <p>We do <strong>not</strong> use your data for advertising, profiling, or sell it to any third party.</p>

          <h2><i className="fa-solid fa-server"></i>4. Data Storage &amp; Security</h2>
          <p>Your account data is stored on <strong>MongoDB Atlas</strong> (cloud database). We use industry-standard security practices including encrypted connections (TLS) and JWT-based authentication with 7-day token expiry.</p>
          <p>Your JWT token is stored securely in <strong>Expo SecureStore</strong> (iOS Keychain / Android Keystore) on your device — not in plain AsyncStorage.</p>
          <p>We retain your account data as long as your account is active. You may request deletion at any time (see Section 9).</p>

          <h2><i className="fa-solid fa-share-nodes"></i>5. Third-Party Services</h2>
          <p>The App uses the following third-party services. Each has its own privacy policy:</p>
          <ul>
            <li><strong>MongoDB Atlas</strong> (database hosting) — <a href="https://www.mongodb.com/legal/privacy-policy" target="_blank" rel="noreferrer">mongodb.com/legal/privacy-policy</a></li>
            <li><strong>Expo</strong> (app framework &amp; push notifications) — <a href="https://expo.dev/privacy" target="_blank" rel="noreferrer">expo.dev/privacy</a></li>
            <li><strong>VedAstro</strong> (Panchang, Kundli) — free public API; no account required. Location and birth data sent to compute astronomical results.</li>
            <li><strong>Ollama / AI provider</strong> (AI spiritual guide) — AI chat messages are processed to generate responses.</li>
            <li><strong>Google Fonts &amp; Font Awesome</strong> (website only) — fonts delivered via CDN.</li>
          </ul>

          <h2><i className="fa-solid fa-child"></i>6. Children's Privacy</h2>
          <p>The App is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided personal information, we will delete it immediately. Parents or guardians who believe their child has provided us with personal information may contact us at <a href="mailto:admin@canvadb.com">admin@canvadb.com</a>.</p>

          <h2><i className="fa-solid fa-bell"></i>7. Push Notifications</h2>
          <p>We use Expo's notification service to send daily reminders. Notifications are only sent if you explicitly enable them in the App. You can disable them at any time in the App's Profile settings or in your device's system notification settings.</p>

          <h2><i className="fa-solid fa-user-check"></i>8. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the following rights:</p>
          <ul>
            <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
            <li><strong>Correction</strong> — update inaccurate or incomplete data via the Profile screen</li>
            <li><strong>Deletion</strong> — request that we delete your account and all associated data</li>
            <li><strong>Portability</strong> — request your data in a machine-readable format</li>
            <li><strong>Objection</strong> — object to certain processing activities</li>
          </ul>
          <p>To exercise any of these rights, email us at <a href="mailto:admin@canvadb.com">admin@canvadb.com</a>. We will respond within 30 days.</p>

          <h2><i className="fa-solid fa-globe"></i>9. International Users</h2>
          <p>Aradhana is developed and operated from India. If you access the App from outside India, your information may be transferred to and processed in India. By using the App, you consent to this transfer.</p>

          <h2><i className="fa-solid fa-pen-to-square"></i>10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page and, where appropriate, through an in-app notice. Continued use of the App after changes constitutes acceptance of the updated policy.</p>

          <h2><i className="fa-solid fa-envelope"></i>11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:admin@canvadb.com">admin@canvadb.com</a></li>
            <li><strong>App:</strong> Profile → Give Feedback</li>
            <li><strong>Website:</strong> <Link to="/support">divinelearning.app/support</Link></li>
          </ul>
        </div>
      </div>

      <footer className="legal-footer">
        <p>© 2026 Aradhana &nbsp;·&nbsp; <Link to="/">Home</Link> &nbsp;·&nbsp; <Link to="/terms">Terms &amp; Conditions</Link> &nbsp;·&nbsp; <Link to="/support">Support</Link></p>
      </footer>
    </>
  )
}
