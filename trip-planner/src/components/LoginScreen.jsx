import { useState } from "react";
import {
  getFamilyMember,
  isEmailAllowed,
  signInWithEmail,
} from "../lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, sending, sent, error
  const [errorMessage, setErrorMessage] = useState("");

  // Check if current email belongs to a family member for personalized greeting
  const familyMember = isEmailAllowed(email) ? getFamilyMember(email) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    // Quick client-side check
    if (!isEmailAllowed(email)) {
      setStatus("error");
      setErrorMessage("Sorry, this email isn't on the guest list! 🦞");
      return;
    }

    const { error } = await signInWithEmail(email);

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
    } else {
      setStatus("sent");
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-header">
          <span className="login-emoji">🦞</span>
          <h1>Maine Mom Trip 2025</h1>
          <p className="login-subtitle">Family-only access</p>
        </div>

        {status === "sent" ? (
          <div className="login-success">
            <span className="success-emoji">{familyMember?.emoji || "✉️"}</span>
            <h2>Hey {familyMember?.name || "there"}! Check your email!</h2>
            <p>
              We sent a magic link to <strong>{email}</strong>
            </p>
            <p className="login-hint">
              Click the link in the email to sign in. It might take a minute!
            </p>
            <button
              className="btn-outline login-btn"
              onClick={() => setStatus("idle")}
            >
              Try a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email">Enter your email to get access:</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "sending"}
              autoFocus
            />

            {status === "error" && (
              <div className="login-error">{errorMessage}</div>
            )}

            <button
              type="submit"
              className="btn-primary login-btn"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? "⏳ Sending..."
                : familyMember
                ? `${familyMember.emoji} Send Link to ${familyMember.name}`
                : "🔐 Send Magic Link"}
            </button>

            <p className="login-hint">
              {familyMember
                ? `Welcome back, ${familyMember.name}! Click above to get your login link.`
                : "Only family members can access this trip planner. If you're not on the list, ask Gunnar!"}
            </p>
          </form>
        )}
      </div>

      <div className="login-footer">
        <span>🌊 Planning adventures since 2025</span>
      </div>
    </div>
  );
}
