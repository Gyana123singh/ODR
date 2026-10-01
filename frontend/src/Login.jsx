import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, CircleUserRound, ChevronDown, Phone, Box, MapPin, Search, Scale, FileText, Video, FileCheck, Infinity, Gavel, BookOpen, Briefcase, Landmark } from "lucide-react";
import { toast } from "react-toastify";
import { authApi } from "./api/authApi";
import { useAuth } from "./context/AuthContext";
import { auth, googleProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "./config/firebase";
import "./Login.css";

export default function Login({ getRole }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Select Role");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Firebase specific states
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [phoneForLogin, setPhoneForLogin] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const roles = ["admin", "claimant", "respondent", "neutral"];

  useEffect(() => {
    getRole(selectedRole);
  }, [getRole, selectedRole]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (selectedRole === "Select Role") {
      setError("Please select a role");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await authApi.login(email, password, selectedRole);

      if (result.success) {
        // Store user data in AuthContext (syncs localStorage for compatibility)
        login(result.data, result.token);
        if (result.data.caseId) {
          localStorage.setItem("caseId", result.data.caseId);
        }
        getRole(selectedRole);
        toast.success("Login successful!");
        navigate(
          selectedRole === "admin"
            ? "/admin"
            : selectedRole === "claimant"
            ? "/claimant"
            : selectedRole === "respondent"
            ? "/respondent"
            : selectedRole === "neutral"
            ? "/neutral"
            : "/"
        );
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFirebaseLogin = async (idToken) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3636";
      const response = await fetch(`${API_BASE_URL}/api/auth/firebase-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, role: selectedRole })
      });
      const result = await response.json();
      
      if (result.success) {
        login(result.user, result.token);
        getRole(result.role);
        toast.success("Firebase Login successful!");
        navigate(
          result.role === "admin"
            ? "/admin"
            : result.role === "claimant"
            ? "/claimant"
            : result.role === "respondent"
            ? "/respondent"
            : result.role === "neutral"
            ? "/neutral"
            : "/"
        );
      } else {
        setError(result.message || "Firebase login failed");
      }
    } catch (err) {
      setError(err.message || "Firebase login error");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    if (selectedRole === "Select Role") return setError("Please select a role");
    if (selectedRole === "admin") return setError("Admins cannot login via Firebase");
    
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      await handleFirebaseLogin(idToken);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const loginWithPhone = async (e) => {
    e.preventDefault();
    if (selectedRole === "Select Role") return setError("Please select a role");
    if (selectedRole === "admin") return setError("Admins cannot login via Firebase");
    if (!phoneForLogin) return setError("Please enter your phone number");

    const fullPhoneNumber = "+91" + phoneForLogin.replace(/^\+91/, "");

    setLoading(true);
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible'
        });
      }
      const confirmationResult = await signInWithPhoneNumber(auth, fullPhoneNumber, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      setIsOtpSent(true);
      toast.success("OTP Sent!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await window.confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();
      await handleFirebaseLogin(idToken);
    } catch (err) {
      setError("Invalid OTP");
      setLoading(false);
    }
  };

  const isDisabled = selectedRole === "Select Role";

  return (
    <div className="login-container">
      <div className="login-box">
      
      {/* LEFT SIDE - Info Section */}
      <div className="login-left">
        {/* Top: Logo */}
        <div className="left-top">
          <div className="brand-header-light">
            <img src="/logo.png" alt="Utkal ODR Logo" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '28px', fontWeight: '700', lineHeight: '1.1', color: '#ffffff' }}>Utkal ODR</span>
              <span style={{ fontSize: '15px', fontWeight: '400', color: '#cbd5e1', marginTop: '4px', letterSpacing: '0px' }}>Online Dispute Resolution</span>
            </div>
          </div>
        </div>

        {/* Middle: Hero Text */}
        <div className="left-middle">
          <h2 className="hero-title" style={{ fontSize: '44px', lineHeight: '1.2' }}>
            Settle your dispute fairly, without waiting in line.
          </h2>
          <p className="hero-subtitle" style={{ fontSize: '20px', lineHeight: '1.6', maxWidth: '600px', marginTop: '24px', color: '#e2e8f0', opacity: '1' }}>
            Arbitration, mediation and conciliation on one secure platform. File your case, share evidence, attend hearings and receive orders online.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="login-right">
        <div className="login-card">
          <div className="card-header">
            <h2>Welcome Back</h2>
            <p>Login to your UTKAL ODR account</p>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <form className="form-group" onSubmit={handleLogin}>
            
            {/* Role Dropdown */}
            <div className="dropdown-container">
              <div
                className="dropdown-toggle"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <CircleUserRound size={17} className="input-icon" />
                  <span style={{ color: selectedRole === "Select Role" ? "#94a3b8" : "#0f172a", textTransform: 'capitalize', fontWeight: '500' }}>
                    {selectedRole}
                  </span>
                </span>
                <ChevronDown size={15} className="input-icon" style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", margin: 0 }} />
              </div>
              <div className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => { setSelectedRole(role); setIsDropdownOpen(false); }}
                  >
                    {role}
                  </div>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div className="input-wrapper">
              <Mail size={17} className="input-icon" />
              <input
                className="input-field"
                type="email"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isDisabled}
              />
            </div>

            {/* Password Input */}
            <div className="input-wrapper">
              <Lock size={17} className="input-icon" />
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isDisabled}
              />
            </div>

            {/* Remember me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            {/* Sign In / Login Button */}
            <button
              type="submit"
              className="btn-primary"
              disabled={isDisabled || loading}
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && <span style={{fontSize: '16px'}}>→</span>}
            </button>
            
            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">OR</div>
              <div className="divider-line"></div>
            </div>

            {/* Firebase Login Section */}
            {selectedRole !== "admin" && (
              <div className="sso-buttons">
                {!showPhoneLogin ? (
                  <>
                    <button type="button" onClick={loginWithGoogle} className="btn-outline" disabled={loading || isDisabled}>
                      <svg width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      </svg>
                      Sign in with Google
                    </button>

                    <button type="button" onClick={() => setShowPhoneLogin(true)} className="btn-outline" disabled={loading || isDisabled}>
                      <Phone size={18} />
                      Sign in with Phone Number
                    </button>
                  </>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {!isOtpSent ? (
                      <>
                        <div className="otp-input-group">
                          <span style={{ color: "#64748b", marginRight: "0.5rem", fontWeight: "700" }}>+91</span>
                          <input
                            className="input-field"
                            type="tel"
                            maxLength={10}
                            placeholder="10-digit Phone Number"
                            value={phoneForLogin}
                            onChange={(e) => setPhoneForLogin(e.target.value)}
                            disabled={loading}
                          />
                        </div>
                        <button type="button" onClick={loginWithPhone} className="btn-success" disabled={loading}>
                          {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <button
                            type="button"
                            onClick={handleCancelPhoneLogin}
                            style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "13px", padding: "4px" }}
                          >
                            ← Back to Login Options
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: "13px", color: "#475569", textAlign: "center" }}>
                          Enter the code sent to <strong>+91 {phoneForLogin}</strong>
                        </div>
                        <div className="otp-input-group">
                          <input
                            className="input-field"
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            disabled={loading}
                          />
                        </div>
                        <button type="button" onClick={verifyOTP} className="btn-success" disabled={loading}>
                          {loading ? "Verifying..." : "Verify OTP & Login"}
                        </button>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", padding: "4px" }}
                          >
                            Change Number / Resend
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelPhoneLogin}
                            style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", padding: "4px" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                    <div id="recaptcha-container"></div>
                  </div>
                )}
              </div>
            )}
            
            <div className="register-prompt">
              <span>Don't have an account?</span>
              <a href="/register">Create an account</a>
            </div>
            
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}
