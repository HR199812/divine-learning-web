import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LegalNav from '../components/LegalNav'

/*
 * Keep this page true to the app. Google Play compares it with the app's Data safety
 * answers, and Apple with its privacy labels — every section below was written against
 * the code on 2026-10-21 (what is sent, where, and what is stored). If a feature starts
 * sending something new, change this page and both store forms together.
 */
export default function PrivacyPolicy() {
  useEffect(() => { document.title = 'Privacy Policy — Aradhana Kit' }, [])

  return (
    <>
      <LegalNav />
      <div className="page-wrap">
        <div className="page-eyebrow"><i className="fa-solid fa-shield-halved"></i> Legal</div>
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-meta">Last updated: October 21, 2026 &nbsp;·&nbsp; Effective: October 21, 2026</p>

        <div className="prose">

          <div className="highlight-box">
            <strong>In short:</strong> Aradhana Kit is free, shows no ads, and does not sell your data or share it for marketing. Most of the app — every text, the Panchang, the festival calendar — works on your phone without an account. If you create one, we store only what is needed to keep your practice in sync, and you can delete it at any time.
          </div>

          <h2><i className="fa-solid fa-info-circle"></i>1. Who we are</h2>
          <p>Aradhana Kit ("we", "us") is a Hindu devotional app for Android and iOS, developed by Justanothersupremesoul in India. This policy explains what information the app and our website handle, why, and the choices you have.</p>

          <h2><i className="fa-solid fa-user"></i>2. Using the app without an account</h2>
          <p>You can use Aradhana Kit as a guest. The devotional library is built into the app, and the Panchang, Muhurat and festival calendar are calculated on your phone. As a guest, your chanting counts, saved texts and settings stay on your device and are not sent to our servers.</p>

          <h2><i className="fa-solid fa-database"></i>3. Information we store if you create an account</h2>
          <ul>
            <li><strong>Email address</strong> — to sign you in with a one-time code. If you use <strong>Sign in with Apple</strong>, we store the identifier Apple gives us and the email Apple shares (which may be a private relay address).</li>
            <li><strong>Name</strong> — optional, if you enter one.</li>
            <li><strong>Your practice</strong> — chanting history (mantra name, count, date), streaks, your Sankalpa and its progress, saved texts, and reading progress.</li>
            <li><strong>Preferences</strong> — language, theme, and reminder and festival-alert settings.</li>
            <li><strong>Notification token</strong> — only if you turn on daily reminders, so we can send them.</li>
          </ul>
          <p>One-time sign-in codes are kept in memory for five minutes and are never written to our database.</p>

          <h2><i className="fa-solid fa-location-dot"></i>4. Location</h2>
          <p>With your permission, the app uses your location <strong>on your phone</strong> to calculate the Panchang, sunrise and Muhurat for where you are, and to show nearby temples on the map. We do not send your location to our servers or store it. If you deny permission, the app uses New Delhi.</p>
          <p>To show a place name, your phone's own location service may convert coordinates into a city name.</p>

          <h2><i className="fa-solid fa-paper-plane"></i>5. Information sent to other services when you use a feature</h2>
          <p>Some features need an outside service. Each receives only what that feature needs, only when you use it, and we do not store these requests.</p>
          <ul>
            <li><strong>Kundli, Horoscope and Kundli Matching</strong> — the birth date, time and place you enter are sent to the <strong>VedAstro</strong> public API to calculate the chart.</li>
            <li><strong>Birth-place search</strong> — the place name you type is sent to <strong>Photon</strong> (komoot) to suggest matching places.</li>
            <li><strong>AI Spiritual Guide and mood-based verses</strong> — the messages you send are processed by our AI provider (<strong>Ollama</strong>) to generate a reply. Your conversations are saved only on your phone; we do not store them on our servers.</li>
            <li><strong>Voice search</strong> — when you tap the microphone, your phone's speech-recognition service (Google on Android, Apple on iOS) turns your speech into text. The app uses only the text, to find what you asked for, and does not record or keep audio.</li>
            <li><strong>Sign-in emails</strong> — your email address is given to <strong>Resend</strong>, which delivers the one-time code.</li>
            <li><strong>Reminders</strong> — if enabled, your notification token is used with <strong>Expo</strong>'s push service to deliver them.</li>
          </ul>

          <h2><i className="fa-solid fa-gears"></i>6. How we use information</h2>
          <ul>
            <li>To sign you in and keep your account and practice in sync across devices</li>
            <li>To show your chanting history, streaks and Sankalpa progress</li>
            <li>To send reminders and festival alerts you have turned on</li>
            <li>To run the features you use, as described above</li>
          </ul>
          <p>We do <strong>not</strong> use your information for advertising or profiling, and we do not sell it. The app contains no ads and no third-party analytics or tracking.</p>

          <h2><i className="fa-solid fa-server"></i>7. Storage and security</h2>
          <p>Account data is stored in <strong>MongoDB Atlas</strong> and served by our API hosted on <strong>Render</strong>. All connections use encryption in transit (HTTPS/TLS). Your sign-in token is kept in your phone's secure storage (iOS Keychain / Android Keystore) and expires after seven days.</p>
          <p>Devotional images are loaded from our storage on <strong>Supabase</strong> and from <strong>Unsplash</strong>. To tell whether you are online, the app occasionally contacts a Google or Apple connectivity-check address, which sends no personal information. App updates are delivered through <strong>Expo</strong>, which receives basic technical details (app version, platform) to send the right update.</p>

          <h2><i className="fa-solid fa-trash-can"></i>8. Deleting your account</h2>
          <p>You can delete your account and all the data stored with it at any time:</p>
          <ul>
            <li><strong>In the app:</strong> Profile → scroll to the bottom → Delete Account.</li>
            <li><strong>On the web:</strong> <Link to="/delete-account">aradhana-kit.vercel.app/delete-account</Link> — no app needed.</li>
          </ul>
          <p>Deletion is immediate and permanent. Data that lives only on your phone (AI chats, guest data, on-device settings) is removed when you uninstall the app or clear its data.</p>
          <p>We keep account data only while your account exists.</p>

          <h2><i className="fa-solid fa-child"></i>9. Children</h2>
          <p>Aradhana Kit is not directed to children under 13, and we do not knowingly collect personal information from them. If you believe a child under 13 has created an account, contact us and we will delete it.</p>

          <h2><i className="fa-solid fa-user-check"></i>10. Your rights</h2>
          <p>Depending on where you live, you may have the right to access, correct, delete or receive a copy of your personal data, or to object to how it is used. You can correct your name and preferences in the app and delete your account as described above; for anything else, email <a href="mailto:admin@canvadb.com">admin@canvadb.com</a>. We reply within 30 days.</p>

          <h2><i className="fa-solid fa-globe"></i>11. International users</h2>
          <p>Aradhana Kit is operated from India, and the services above may process data in other countries. By using the app, you consent to this transfer.</p>

          <h2><i className="fa-solid fa-pen-to-square"></i>12. Changes to this policy</h2>
          <p>We will update this page when the app's handling of data changes, and change the date at the top. For significant changes we will also tell you in the app.</p>

          <h2><i className="fa-solid fa-envelope"></i>13. Contact</h2>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:admin@canvadb.com">admin@canvadb.com</a></li>
            <li><strong>Website:</strong> <Link to="/support">aradhana-kit.vercel.app/support</Link></li>
          </ul>
        </div>
      </div>

      <footer className="legal-footer">
        <p>© 2026 Aradhana Kit &nbsp;·&nbsp; <Link to="/">Home</Link> &nbsp;·&nbsp; <Link to="/terms">Terms &amp; Conditions</Link> &nbsp;·&nbsp; <Link to="/delete-account">Delete account</Link> &nbsp;·&nbsp; <Link to="/support">Support</Link></p>
      </footer>
    </>
  )
}
