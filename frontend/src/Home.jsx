import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Home() {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const Styles = {
    home: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "1.2rem",
      backgroundColor: "#f8fafc",
      fontFamily: "'Inter', sans-serif",
    },
    button: {
      border: "none",
      borderRadius: "10px",
      fontSize: "1rem",
      fontWeight: "600",
      color: "white",
      backgroundColor: "#2563eb",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.85rem 1.8rem",
      cursor: "pointer",
      boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
      transition: "all 0.2s ease",
    },
    buttonSpan: {
      display: "flex",
      alignItems: "center",
    },
    loadingSpin: {
      width: "16px",
      height: "16px",
      border: "3px solid white",
      borderTop: "3px solid transparent",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  };

  const handleClick = () => {
    setLoading(true);
    const role = localStorage.getItem("userRole");
    setTimeout(() => {
      setLoading(false);
      if (role && role !== "undefined") {
        Navigate(`/${role}`);
      } else {
        Navigate("/login");
      }
    }, 2000);
  };

  return (
    <div style={Styles.home}>
      {!loading ? (
        <button style={Styles.button} onClick={handleClick}>
          <p>Let's Go</p>
          <span style={Styles.buttonSpan}>
            <ChevronRight size={22} strokeWidth={2.5} />
          </span>
        </button>
      ) : (
        <button style={Styles.button} onClick={handleClick} disabled>
          <span style={Styles.loadingSpin}></span>
          Redirecting...
        </button>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
