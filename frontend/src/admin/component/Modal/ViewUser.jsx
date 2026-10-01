import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Briefcase,
  Shield,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";

export default function ViewUser({ user, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const initials = (user.name || "User")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleCopyId = () => {
    if (user._id) {
      navigator.clipboard.writeText(user._id);
      setCopied(true);
      toast.success("User ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenEmail = () => {
    if (user.email) {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
          user.email
        )}`,
        "_blank"
      );
    }
  };

  const getRoleStyle = (role = "") => {
    const r = role.toLowerCase();
    switch (r) {
      case "admin":
        return {
          bg: "#eff6ff",
          text: "#1d4ed8",
          border: "#bfdbfe",
          gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        };
      case "claimant":
        return {
          bg: "#f0fdf4",
          text: "#15803d",
          border: "#bbf7d0",
          gradient: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
        };
      case "respondent":
        return {
          bg: "#fff7ed",
          text: "#c2410c",
          border: "#fed7aa",
          gradient: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
        };
      case "neutral":
        return {
          bg: "#faf5ff",
          text: "#7e22ce",
          border: "#e9d5ff",
          gradient: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)",
        };
      default:
        return {
          bg: "#f8fafc",
          text: "#475569",
          border: "#cbd5e1",
          gradient: "linear-gradient(135deg, #64748b 0%, #334155 100%)",
        };
    }
  };

  const roleStyle = getRoleStyle(user.role);
  const isActive = (user.status || "active").toLowerCase() === "active";

  return (
    <div style={{ width: "100%", color: "#1e293b", fontFamily: "inherit" }}>
      {/* Top Banner Card */}
      <div
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          borderRadius: "14px",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          border: "1px solid #e2e8f0",
          marginBottom: "20px",
          position: "relative",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            background: roleStyle.gradient,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "700",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            flexShrink: 0,
            letterSpacing: "1px",
          }}
        >
          {initials}
        </div>

        {/* User Info Header */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "6px",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#0f172a",
                margin: 0,
              }}
            >
              {user.name && user.name !== "Neutral User" && user.name !== "User" && user.name !== "Firebase User" ? user.name : (user.email || "Unnamed User")}
            </h3>

            {/* Role Badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
                backgroundColor: roleStyle.bg,
                color: roleStyle.text,
                border: `1px solid ${roleStyle.border}`,
                textTransform: "capitalize",
              }}
            >
              <Shield size={12} />
              {user.role?.toLowerCase() === "neutral" ? "Mediator" : (user.role || "User")}
            </span>

            {/* Status Badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "3px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
                backgroundColor: isActive ? "#dcfce7" : "#fee2e2",
                color: isActive ? "#15803d" : "#b91c1c",
                border: `1px solid ${isActive ? "#bbf7d0" : "#fecaca"}`,
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: isActive ? "#22c55e" : "#ef4444",
                }}
              />
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Mail size={14} color="#94a3b8" />
            <span style={{ fontWeight: "500" }}>{user.email || "No email"}</span>
          </p>
        </div>
      </div>

      {/* Mini Stats Bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              backgroundColor: "#f0fdf4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#16a34a",
              flexShrink: 0,
            }}
          >
            <Briefcase size={18} />
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "500" }}>
              Total Cases
            </div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>
              {user.cases !== undefined ? user.cases : 0}
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              backgroundColor: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2563eb",
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={18} />
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "500" }}>
              Account Verification
            </div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: user.isVerified !== false ? "#16a34a" : "#f59e0b",
              }}
            >
              {user.isVerified !== false ? "Verified" : "Pending"}
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              backgroundColor: "#fff7ed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ea580c",
              flexShrink: 0,
            }}
          >
            <Clock size={18} />
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "500" }}>
              Last Active
            </div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#0f172a",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user.lastActive || "Recently"}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Info Grid */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            padding: "12px 18px",
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "13px",
            fontWeight: "700",
            color: "#334155",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Account Details
        </div>

        <div style={{ padding: "8px 18px" }}>
          {/* User ID Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #f1f5f9",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#64748b", fontWeight: "500" }}>User ID</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <code
                style={{
                  backgroundColor: "#f1f5f9",
                  padding: "3px 8px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  color: "#334155",
                }}
              >
                {user._id || "N/A"}
              </code>
              {user._id && (
                <button
                  type="button"
                  onClick={handleCopyId}
                  title="Copy User ID"
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    padding: "4px",
                    color: copied ? "#16a34a" : "#64748b",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              )}
            </div>
          </div>

          {/* Full Name Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #f1f5f9",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#64748b", fontWeight: "500" }}>Full Name</span>
            <span style={{ fontWeight: "600", color: "#0f172a" }}>
              {user.name || "N/A"}
            </span>
          </div>

          {/* Email Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #f1f5f9",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#64748b", fontWeight: "500" }}>Email Address</span>
            <span style={{ fontWeight: "600", color: "#0f172a" }}>
              {user.email || "N/A"}
            </span>
          </div>

          {/* Phone Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #f1f5f9",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#64748b", fontWeight: "500" }}>Phone Number</span>
            <span style={{ fontWeight: "600", color: "#0f172a" }}>
              {user.phone || "Not Provided"}
            </span>
          </div>

          {/* Role Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #f1f5f9",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#64748b", fontWeight: "500" }}>Platform Role</span>
            <span
              style={{
                fontWeight: "600",
                textTransform: "capitalize",
                color: roleStyle.text,
              }}
            >
              {user.role || "N/A"}
            </span>
          </div>

          {/* Join Date Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#64748b", fontWeight: "500" }}>Registration Date</span>
            <span style={{ fontWeight: "600", color: "#0f172a" }}>
              {user.joinDate || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Modal Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          type="button"
          onClick={handleOpenEmail}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 18px",
            backgroundColor: "#eff6ff",
            color: "#2563eb",
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#dbeafe";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#eff6ff";
          }}
        >
          <Mail size={15} />
          Send Email
          <ExternalLink size={13} />
        </button>

        <button
          type="button"
          onClick={onClose}
          style={{
            padding: "9px 22px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#334155";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#0f172a";
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
