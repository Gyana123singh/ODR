import {
  Mail,
  Phone,
  Globe,
  Wrench,
  Palette,
  Sun,
  Moon,
  Check,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalComponent from "./Modal/ModalComponent";

export default function AdminControls() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);

  // Maintenance state
  const [isMaintenanceActive, setIsMaintenanceActive] = useState(() => {
    return localStorage.getItem("adminMaintenanceMode") === "true";
  });
  const [maintenanceDuration, setMaintenanceDuration] = useState("1 hour");
  const [maintenanceReason, setMaintenanceReason] = useState(
    "Scheduled platform maintenance and security updates"
  );

  // Theme state
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("adminTheme") || "light";
  });
  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem("adminAccentColor") || "#2196f3";
  });

  const handleSaveMaintenance = () => {
    localStorage.setItem("adminMaintenanceMode", String(isMaintenanceActive));
    if (isMaintenanceActive) {
      toast.warn(
        `Maintenance mode ENABLED (${maintenanceDuration}). Access restricted.`
      );
    } else {
      toast.success("Platform restored to live operational mode!");
    }
    setOpenModal(null);
  };

  const handleSaveTheme = () => {
    localStorage.setItem("adminTheme", currentTheme);
    localStorage.setItem("adminAccentColor", accentColor);
    toast.success("Theme preferences saved successfully!");
    setOpenModal(null);
  };

  const preferenceItems = [
    {
      id: "supp-1",
      icon: Wrench,
      title: "Maintenence Mode",
      description: "support@odrcourtapp.com",
      color: "#2196f3",
      action: () => setOpenModal("maintenance"),
    },
    {
      id: "supp-2",
      icon: Palette,
      title: "Theme Setting",
      description: "+91 9876543210",
      color: "#2196f3",
      action: () => setOpenModal("theme"),
    },
  ];

  const management = [
    {
      id: "supp-1",
      icon: Mail,
      title: "User Management",
      description: "support@odrcourtapp.com",
      color: "#2196f3",
      action: () => navigate("/admin/users"),
    },
    {
      id: "supp-2",
      icon: Phone,
      title: "Cases Management",
      description: "+91 9876543210",
      color: "#2196f3",
      action: () => navigate("/admin/cases"),
    },
    {
      id: "supp-3",
      icon: Globe,
      title: "Document Management",
      description: "www.odrcourtapp.com/help",
      color: "#2196f3",
      action: () => navigate("/admin/documents"),
    },
  ];

  const communication = [
    {
      id: "supp-1",
      icon: Mail,
      title: "Send Notifications",
      description: "support@odrcourtapp.com",
      color: "#2196f3",
      action: () => navigate("/admin/notifications"),
    },
    {
      id: "supp-2",
      icon: Phone,
      title: "Report & Analytics",
      description: "+91 9876543210",
      color: "#2196f3",
      action: () => navigate("/admin/reports"),
    },
  ];

  const styles = {
    container: {
      padding: "clamp(1rem, 5vw, 2rem)",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    headerTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "2rem",
      paddingLeft: "0.5rem",
    },
    manageSectionTitle: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#999",
      margin: "0",
      paddingLeft: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    sectionTitle: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#999",
      marginBottom: "1rem",
      marginTop: "2rem",
      paddingLeft: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    manageSupportContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      marginTop: "1rem",
    },
    supportContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    supportItem: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "1.25rem 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: "1px solid #f0f0f0",
      transition: "all 0.2s ease",
      cursor: "pointer",
    },
    supportItemHover: {
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },
    supportContent: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      flex: 1,
    },
    iconContainer: (color) => ({
      width: "50px",
      height: "50px",
      backgroundColor: `${color}15`,
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }),
    supportText: {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
    },
    supportTitle: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#333",
    },
    supportDescription: {
      fontSize: "13px",
      color: "#999",
    },
    chevron: {
      color: "#ddd",
      flexShrink: 0,
    },
  };

  return (
    <div style={styles.container}>
      {/* System Settings */}
      <h2 style={styles.manageSectionTitle}>System Settings</h2>

      <div style={styles.manageSupportContainer}>
        {preferenceItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              style={styles.supportItem}
              onClick={item.action}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.supportItemHover);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={styles.supportContent}>
                <div style={styles.iconContainer(item.color)}>
                  <IconComponent size={28} color={item.color} />
                </div>
                <div style={styles.supportText}>
                  <div style={styles.supportTitle}>{item.title}</div>
                  <div style={styles.supportDescription}>
                    {item.description}
                  </div>
                </div>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={styles.chevron}
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          );
        })}
      </div>

      {/* Management */}
      <h2 style={styles.sectionTitle}>Management</h2>

      <div style={styles.supportContainer}>
        {management.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              style={styles.supportItem}
              onClick={item.action}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.supportItemHover);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={styles.supportContent}>
                <div style={styles.iconContainer(item.color)}>
                  <IconComponent size={28} color={item.color} />
                </div>
                <div style={styles.supportText}>
                  <div style={styles.supportTitle}>{item.title}</div>
                  <div style={styles.supportDescription}>
                    {item.description}
                  </div>
                </div>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={styles.chevron}
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          );
        })}
      </div>

      {/* Communication */}
      <h2 style={styles.sectionTitle}>Communication</h2>

      <div style={styles.supportContainer}>
        {communication.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              style={styles.supportItem}
              onClick={item.action}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.supportItemHover);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={styles.supportContent}>
                <div style={styles.iconContainer(item.color)}>
                  <IconComponent size={28} color={item.color} />
                </div>
                <div style={styles.supportText}>
                  <div style={styles.supportTitle}>{item.title}</div>
                  <div style={styles.supportDescription}>
                    {item.description}
                  </div>
                </div>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={styles.chevron}
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          );
        })}
      </div>

      {/* Maintenance Mode Modal */}
      {openModal === "maintenance" && (
        <ModalComponent
          title="Maintenance Mode"
          onClose={() => setOpenModal(null)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                padding: "16px",
                borderRadius: "10px",
                backgroundColor: isMaintenanceActive ? "#fee2e2" : "#f0fdf4",
                border: `1px solid ${
                  isMaintenanceActive ? "#fecaca" : "#bbf7d0"
                }`,
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: isMaintenanceActive ? "#ef4444" : "#22c55e",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {isMaintenanceActive ? (
                  <ShieldAlert size={20} />
                ) : (
                  <ShieldCheck size={20} />
                )}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: isMaintenanceActive ? "#991b1b" : "#166534",
                  }}
                >
                  {isMaintenanceActive
                    ? "Maintenance Mode Active"
                    : "Platform Live & Operational"}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: isMaintenanceActive ? "#b91c1c" : "#15803d",
                  }}
                >
                  {isMaintenanceActive
                    ? "Access is restricted for public users."
                    : "All systems and portal services are running normally."}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Enable Maintenance Mode
              </span>
              <button
                type="button"
                onClick={() => setIsMaintenanceActive(!isMaintenanceActive)}
                style={{
                  width: "48px",
                  height: "26px",
                  borderRadius: "13px",
                  backgroundColor: isMaintenanceActive ? "#2196f3" : "#cbd5e1",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background-color 0.2s ease",
                  padding: "2px",
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    transform: isMaintenanceActive
                      ? "translateX(22px)"
                      : "translateX(0)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "6px",
                }}
              >
                Estimated Duration
              </label>
              <select
                value={maintenanceDuration}
                onChange={(e) => setMaintenanceDuration(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                }}
              >
                <option value="30 minutes">30 Minutes</option>
                <option value="1 hour">1 Hour</option>
                <option value="2 hours">2 Hours</option>
                <option value="Until manually disabled">
                  Until Manually Disabled
                </option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "6px",
                }}
              >
                Maintenance Notice
              </label>
              <textarea
                rows={3}
                value={maintenanceReason}
                onChange={(e) => setMaintenanceReason(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  fontSize: "13px",
                  resize: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  backgroundColor: "#eee",
                  color: "#333",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveMaintenance}
                style={{
                  padding: "8px 18px",
                  borderRadius: "6px",
                  backgroundColor: "#2196f3",
                  color: "#fff",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </ModalComponent>
      )}

      {/* Theme Setting Modal */}
      {openModal === "theme" && (
        <ModalComponent
          title="Theme Setting"
          onClose={() => setOpenModal(null)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "8px",
                }}
              >
                Select Theme
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <div
                  onClick={() => setCurrentTheme("light")}
                  style={{
                    padding: "14px",
                    borderRadius: "8px",
                    border: `2px solid ${
                      currentTheme === "light" ? "#2196f3" : "#ddd"
                    }`,
                    backgroundColor:
                      currentTheme === "light" ? "#e3f2fd" : "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Sun size={18} color="#f57c00" />
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    Light Mode
                  </span>
                </div>
                <div
                  onClick={() => setCurrentTheme("dark")}
                  style={{
                    padding: "14px",
                    borderRadius: "8px",
                    border: `2px solid ${
                      currentTheme === "dark" ? "#2196f3" : "#ddd"
                    }`,
                    backgroundColor:
                      currentTheme === "dark" ? "#e3f2fd" : "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Moon size={18} color="#2196f3" />
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    Dark Mode
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "8px",
                }}
              >
                Accent Color
              </label>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                {[
                  { name: "Blue", hex: "#2196f3" },
                  { name: "Green", hex: "#4caf50" },
                  { name: "Orange", hex: "#ff9800" },
                  { name: "Purple", hex: "#9c27b0" },
                ].map((color) => {
                  const isSelected = accentColor === color.hex;
                  return (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => setAccentColor(color.hex)}
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "8px",
                        backgroundColor: color.hex,
                        color: "#fff",
                        border: isSelected
                          ? "3px solid #000"
                          : "3px solid transparent",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                      }}
                    >
                      {isSelected && <Check size={14} />}
                      {color.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  backgroundColor: "#eee",
                  color: "#333",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveTheme}
                style={{
                  padding: "8px 18px",
                  borderRadius: "6px",
                  backgroundColor: "#2196f3",
                  color: "#fff",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Save Theme
              </button>
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
}
