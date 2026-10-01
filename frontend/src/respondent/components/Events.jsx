import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Plus,
  ChevronRight,
  User,
  Users,
  X,
  Video,
  Check,
  Trash2,
  CalendarPlus,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Events() {
  const navigate = useNavigate();
  const [isMobile] = useState(window.innerWidth <= 480);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Hearing - Smith vs. Johnson",
      type: "Hearing",
      date: "25 Sep 2025",
      time: "10:30 AM",
      location: "Virtual Courtroom",
      caseId: "2024-45",
      description: "Final hearing for case 2024-45. Both parties must be present with documentary evidence.",
      status: "Upcoming",
      icon: "⚖️",
    },
    {
      id: 2,
      title: "Document Submission Deadline",
      type: "Deadline",
      date: "23 Sep 2025",
      time: "5:00 PM",
      location: "Online Portal",
      caseId: "2024-45",
      description: "Submit all counter-affidavits and supporting evidentiary documents via the Documents portal.",
      status: "Upcoming",
      icon: "📄",
    },
    {
      id: 3,
      title: "Pre-hearing Conference",
      type: "Conference",
      date: "28 Sep 2025",
      time: "2:00 PM",
      location: "District Court - Room 3",
      caseId: "2024-52",
      description: "Preliminary case management conference with arbitrator and opposing counsel.",
      status: "Upcoming",
      icon: "🤝",
    },
    {
      id: 4,
      title: "Case Resolution Meeting",
      type: "Meeting",
      date: "20 Sep 2025",
      time: "11:00 AM",
      location: "Virtual Meeting Room",
      caseId: "2024-48",
      description: "Discussion on amicable dispute settlement and consent terms formulation.",
      status: "Completed",
      icon: "✓",
    },
  ]);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // New Event Form State
  const [formData, setFormData] = useState({
    title: "",
    type: "Hearing",
    date: "",
    time: "",
    location: "Virtual Courtroom",
    caseId: "2024-45",
    description: "",
  });

  const upcomingEvents = events.filter((e) => e.status === "Upcoming");
  const completedEvents = events.filter((e) => e.status === "Completed");

  // Type icon mapping
  const getTypeIcon = (type) => {
    switch (type) {
      case "Hearing":
        return "⚖️";
      case "Deadline":
        return "📄";
      case "Conference":
        return "🤝";
      case "Meeting":
        return "👥";
      default:
        return "📅";
    }
  };

  // ADD EVENT SUBMISSION
  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      toast.error("Please fill in the title, date, and time.");
      return;
    }

    const formattedDate = new Date(formData.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newEvent = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      date: formattedDate || formData.date,
      time: formData.time,
      location: formData.location || "Virtual Courtroom",
      caseId: formData.caseId || "2024-45",
      description: formData.description || "Scheduled dispute resolution event.",
      status: "Upcoming",
      icon: getTypeIcon(formData.type),
    };

    setEvents((prev) => [newEvent, ...prev]);
    toast.success("Event scheduled successfully!");
    setShowAddModal(false);
    setFormData({
      title: "",
      type: "Hearing",
      date: "",
      time: "",
      location: "Virtual Courtroom",
      caseId: "2024-45",
      description: "",
    });
  };

  // MARK AS COMPLETED
  const handleToggleComplete = (id) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const nextStatus = e.status === "Completed" ? "Upcoming" : "Completed";
          const nextIcon = nextStatus === "Completed" ? "✓" : getTypeIcon(e.type);
          toast.success(`Event marked as ${nextStatus.toLowerCase()}!`);
          return { ...e, status: nextStatus, icon: nextIcon };
        }
        return e;
      })
    );
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === "Completed" ? "Upcoming" : "Completed",
              icon: prev.status === "Completed" ? getTypeIcon(prev.type) : "✓",
            }
          : null
      );
    }
  };

  // DELETE EVENT
  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast.info("Event removed from schedule.");
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent(null);
    }
  };

  // JOIN VIRTUAL HEARING
  const handleJoinHearing = (event) => {
    toast.info(`Joining virtual session for Case #${event.caseId}...`);
    navigate("/respondent/online-meeting");
  };

  // DOWNLOAD ICALENDAR (.ICS)
  const handleDownloadIcs = (event) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Utkal ODR//Events Portal//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description} (Case #${event.caseId})
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title.replace(/[^a-zA-Z0-9]/g, "_")}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Calendar invite (.ics) downloaded!");
  };

  const isVirtualLocation = (loc) => {
    if (!loc) return false;
    const lower = loc.toLowerCase();
    return lower.includes("virtual") || lower.includes("online") || lower.includes("meet") || lower.includes("zoom");
  };

  const styles = {
    container: {
      padding: isMobile ? "1rem" : "2rem",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#ff9900",
      color: "#fff",
      padding: "1rem 1.5rem",
      borderRadius: "8px",
      marginBottom: isMobile ? "1rem" : "2rem",
      fontSize: "18px",
      fontWeight: "600",
      flexWrap: isMobile ? "wrap" : "nowrap",
      gap: "1rem",
    },
    addButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.55rem 1.15rem",
      backgroundColor: "#ffffff",
      border: "none",
      color: "#ff9900",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "700",
      transition: "all 0.2s ease",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
      marginTop: "2rem",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    eventsList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.85rem",
      marginBottom: "2rem",
    },
    eventCard: (isCompleted) => ({
      display: "flex",
      gap: "1rem",
      padding: "1.1rem 1.25rem",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      transition: "all 0.2s ease",
      borderLeft: isCompleted ? "5px solid #22bb33" : "5px solid #ff9900",
      opacity: isCompleted ? 0.85 : 1,
      alignItems: "center",
      cursor: "pointer",
      flexWrap: isMobile ? "wrap" : "nowrap",
    }),
    eventIcon: {
      fontSize: "30px",
      flexShrink: 0,
      width: "48px",
      height: "48px",
      borderRadius: "10px",
      backgroundColor: "#f8fafc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #e2e8f0",
    },
    eventContent: {
      flex: 1,
    },
    eventTitle: {
      fontSize: "15px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "0.35rem",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    eventDescription: {
      fontSize: "13px",
      color: "#64748b",
      marginBottom: "0.5rem",
      lineHeight: 1.4,
    },
    eventMeta: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
      fontSize: "12px",
      color: "#475569",
    },
    metaItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
      fontWeight: "500",
    },
    eventActions: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "center",
      flexShrink: 0,
    },
    actionButton: {
      padding: "0.55rem 0.85rem",
      backgroundColor: "#0066cc18",
      color: "#0066cc",
      border: "1.5px solid #0066cc33",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "13px",
      fontWeight: "600",
      transition: "all 0.2s ease",
    },
    joinButton: {
      padding: "0.55rem 0.95rem",
      backgroundColor: "#22bb33",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "13px",
      fontWeight: "700",
      boxShadow: "0 2px 6px rgba(34, 187, 51, 0.3)",
      transition: "all 0.2s ease",
    },
    emptyState: {
      textAlign: "center",
      padding: "2.5rem 1rem",
      color: "#94a3b8",
      fontSize: "14px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      border: "1px dashed #cbd5e1",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(15, 23, 42, 0.65)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "1rem",
    },
    modalCard: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      maxWidth: "540px",
      width: "100%",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      position: "relative",
      padding: "2rem",
      animation: "fadeIn 0.2s ease-out",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Calendar size={24} />
          <span>Events & Hearing Schedule</span>
        </div>
        <button
          style={styles.addButton}
          onClick={() => setShowAddModal(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#fff7ed";
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ffffff";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <Plus size={16} />
          Add Event
        </button>
      </div>

      {/* Upcoming Events */}
      <div>
        <div style={styles.sectionTitle}>
          <AlertCircle size={20} color="#ff9900" />
          Upcoming Events ({upcomingEvents.length})
        </div>
        {upcomingEvents.length > 0 ? (
          <div style={styles.eventsList}>
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                style={styles.eventCard(false)}
                onClick={() => setSelectedEvent(event)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={styles.eventIcon}>{event.icon}</div>
                <div style={styles.eventContent}>
                  <div style={styles.eventTitle}>
                    {event.title}
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        backgroundColor: "#ffedd5",
                        color: "#c2410c",
                        borderRadius: "12px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                      }}
                    >
                      {event.type}
                    </span>
                  </div>
                  <div style={styles.eventDescription}>{event.description}</div>
                  <div style={styles.eventMeta}>
                    <div style={styles.metaItem}>
                      <Calendar size={13} color="#f97316" />
                      {event.date}
                    </div>
                    <div style={styles.metaItem}>
                      <Clock size={13} color="#f97316" />
                      {event.time}
                    </div>
                    <div style={styles.metaItem}>
                      <MapPin size={13} color="#f97316" />
                      {event.location}
                    </div>
                    <div style={{ ...styles.metaItem, fontWeight: "700", color: "#0066cc" }}>
                      Case #{event.caseId}
                    </div>
                  </div>
                </div>

                <div style={styles.eventActions} onClick={(e) => e.stopPropagation()}>
                  {isVirtualLocation(event.location) && (
                    <button
                      style={styles.joinButton}
                      onClick={() => handleJoinHearing(event)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#16a34a";
                        e.currentTarget.style.transform = "scale(1.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#22bb33";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                      title="Join Online Hearing Session"
                    >
                      <Video size={15} />
                      Join
                    </button>
                  )}
                  <button
                    style={styles.actionButton}
                    onClick={() => setSelectedEvent(event)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#0066cc28";
                      e.currentTarget.style.transform = "scale(1.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#0066cc18";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    title="View Event Details"
                  >
                    Details
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>No upcoming events scheduled</div>
        )}
      </div>

      {/* Completed Events */}
      <div>
        <div style={styles.sectionTitle}>
          <CheckCircle2 size={20} color="#22bb33" />
          Completed Events ({completedEvents.length})
        </div>
        {completedEvents.length > 0 ? (
          <div style={styles.eventsList}>
            {completedEvents.map((event) => (
              <div
                key={event.id}
                style={styles.eventCard(true)}
                onClick={() => setSelectedEvent(event)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ ...styles.eventIcon, backgroundColor: "#f0fdf4", color: "#16a34a" }}>
                  ✓
                </div>
                <div style={styles.eventContent}>
                  <div style={styles.eventTitle}>
                    <span style={{ textDecoration: "line-through", color: "#64748b" }}>{event.title}</span>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        backgroundColor: "#dcfce7",
                        color: "#166534",
                        borderRadius: "12px",
                        fontWeight: "700",
                      }}
                    >
                      COMPLETED
                    </span>
                  </div>
                  <div style={styles.eventDescription}>{event.description}</div>
                  <div style={styles.eventMeta}>
                    <div style={styles.metaItem}>
                      <Calendar size={13} />
                      {event.date}
                    </div>
                    <div style={styles.metaItem}>
                      <Clock size={13} />
                      {event.time}
                    </div>
                    <div style={styles.metaItem}>
                      <MapPin size={13} />
                      {event.location}
                    </div>
                    <div style={styles.metaItem}>Case #{event.caseId}</div>
                  </div>
                </div>

                <div style={styles.eventActions} onClick={(e) => e.stopPropagation()}>
                  <button
                    style={styles.actionButton}
                    onClick={() => setSelectedEvent(event)}
                    title="View Event Details"
                  >
                    Details
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>No completed events yet</div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. ADD EVENT MODAL                                                        */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Calendar size={22} color="#f97316" />
                <h3 style={{ margin: 0, fontSize: "19px", fontWeight: "800", color: "#0f172a" }}>
                  Schedule New Event
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                  padding: "4px",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Conciliation Hearing with Neutral"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                    Event Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "14px",
                      backgroundColor: "#fff",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="Hearing">Hearing ⚖️</option>
                    <option value="Deadline">Deadline 📄</option>
                    <option value="Conference">Conference 🤝</option>
                    <option value="Meeting">Meeting 👥</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                    Case ID
                  </label>
                  <input
                    type="text"
                    value={formData.caseId}
                    onChange={(e) => setFormData({ ...formData, caseId: e.target.value })}
                    placeholder="2024-45"
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                    Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                  Location / Platform
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Virtual Courtroom / District Court"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    marginBottom: "6px",
                  }}
                />
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {["Virtual Courtroom", "District Court - Room 3", "Online Portal"].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setFormData({ ...formData, location: loc })}
                      style={{
                        fontSize: "11px",
                        padding: "3px 8px",
                        backgroundColor: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                  Description / Agenda
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide notes or instructions for this scheduled event..."
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: "0.75rem 1.25rem",
                    backgroundColor: "#f1f5f9",
                    color: "#475569",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "0.75rem",
                    backgroundColor: "#ff9900",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "14px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(255, 153, 0, 0.3)",
                  }}
                >
                  <Plus size={16} />
                  Schedule Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. EVENT DETAILS MODAL                                                    */}
      {/* ========================================================================= */}
      {selectedEvent && (
        <div style={styles.modalOverlay} onClick={() => setSelectedEvent(null)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "28px" }}>{selectedEvent.icon}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>
                    {selectedEvent.title}
                  </h3>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "4px",
                      padding: "2px 8px",
                      backgroundColor: selectedEvent.status === "Completed" ? "#dcfce7" : "#ffedd5",
                      color: selectedEvent.status === "Completed" ? "#15803d" : "#c2410c",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                    }}
                  >
                    {selectedEvent.status}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                  padding: "4px",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Details Grid */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "1.25rem",
                marginBottom: "1.25rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                fontSize: "13.5px",
              }}
            >
              <div>
                <span style={{ display: "block", color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" }}>
                  Date & Time
                </span>
                <span style={{ fontWeight: "700", color: "#0f172a" }}>
                  {selectedEvent.date} at {selectedEvent.time}
                </span>
              </div>
              <div>
                <span style={{ display: "block", color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" }}>
                  Case ID
                </span>
                <span style={{ fontWeight: "700", color: "#0066cc" }}>Case #{selectedEvent.caseId}</span>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <span style={{ display: "block", color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" }}>
                  Location / Medium
                </span>
                <span style={{ fontWeight: "600", color: "#0f172a" }}>{selectedEvent.location}</span>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ display: "block", color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", marginBottom: "4px" }}>
                Description & Agenda
              </span>
              <p style={{ margin: 0, fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
                {selectedEvent.description}
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {isVirtualLocation(selectedEvent.location) && (
                <button
                  type="button"
                  onClick={() => {
                    const evt = selectedEvent;
                    setSelectedEvent(null);
                    handleJoinHearing(evt);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "0.75rem",
                    backgroundColor: "#22bb33",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "14px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(34, 187, 51, 0.3)",
                  }}
                >
                  <Video size={16} />
                  Join Online Courtroom Session
                </button>
              )}

              <div style={{ display: "flex", gap: "0.65rem" }}>
                <button
                  type="button"
                  onClick={() => handleDownloadIcs(selectedEvent)}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "0.7rem",
                    backgroundColor: "#f1f5f9",
                    color: "#0f172a",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  <CalendarPlus size={15} />
                  Add to Calendar (.ics)
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleComplete(selectedEvent.id)}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "0.7rem",
                    backgroundColor: selectedEvent.status === "Completed" ? "#fef3c7" : "#ecfdf5",
                    color: selectedEvent.status === "Completed" ? "#b45309" : "#047857",
                    border: selectedEvent.status === "Completed" ? "1px solid #fde68a" : "1px solid #a7f3d0",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  <Check size={15} />
                  {selectedEvent.status === "Completed" ? "Mark as Upcoming" : "Mark as Completed"}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                  style={{
                    padding: "0.7rem 0.85rem",
                    backgroundColor: "#fef2f2",
                    color: "#dc2626",
                    border: "1px solid #fecaca",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                  title="Delete Event"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
