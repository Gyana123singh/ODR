import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, CircleUserRound, ChevronDown, User, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { authApi } from "./api/authApi";
import { useAuth } from "./context/AuthContext";
import { auth, googleProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "./config/firebase";

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

  const Styles = {
    container: {
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "2rem 0",
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2rem",
    },
    logo: {
      textAlign: "center",
    },
    logoTitle: {
      fontSize: "24px",
      fontWeight: "900",
      color: "#0066cc",
      margin: "0.5rem 0 0 0",
    },
    logoSubtitle: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#666",
      margin: "0.25rem 0 0 0",
    },
    formContainer: {
      width: "600px",
      maxWidth: "90%",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      padding: "2.5rem",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    heading: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #ddd",
      borderRadius: "6px",
      padding: "0.75rem",
      backgroundColor: "#fff",
      transition: "border-color 0.3s ease",
    },
    inputIcon: {
      display: "flex",
      alignItems: "center",
      color: "#999",
      marginRight: "0.75rem",
      flexShrink: 0,
    },
    input: {
      height: "100%",
      border: "none",
      outline: "none",
      flex: 1,
      fontSize: "14px",
      fontWeight: "bold",
      color: "#333",
      backgroundColor: "transparent",
      fontFamily: "inherit",
      padding: "0",
    },
    input_placeholder: {
      color: "#999",
    },
    dropdownContainer: {
      position: "relative",
      width: "100%",
    },
    dropdownToggle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: "1px solid #ddd",
      borderRadius: "6px",
      padding: "0.75rem",
      backgroundColor: "#fff",
      cursor: "pointer",
      transition: "border-color 0.3s ease",
    },
    dropdownLeft: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      flex: 1,
    },
    dropdownText: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#333",
    },
    dropdownIcon: {
      display: "flex",
      alignItems: "center",
      color: "#999",
      transition: "transform 0.3s ease",
      transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
    },
    dropdownContent: {
      position: "absolute",
      top: "100%",
      left: "0",
      right: "0",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderTop: "none",
      borderRadius: "0 0 6px 6px",
      marginTop: "-1px",
      zIndex: 1000,
      maxHeight: isDropdownOpen ? "200px" : "0",
      overflow: "hidden",
      transition: "max-height 0.3s ease",
    },
    dropdownOption: {
      padding: "0.75rem 1rem",
      cursor: "pointer",
      fontSize: "14px",
      color: "#333",
      textTransform: "capitalize",
      borderBottom: "1px solid #f0f0f0",
      transition: "background-color 0.2s ease",
    },
    button: {
      backgroundColor: "#0066cc",
      color: "#fff",
      border: "none",
      padding: "0.875rem",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "1rem",
      transition: "background-color 0.3s ease",
    },
    altButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      backgroundColor: "#fff",
      color: "#333",
      border: "1px solid #e0e0e0",
      padding: "0.75rem",
      borderRadius: "6px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    },
    link: {
      textAlign: "center",
      marginTop: "1rem",
      fontSize: "14px",
    },
    linkAnchor: {
      color: "#0066cc",
      textDecoration: "none",
      cursor: "pointer",
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
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

        // Toast
        toast.success("Login successful!");

        // Navigate after successful login
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
      const response = await fetch("http://localhost:3636/api/auth/firebase-login", {
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
    <div style={Styles.container}>
      <div style={Styles.wrapper}>
        {/* Logo Section */}
        <div style={Styles.logo}>
          <img src="/logo.png" alt="UTKAL ODR Logo" style={{ width: "120px", height: "120px", objectFit: "contain", margin: "0 auto", display: "block" }} />
          <h1 style={Styles.logoTitle}>UTKAL ODR</h1>
          <p style={Styles.logoSubtitle}>Utkrust Vivad Samadhan</p>
          <p style={Styles.logoSubtitle}>Online Dispute Resolution Platform</p>
        </div>

        {/* Login Form */}
        <div style={Styles.formContainer}>
          <h2 style={Styles.heading}>Sign In</h2>

          {/* Error Message */}
          {error && (
            <div
              style={{
                backgroundColor: "#fee",
                color: "#c33",
                padding: "0.75rem",
                borderRadius: "6px",
                fontSize: "14px",
                marginBottom: "1rem",
                border: "1px solid #fcc",
              }}
            >
              {error}
            </div>
          )}

          <form style={Styles.form} onSubmit={handleLogin}>
            {/* Role Dropdown */}
            <div style={Styles.dropdownContainer}>
              <div
                style={Styles.dropdownToggle}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span style={Styles.dropdownLeft}>
                  <span style={Styles.inputIcon}>
                    <CircleUserRound size={20} />
                  </span>
                  <span style={Styles.dropdownText}>{selectedRole}</span>
                </span>
                <span style={Styles.dropdownIcon}>
                  <ChevronDown size={18} />
                </span>
              </div>
              <div style={Styles.dropdownContent}>
                {roles.map((role, index) => (
                  <div
                    key={index}
                    style={Styles.dropdownOption}
                    onClick={() => {
                      setSelectedRole(role);
                      setIsDropdownOpen(false);
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#f0f0f0";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#fff";
                    }}
                  >
                    {role}
                  </div>
                ))}
              </div>
            </div>

            <div style={Styles.inputContainer}>
              <span style={Styles.inputIcon}>
                <Mail size={20} />
              </span>
              <input
                style={Styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isDisabled}
              />
            </div>

            {/* Password Input */}
            <div style={Styles.inputContainer}>
              <span style={Styles.inputIcon}>
                <Lock size={20} />
              </span>
              <input
                style={Styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isDisabled}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              style={{
                ...Styles.button,
                backgroundColor: isDisabled || loading ? "#cccccc" : "#0066cc",
                cursor: isDisabled || loading ? "not-allowed" : "pointer",
              }}
              disabled={isDisabled || loading}
              onClick={handleLogin}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Firebase Login Section */}
            {selectedRole !== "admin" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#e0e0e0" }}></div>
                  <div style={{ margin: "0 10px", fontSize: "14px", color: "#666", fontWeight: "500" }}>or continue with</div>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#e0e0e0" }}></div>
                </div>
                
                <button
                  type="button"
                  onClick={loginWithGoogle}
                  style={Styles.altButton}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8f9fa'; e.currentTarget.style.borderColor = '#d2d2d2'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = '#e0e0e0'; }}
                  disabled={loading}
                >
                  <svg width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  Sign in with Google
                </button>

                {!showPhoneLogin ? (
                  <button
                    type="button"
                    onClick={() => setShowPhoneLogin(true)}
                    style={Styles.altButton}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8f9fa'; e.currentTarget.style.borderColor = '#d2d2d2'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = '#e0e0e0'; }}
                    disabled={loading}
                  >
                    <Phone size={20} color="#333" />
                    Sign in with Phone Number
                  </button>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {!isOtpSent ? (
                      <>
                        <div style={{ ...Styles.inputContainer, paddingLeft: "1rem" }}>
                          <span style={{ color: "#666", marginRight: "0.5rem", fontWeight: "bold" }}>+91</span>
                          <input
                            style={{ ...Styles.input, paddingLeft: "0" }}
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneForLogin}
                            onChange={(e) => setPhoneForLogin(e.target.value)}
                          />
                        </div>
                        <button type="button" onClick={loginWithPhone} style={{ ...Styles.button, backgroundColor: "#0f9d58", marginTop: "0" }}>
                          Send OTP
                        </button>
                      </>
                    ) : (
                      <>
                        <div style={Styles.inputContainer}>
                          <input
                            style={Styles.input}
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                          />
                        </div>
                        <button type="button" onClick={verifyOTP} style={{ ...Styles.button, backgroundColor: "#0f9d58", marginTop: "0" }}>
                          Verify OTP & Login
                        </button>
                      </>
                    )}
                    <div id="recaptcha-container"></div>
                  </div>
                )}
              </div>
            )}
          </form>

          {/* Create Account Link */}
          <div style={Styles.link}>
            <span style={{ color: "#666" }}>Don't have an account? </span>
            <a href="/register" style={Styles.linkAnchor}>
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
