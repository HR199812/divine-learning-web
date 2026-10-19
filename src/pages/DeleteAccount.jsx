import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LegalNav from '../components/LegalNav'

/**
 * /delete-account — Google Play requires a way to delete an account without the app.
 *
 * The flow proves inbox ownership with the same emailed one-time code the app uses, then
 * calls POST /auth/delete-account, which deletes the account and — unlike sign-in — never
 * creates one. The backend is on Render's free tier and can take 30s+ to wake, so the
 * first request says so rather than looking stuck.
 */
const API = 'https://divine-knowledge-backend.onrender.com'
const SUPPORT = 'admin@canvadb.com'

async function post(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`)
  return data
}

function DeleteForm() {
  // email → code → done
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [slow, setSlow] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const normalised = email.trim().toLowerCase()

  async function run(fn) {
    setBusy(true); setError(''); setSlow(false)
    const t = setTimeout(() => setSlow(true), 4000)
    try { await fn() } catch (e) { setError(e.message || 'Something went wrong. Please try again.') }
    finally { clearTimeout(t); setBusy(false); setSlow(false) }
  }

  const sendCode = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(normalised)) { setError('Enter the email address you sign in with.'); return }
    run(async () => {
      await post('/auth/send-otp', { email: normalised, purpose: 'delete' })
      setStep('code')
    })
  }

  const remove = (e) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(code.trim())) { setError('Enter the 6-digit code from the email.'); return }
    if (!confirmed) { setError('Tick the box to confirm you want to delete your account.'); return }
    run(async () => {
      const r = await post('/auth/delete-account', { email: normalised, otp: code.trim() })
      setResult(r.deleted ? 'deleted' : 'none')
      setStep('done')
    })
  }

  if (step === 'done') {
    return (
      <div className="delete-card" role="status">
        {result === 'deleted' ? (
          <>
            <h3><i className="fa-solid fa-circle-check delete-ok"></i> Your account has been deleted</h3>
            <p>The account for <strong>{normalised}</strong> and all the data stored with it have been removed. If the app is still open on a phone, sign out there or uninstall it.</p>
          </>
        ) : (
          <>
            <h3><i className="fa-solid fa-circle-info"></i> No account found</h3>
            <p>There is no Aradhana Kit account for <strong>{normalised}</strong>, so there was nothing to delete. If you signed in with Apple using "Hide My Email", use the relay address Apple created for the app — or delete from inside the app.</p>
          </>
        )}
      </div>
    )
  }

  return (
    <form className="delete-card" onSubmit={step === 'email' ? sendCode : remove} noValidate>
      <label className="delete-label" htmlFor="del-email">Email address you sign in with</label>
      <input
        id="del-email" className="delete-input" type="email" autoComplete="email" inputMode="email"
        value={email} onChange={(e) => setEmail(e.target.value)} disabled={step !== 'email' || busy}
        placeholder="you@example.com"
      />

      {step === 'code' && (
        <>
          <p className="delete-hint">We've emailed a 6-digit code to <strong>{normalised}</strong>. It expires in 5 minutes. <button type="button" className="delete-link" onClick={() => { setStep('email'); setCode(''); setError('') }}>Use a different email</button></p>
          <label className="delete-label" htmlFor="del-code">Code</label>
          <input
            id="del-code" className="delete-input delete-code" inputMode="numeric" autoComplete="one-time-code"
            maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} disabled={busy}
            placeholder="••••••"
          />
          <label className="delete-check">
            <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} disabled={busy} />
            <span>I understand this permanently deletes my account and data, and cannot be undone.</span>
          </label>
        </>
      )}

      {error && <p className="delete-error" role="alert">{error}</p>}
      {busy && slow && <p className="delete-hint">Waking the server — the first request can take up to a minute.</p>}

      <button type="submit" className={step === 'email' ? 'btn-primary delete-btn' : 'delete-btn delete-btn-danger'} disabled={busy}>
        {busy ? 'Please wait…' : step === 'email' ? 'Email me a code' : 'Delete my account'}
      </button>
    </form>
  )
}

export default function DeleteAccount() {
  useEffect(() => { document.title = 'Delete your account — Aradhana Kit' }, [])

  return (
    <>
      <LegalNav />
      <div className="page-wrap">
        <div className="page-eyebrow"><i className="fa-solid fa-user-xmark"></i> Account</div>
        <h1 className="page-title">Delete your Aradhana Kit account</h1>
        <p className="page-meta">Applies to accounts created in the Aradhana Kit app on Android and iOS.</p>

        <div className="prose">
          <div className="highlight-box">
            <strong>Deletion is permanent and immediate.</strong> Your account and everything stored with it are removed from our database as soon as you confirm. There is no waiting period and it cannot be undone.
          </div>

          <h2><i className="fa-solid fa-mobile-screen"></i>Delete from the app</h2>
          <p>Open Aradhana Kit, go to the <strong>Profile</strong> tab, scroll to the bottom and tap <strong>Delete Account</strong>, then confirm.</p>

          <h2><i className="fa-solid fa-globe"></i>Delete from this page</h2>
          <p>No app needed. We'll email a one-time code to prove the account is yours, then delete it.</p>
        </div>

        <DeleteForm />

        <div className="prose">
          <h2><i className="fa-solid fa-trash-can"></i>What is deleted</h2>
          <ul>
            <li>Your account: email address, name, and Sign in with Apple identifier if you used it</li>
            <li>Chanting history, mala counts and streaks</li>
            <li>Your Sankalpa and its progress</li>
            <li>Saved texts (favourites) and reading progress</li>
            <li>Preferences — language, theme, reminder and festival-alert settings — and your notification token</li>
          </ul>

          <h2><i className="fa-solid fa-mobile"></i>What stays on your phone</h2>
          <p>Some things never reach our servers and live only on your device: AI chat history, guest-mode data, and on-device settings. Uninstalling the app, or clearing its data in your phone's settings, removes them.</p>

          <h2><i className="fa-solid fa-clock-rotate-left"></i>What we keep</h2>
          <p>Nothing linked to you. We do not keep a copy of a deleted account, and the devotional content in the app is not tied to any user.</p>

          <h2><i className="fa-solid fa-envelope"></i>Need help?</h2>
          <p>If you can't receive the code or something goes wrong, email <a href={`mailto:${SUPPORT}?subject=Delete%20my%20Aradhana%20Kit%20account`}>{SUPPORT}</a> from the address on your account and we'll delete it within 30 days. See also our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
        </div>
      </div>

      <footer className="legal-footer">
        <p>© 2026 Aradhana Kit &nbsp;·&nbsp; <Link to="/">Home</Link> &nbsp;·&nbsp; <Link to="/privacy-policy">Privacy Policy</Link> &nbsp;·&nbsp; <Link to="/terms">Terms &amp; Conditions</Link> &nbsp;·&nbsp; <Link to="/support">Support</Link></p>
      </footer>
    </>
  )
}
