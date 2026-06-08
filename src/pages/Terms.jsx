import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LegalNav from '../components/LegalNav'

export default function Terms() {
  useEffect(() => { document.title = 'Terms & Conditions — Divine Learning' }, [])

  return (
    <>
      <LegalNav />
      <div className="page-wrap">
        <div className="page-eyebrow"><i className="fa-solid fa-file-contract"></i> Legal</div>
        <h1 className="page-title">Terms &amp; Conditions</h1>
        <p className="page-meta">Last updated: June 7, 2026 &nbsp;·&nbsp; Effective: June 7, 2026</p>

        <div className="prose">

          <div className="highlight-box">
            <strong>Please read carefully.</strong> By downloading or using Divine Learning, you agree to be bound by these Terms. If you disagree with any part, please do not use the App.
          </div>

          <h2><i className="fa-solid fa-handshake"></i>1. Acceptance of Terms</h2>
          <p>These Terms and Conditions ("Terms") govern your use of the Divine Learning mobile application ("App") and associated website, operated by Justanothersupremesoul ("we", "us", "our"). By accessing or using the App, you confirm that you are at least 13 years of age and agree to these Terms in full.</p>

          <h2><i className="fa-solid fa-mobile-screen"></i>2. Description of Service</h2>
          <p>Divine Learning is a free Hindu devotional application that provides:</p>
          <ul>
            <li>Japa Mala chanting counter with streak tracking</li>
            <li>Sacred text library (Aartis, Chalisas, Bhajans, Mantras, Kathas)</li>
            <li>Temple map with information on 195+ sacred temples</li>
            <li>Daily Bhagavad Gita verses with audio recitation</li>
            <li>Panchang (Hindu calendar) and auspicious timing (Muhurat)</li>
            <li>AI-powered spiritual guidance chat</li>
            <li>Festival calendar, Sankalpa tracker, Kundli, and Guna Milan</li>
            <li>Support for 10 Indian languages</li>
          </ul>
          <p>The App is provided free of charge with no advertisements or in-app purchases.</p>

          <h2><i className="fa-solid fa-user"></i>3. User Accounts</h2>
          <p>You may use the App as a guest without creating an account. To save your chanting history and access all features, you may register using your phone number and OTP verification.</p>
          <ul>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must provide accurate information during registration</li>
            <li>You may not create accounts on behalf of others without their consent</li>
            <li>One phone number may only be associated with one account</li>
            <li>You may delete your account at any time by contacting us</li>
          </ul>

          <h2><i className="fa-solid fa-ban"></i>4. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the App for any unlawful purpose or in violation of any applicable law</li>
            <li>Attempt to reverse engineer, decompile, or disassemble the App</li>
            <li>Use automated tools to access the App or its API</li>
            <li>Interfere with or disrupt the integrity or performance of the App</li>
            <li>Attempt to gain unauthorized access to any part of the App or its infrastructure</li>
            <li>Misuse the AI chat feature to generate harmful, offensive, or misleading content</li>
            <li>Use the App to spread misinformation about Hindu religion, deities, or spiritual practices</li>
          </ul>

          <h2><i className="fa-solid fa-om"></i>5. Spiritual Content Disclaimer</h2>
          <p>Divine Learning provides spiritual and devotional content for informational and educational purposes only.</p>
          <div className="highlight-box">
            <strong>Important:</strong> The content in this App — including sacred texts, temple information, festival dates, Panchang, Muhurat, and Kundli — is provided for general informational purposes. It does not constitute religious authority, priestly advice, or a substitute for consultation with a qualified pandit, astrologer, or spiritual guide.
          </div>
          <ul>
            <li>Panchang, Muhurat, and Kundli data are computed algorithmically and may differ from traditional calculations</li>
            <li>Festival dates may vary by region and tradition</li>
            <li>Temple visiting information (timings, directions) may change — always verify before visiting</li>
            <li>We make no claims of religious authority or spiritual efficacy</li>
          </ul>

          <h2><i className="fa-solid fa-robot"></i>6. AI Content Disclaimer</h2>
          <p>The AI Spiritual Guide feature generates responses using artificial intelligence. You acknowledge that:</p>
          <ul>
            <li>AI responses are not created by a human pandit, priest, or religious authority</li>
            <li>AI-generated content may be inaccurate, incomplete, or culturally imprecise</li>
            <li>You should not make significant spiritual, financial, or life decisions based solely on AI responses</li>
            <li>We display a disclaimer within the AI chat: <em>"AI is not a pandit or God. Responses may be inaccurate — always consult a pandit or spiritual person."</em></li>
          </ul>

          <h2><i className="fa-solid fa-copyright"></i>7. Intellectual Property</h2>
          <p>The App, its design, code, branding, and original content are the property of Justanothersupremesoul and are protected by applicable intellectual property laws.</p>
          <p>Sacred texts, mantras, shlokas, and other traditional content reproduced in the App are part of the public domain of Hindu religious tradition. We do not claim ownership over these texts.</p>
          <p>You may not copy, reproduce, distribute, or create derivative works of the App's original content without our prior written consent.</p>

          <h2><i className="fa-solid fa-link"></i>8. Third-Party Services &amp; Links</h2>
          <p>The App integrates with third-party services including MongoDB Atlas, Expo, VedAstro, and AI providers. We are not responsible for the content, privacy practices, or availability of these third-party services. Use of these services is subject to their respective terms and privacy policies.</p>

          <h2><i className="fa-solid fa-triangle-exclamation"></i>9. Disclaimer of Warranties</h2>
          <p>The App is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis without warranties of any kind, express or implied. We do not warrant that:</p>
          <ul>
            <li>The App will be uninterrupted, timely, secure, or error-free</li>
            <li>Results obtained from the App will be accurate or reliable</li>
            <li>Any errors in the App will be corrected</li>
          </ul>

          <h2><i className="fa-solid fa-scale-unbalanced"></i>10. Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of data, revenue, or spiritual wellbeing — arising from your use of or inability to use the App.</p>
          <p>Our total liability for any claim arising from your use of the App shall not exceed INR 0 (zero), as the App is provided entirely free of charge.</p>

          <h2><i className="fa-solid fa-gavel"></i>11. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of India.</p>

          <h2><i className="fa-solid fa-pen-to-square"></i>12. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. We will notify you of material changes by updating the "Last updated" date and, where appropriate, through an in-app notice. Your continued use of the App after changes constitutes acceptance of the revised Terms.</p>

          <h2><i className="fa-solid fa-envelope"></i>13. Contact Us</h2>
          <p>For questions about these Terms, please contact:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:admin@canvadb.com">admin@canvadb.com</a></li>
            <li><strong>In-App:</strong> Profile → Give Feedback</li>
            <li><strong>Support page:</strong> <Link to="/support">divinelearning.app/support</Link></li>
          </ul>
        </div>
      </div>

      <footer className="legal-footer">
        <p>© 2026 Divine Learning &nbsp;·&nbsp; <Link to="/">Home</Link> &nbsp;·&nbsp; <Link to="/privacy-policy">Privacy Policy</Link> &nbsp;·&nbsp; <Link to="/support">Support</Link></p>
      </footer>
    </>
  )
}
