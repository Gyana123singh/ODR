import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Video,
  Plus,
  Scale,
  Calendar,
  Clock,
  User,
  Search,
  Copy,
  Check,
  X,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Share2,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
  Minimize2,
  Maximize2,
  Sparkles,
  Send,
  Bot,
  Trash2,
  MessageSquare,
  MonitorUp,
  Folder,
  Download,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";
import "./GoogleMeet.css";

export default function GoogleMeet() {
  const { roomId } = useParams();
  const [joinQuery, setJoinQuery] = useState("");
  const [selectedDayIndex] = useState(1); // 1 = MON 21

  // Modals
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [inChamber, setInChamber] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chamberTitle, setChamberTitle] = useState("Virtual Hearing Chamber");

  // Instant Meeting & Shareable Link
  const [activeChamberLink, setActiveChamberLink] = useState("");
  const [showInstantLinkPrompt, setShowInstantLinkPrompt] = useState(false);

  // In-Call Chat Box (Everyone texts one by one)
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [chatMessageText, setChatMessageText] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Hon'ble Presiding Neutral",
      role: "Neutral",
      roleColor: "#8b5cf6",
      text: "Good morning counsels and parties. The virtual dispute hearing is now in formal session. Please state your appearances.",
      time: "10:30 AM",
      isSelf: false,
    },
    {
      id: 2,
      sender: "Adv. Rajesh Sharma (Claimant)",
      role: "Claimant Counsel",
      roleColor: "#3b82f6",
      text: "Good morning Hon'ble Arbitrator. Submitting revised Statement of Claim and Annexure A-1 in digital format.",
      time: "10:31 AM",
      isSelf: false,
    },
    {
      id: 3,
      sender: "Reliance Legal Team",
      role: "Respondent",
      roleColor: "#10b981",
      text: "Receipt acknowledged. Reviewing digital annexures with our client. We are present and ready.",
      time: "10:32 AM",
      isSelf: false,
    },
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, showChatDrawer]);

  // Meeting Toolbar Controls (matching screenshot)
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Media streams
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const pipVideoRef = useRef(null);

  // Week days
  const weekDays = [
    { name: "SUN", num: 20, label: "Sunday, Sep 20, 2026" },
    { name: "MON", num: 21, label: "Monday, Sep 21, 2026" },
    { name: "TUE", num: 22, label: "Tuesday, Sep 22, 2026" },
    { name: "WED", num: 23, label: "Wednesday, Sep 23, 2026" },
    { name: "THU", num: 24, label: "Thursday, Sep 24, 2026" },
    { name: "FRI", num: 25, label: "Friday, Sep 25, 2026" },
    { name: "SAT", num: 26, label: "Saturday, Sep 26, 2026" },
  ];

  // Event Schedule State (matching reference design Day 1 to Day 5)
  const [activeDayTab, setActiveDayTab] = useState("Day 1");
  const [selectedSessionModal, setSelectedSessionModal] = useState(null);

  const [eventScheduleDays, setEventScheduleDays] = useState({
    "Day 1": [
      {
        id: "ev-101",
        dateDay: "16",
        dateMonth: "NOVEMBER",
        speakerName: "Harman Kardon",
        speakerAvatar: "/avatars/speaker1.jpg",
        leader: "Aslan Linker",
        tag: "Inspire",
        time: "05:35 AM – 08:00 AM",
        duration: "2h 25m",
        venue: "Room B3",
        caseId: "ODR-2026-116",
        caseTitle: "Harman Kardon vs. SoundCraft Dynamics Ltd.",
        type: "arbitration",
        typeLabel: "Commercial Arbitration",
        description: "Formal virtual dispute proceedings regarding intellectual property licensing and audio components supply agreement.",
        neutral: "Hon'ble Justice S. K. Mohanty (Retd.)",
      },
      {
        id: "ev-102",
        dateDay: "20",
        dateMonth: "NOVEMBER",
        speakerName: "Toni Duggan",
        speakerAvatar: "/avatars/speaker2.jpg",
        leader: "Aslan Linker",
        tag: "Inspire",
        time: "05:35 AM – 08:00 AM",
        duration: "2h 25m",
        venue: "Room D3",
        caseId: "ODR-2026-120",
        caseTitle: "Toni Duggan Sports Management vs. League Board",
        type: "mediation",
        typeLabel: "Mediation Session",
        description: "Facilitated institutional mediation session covering sports sponsorship covenants, venue broadcast terms, and player compensation.",
        neutral: "Adv. Rajesh Pattnaik (Senior Mediator)",
      },
      {
        id: "ev-103",
        dateDay: "18",
        dateMonth: "NOVEMBER",
        speakerName: "Bilial Hossain",
        speakerAvatar: "/avatars/speaker3.jpg",
        leader: "Aslan Linker",
        tag: "Inspire",
        time: "05:35 AM – 08:00 AM",
        duration: "2h 25m",
        venue: "Room A3",
        caseId: "ODR-2026-118",
        caseTitle: "Bilial Hossain Warehousing vs. Continental Cargo",
        type: "conciliation",
        typeLabel: "Conciliation Hearing",
        description: "Cross-border maritime shipping settlement conference regarding unpaid storage demurrage claims.",
        neutral: "Dr. Ananya Mishra (Conciliator)",
      },
    ],
    "Day 2": [
      {
        id: "ev-201",
        dateDay: "21",
        dateMonth: "November",
        speakerName: "M/s Apex Logistics",
        speakerAvatar: "/avatars/speaker1.jpg",
        leader: "Justice Mohanty",
        tag: "Arbitration",
        time: "10:00 AM - 12:30 PM",
        duration: "2h 30'",
        venue: "Room B1",
        caseId: "ODR-2026-88",
        caseTitle: "M/s Apex Logistics vs. Reliance Freight Corp",
        type: "arbitration",
        typeLabel: "Commercial Arbitration",
        description: "High-value logistics contract dispute with digital evidentiary examination under Section 65B.",
        neutral: "Hon'ble Justice S. K. Mohanty (Retd.)",
      },
      {
        id: "ev-202",
        dateDay: "22",
        dateMonth: "November",
        speakerName: "Priya Sharma",
        speakerAvatar: "/avatars/speaker2.jpg",
        leader: "Rajesh Pattnaik",
        tag: "Mediation",
        time: "02:00 PM - 04:00 PM",
        duration: "2h 00'",
        venue: "Room D2",
        caseId: "ODR-2026-94",
        caseTitle: "Priya Sharma vs. Metro Urban Developers",
        type: "mediation",
        typeLabel: "Mediation Conference",
        description: "Real-estate possession delay compensation conference with mutual settlement term drafting.",
        neutral: "Adv. Rajesh Pattnaik (Senior Mediator)",
      },
    ],
    "Day 3": [
      {
        id: "ev-301",
        dateDay: "24",
        dateMonth: "November",
        speakerName: "BlueStone Enterprises",
        speakerAvatar: "/avatars/speaker3.jpg",
        leader: "Dr. Ananya Mishra",
        tag: "Conciliation",
        time: "11:00 AM - 01:00 PM",
        duration: "2h 00'",
        venue: "Room A1",
        caseId: "ODR-2026-102",
        caseTitle: "BlueStone Enterprises vs. TechVision LLP",
        type: "conciliation",
        typeLabel: "Conciliation Session",
        description: "IT Software development SLA failure dispute conciliation.",
        neutral: "Dr. Ananya Mishra (Conciliator)",
      },
    ],
    "Day 4": [
      {
        id: "ev-401",
        dateDay: "26",
        dateMonth: "November",
        speakerName: "Kalinga Metals Ltd.",
        speakerAvatar: "/avatars/speaker1.jpg",
        leader: "Justice Mohanty",
        tag: "Arbitration",
        time: "09:30 AM - 12:00 PM",
        duration: "2h 30'",
        venue: "Room B2",
        caseId: "ODR-2026-105",
        caseTitle: "Kalinga Metals Ltd. vs. Global Ore Traders",
        type: "arbitration",
        typeLabel: "International Arbitration",
        description: "Raw mineral supply pricing index dispute hearing.",
        neutral: "Hon'ble Justice S. K. Mohanty (Retd.)",
      },
    ],
    "Day 5": [
      {
        id: "ev-501",
        dateDay: "28",
        dateMonth: "November",
        speakerName: "Odishatech Cloud",
        speakerAvatar: "/avatars/speaker2.jpg",
        leader: "Rajesh Pattnaik",
        tag: "Mediation",
        time: "03:00 PM - 05:00 PM",
        duration: "2h 00'",
        venue: "Room C3",
        caseId: "ODR-2026-110",
        caseTitle: "Odishatech Cloud vs. SmartCity Infrastructure",
        type: "mediation",
        typeLabel: "Mediation Hearing",
        description: "Municipal data center cloud hosting invoice settlement conference.",
        neutral: "Adv. Rajesh Pattnaik (Senior Mediator)",
      },
    ],
  });

  // Schedule Form
  const [formCaseId, setFormCaseId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState("arbitration");
  const [formTime, setFormTime] = useState("10:00 AM");
  const [formDuration, setFormDuration] = useState("60 mins");
  const [formNeutral, setFormNeutral] = useState("Presiding Arbitrator");

  // Auto-join if roomId parameter is in the URL
  useEffect(() => {
    if (roomId) {
      const formattedTitle = `Hearing Chamber: ${roomId.toUpperCase()}`;
      setChamberTitle(formattedTitle);
      setInChamber(true);
      setIsMinimized(false);
      startCamera();
      toast.info(`Joined chamber: ${roomId}`);
    }
  }, [roomId]);

  // Handle stream attachments for main video, screen share, and presenter PIP
  useEffect(() => {
    if (isScreenSharing && screenStreamRef.current && videoRef.current) {
      if (videoRef.current.srcObject !== screenStreamRef.current) {
        videoRef.current.srcObject = screenStreamRef.current;
        videoRef.current.play?.().catch(() => {});
      }
      if (pipVideoRef.current && streamRef.current && isVideoOn) {
        if (pipVideoRef.current.srcObject !== streamRef.current) {
          pipVideoRef.current.srcObject = streamRef.current;
          pipVideoRef.current.play?.().catch(() => {});
        }
      }
    } else if (!isScreenSharing && inChamber && !isMinimized && isVideoOn && videoRef.current && streamRef.current) {
      if (videoRef.current.srcObject !== streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.play?.().catch(() => {});
      }
    }
  }, [inChamber, isMinimized, isVideoOn, isScreenSharing]);

  // Cleanup all media tracks on unmount
  useEffect(() => {
    return () => {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // Universal shareable meeting link
  const universalMeetingLink = `${window.location.origin}/meet/utkal-odr-room`;

  const handleCopyUniversalLink = () => {
    navigator.clipboard.writeText(universalMeetingLink);
    toast.success("Meeting link copied! Anyone with this link can join directly.");
  };

  // Screen Share Management (Stop & Toggle)
  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
          track.onended = null;
        } catch (e) {
          console.error("Error stopping track:", e);
        }
      });
      screenStreamRef.current = null;
    }
    setIsScreenSharing(false);

    // Switch videoRef back to camera if camera is on
    setTimeout(() => {
      if (videoRef.current) {
        if (isVideoOn && streamRef.current) {
          videoRef.current.srcObject = streamRef.current;
          videoRef.current.play?.().catch(() => {});
        } else {
          videoRef.current.srcObject = null;
        }
      }
    }, 50);

    toast.info("Screen sharing ended");
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      stopScreenShare();
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      toast.warning("Display Media / Screen Sharing API is not supported in this browser.");
      return;
    }

    try {
      // Prompt user to select screen / window / tab
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
        },
        audio: false,
      });

      screenStreamRef.current = screenStream;

      // Handle user clicking the native browser "Stop sharing" floating bar
      const videoTrack = screenStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          stopScreenShare();
        };
      }

      setIsScreenSharing(true);

      // Attach immediately to the video element
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = screenStream;
          videoRef.current.play?.().catch(() => {});
        }
        if (pipVideoRef.current && streamRef.current && isVideoOn) {
          pipVideoRef.current.srcObject = streamRef.current;
          pipVideoRef.current.play?.().catch(() => {});
        }
      }, 50);

      toast.success("You are now presenting your screen");
    } catch (err) {
      // If user cancelled the browser screen share picker
      if (err.name === "NotAllowedError" || err.name === "AbortError") {
        console.log("User cancelled screen share dialog");
      } else {
        console.error("Screen share error:", err);
        toast.error(`Screen share failed: ${err.message || "Permission issue"}`);
      }
    }
  };

  // Launch Room (supports Instant Meeting with auto-generated shareable link)
  const handleLaunchChamber = (title = "Virtual Hearing Chamber", isInstant = false) => {
    const chamberCode = isInstant
      ? `instant-${Date.now().toString(36).slice(-5)}`
      : "utkal-odr-room";
    const link = `${window.location.origin}/meet/${chamberCode}`;
    setActiveChamberLink(link);
    setChamberTitle(title);
    setInChamber(true);
    setIsMinimized(false);
    if (isInstant) {
      setShowInstantLinkPrompt(true);
    }
    startCamera();
  };

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.log("Camera access fallback:", err);
    }
  };

  const handleLeaveChamber = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setInChamber(false);
    setIsMinimized(false);
    setIsScreenSharing(false);
    setShowChatDrawer(false);
    setShowInstantLinkPrompt(false);
    toast.info("Left the hearing chamber.");
  };

  // In-Call Chat Sending (Everyone texts one by one)
  const handleSendChatMessage = (e) => {
    e?.preventDefault();
    if (!chatMessageText.trim()) return;
    const text = chatMessageText.trim();
    const newMsg = {
      id: Date.now(),
      sender: "You",
      role: "Participant",
      roleColor: "#2563eb",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSelf: true,
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatMessageText("");

    // Realistic participant response in the hearing
    setTimeout(() => {
      let replySender = "Hon'ble Presiding Neutral";
      let replyRole = "Neutral";
      let replyColor = "#8b5cf6";
      let replyText = `Noted. Recorded in hearing proceedings: "${text.length > 35 ? text.slice(0, 35) + '...' : text}"`;

      if (text.toLowerCase().includes("rejoinder") || text.toLowerCase().includes("extension") || text.toLowerCase().includes("time")) {
        replyText = "The tribunal grants reasonable time for filing. Pleadings schedule will be reflected in today's electronic minutes.";
      } else if (text.toLowerCase().includes("evidence") || text.toLowerCase().includes("document") || text.toLowerCase().includes("annexure")) {
        replySender = "Adv. Rajesh Sharma (Claimant)";
        replyRole = "Claimant Counsel";
        replyColor = "#3b82f6";
        replyText = "Documents uploaded to case docket with Section 65B electronic verification certificate.";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: replySender,
          role: replyRole,
          roleColor: replyColor,
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSelf: false,
        },
      ]);
    }, 1200);
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audio = streamRef.current.getAudioTracks()[0];
      if (audio) audio.enabled = !isMicOn;
    }
    setIsMicOn(!isMicOn);
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const video = streamRef.current.getVideoTracks()[0];
      if (video) video.enabled = !isVideoOn;
    }
    setIsVideoOn(!isVideoOn);
  };

  // Join case input
  const handleJoinQuery = (e) => {
    e?.preventDefault();
    if (!joinQuery.trim()) return;
    toast.info(`Connecting to ${joinQuery.toUpperCase()}`);
    handleLaunchChamber(`Case Chamber: ${joinQuery.toUpperCase()}`);
  };

  // Submit new schedule
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const dayNum = weekDays[selectedDayIndex].num;
    const typeLabels = {
      arbitration: "Arbitration",
      mediation: "Mediation",
      conciliation: "Conciliation",
    };

    // Add to eventScheduleDays
    const newEvent = {
      id: `ev-${Date.now()}`,
      dateDay: `${dayNum}`,
      dateMonth: "November",
      speakerName: formTitle,
      speakerAvatar: "/avatars/speaker1.jpg",
      leader: formNeutral || "Arbitrator / Neutral",
      tag: typeLabels[formType] || "Hearing",
      time: formTime,
      duration: formDuration,
      venue: `Room ${Math.floor(1 + Math.random() * 9)}B`,
      caseId: formCaseId || `ODR-2026-${Math.floor(100 + Math.random() * 900)}`,
      caseTitle: formTitle,
      type: formType,
      typeLabel: typeLabels[formType] || "Hearing",
      description: `Institutional ${formType} hearing scheduled under Utkal ODR institutional dispute rules.`,
      neutral: formNeutral || "Presiding Arbitrator",
    };

    setEventScheduleDays((prev) => ({
      ...prev,
      [activeDayTab]: [...(prev[activeDayTab] || []), newEvent],
    }));

    setFormCaseId("");
    setFormTitle("");
    setShowScheduleModal(false);
    toast.success("Hearing scheduled successfully.");
  };

  // Download Schedule Handler
  const handleDownloadSchedule = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Day,Date,Month,Speaker/Party,Leader/Neutral,Category,Time,Duration,Venue,Case ID\n";
    
    Object.entries(eventScheduleDays).forEach(([day, items]) => {
      items.forEach((item) => {
        csvContent += `"${day}","${item.dateDay}","${item.dateMonth}","${item.speakerName}","${item.leader}","${item.tag}","${item.time}","${item.duration}","${item.venue}","${item.caseId}"\n`;
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Utkal_ODR_Event_Schedule.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Event schedule downloaded successfully!");
  };

  const currentDayEvents = eventScheduleDays[activeDayTab] || [];

  return (
    <div className="uom-container">
      {/* ================= SIMPLE TOP HEADER ================= */}
      <header className="uom-header">
        <div className="uom-header-left">
          <div className="uom-logo-icon">
            <Scale size={20} />
          </div>
          <span className="uom-header-title">
            Utkal ODR <span>Meet</span>
          </span>
        </div>

        <div className="uom-header-right">
          <button
            className="uom-btn-outline"
            onClick={() => handleLaunchChamber("Instant Hearing Session", true)}
            title="Start Instant Meeting with shareable link & AI Co-Pilot"
          >
            <Video size={15} />
            <span>Instant Meeting</span>
          </button>

          <button
            className="uom-btn-outline"
            onClick={() => setShowScheduleModal(true)}
          >
            <Plus size={15} />
            <span>Schedule Hearing</span>
          </button>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="uom-main">
        {/* Quick Join Bar */}
        <section className="uom-join-bar">
          <form onSubmit={handleJoinQuery} className="uom-join-left">
            <div className="uom-join-input-wrap">
              <Search size={16} color="#94a3b8" />
              <input
                type="text"
                className="uom-join-input"
                placeholder="Enter Case ID (e.g. ODR-2026-88) or Meeting Link..."
                value={joinQuery}
                onChange={(e) => setJoinQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="uom-btn-primary"
              disabled={!joinQuery.trim()}
              style={{ opacity: joinQuery.trim() ? 1 : 0.6 }}
            >
              Join Chamber
            </button>
          </form>
        </section>

        {/* ================= REFERENCE EVENT SCHEDULE SECTION ================= */}
        <section className="uom-schedule-section">
          {/* Header with Calendar Icon and Title/Subtitle */}
          <div className="uom-schedule-header-wrap">
            <div className="uom-title-icon">
              <Calendar size={24} color="#ffffff" />
            </div>
            <div className="uom-title-text-group">
              <h1 className="uom-schedule-title">Event Schedule</h1>
              <p className="uom-schedule-desc">
                View institutional dispute schedules, upcoming arbitration hearings, and mediation sessions.
              </p>
            </div>
          </div>

          {/* Day Selector Tabs */}
          <div className="uom-day-tabs-wrap">
            {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"].map((day) => (
              <button
                key={day}
                type="button"
                className={`uom-day-tab ${activeDayTab === day ? "active" : ""}`}
                onClick={() => setActiveDayTab(day)}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Separate Orange Table Header Bar */}
          <div className="uom-table-header-bar">
            <div className="uom-th-col">DATE</div>
            <div className="uom-th-col">SPEAKER</div>
            <div className="uom-th-col">SESSION</div>
            <div className="uom-th-col uom-th-venue">VENUE</div>
            <div className="uom-th-col uom-th-action">ACTION</div>
          </div>

          {/* List of Individual Row Cards */}
          <div className="uom-cards-list">
            {currentDayEvents.length > 0 ? (
              currentDayEvents.map((item) => (
                <div key={item.id} className="uom-event-row-card">
                  {/* Col 1: Date Box with Accent Underline */}
                  <div className="uom-date-box">
                    <span className="uom-date-num">{item.dateDay}</span>
                    <span className="uom-date-month">{item.dateMonth}</span>
                    <span className="uom-date-dash" />
                  </div>

                  {/* Col 2: Speaker Avatar */}
                  <div className="uom-speaker-avatar-wrap">
                    <img
                      src={item.speakerAvatar}
                      alt={item.speakerName}
                      className="uom-speaker-avatar-img"
                    />
                  </div>

                  {/* Col 3: Session */}
                  <div className="uom-session-details">
                    <h3
                      className="uom-session-title"
                      onClick={() => setSelectedSessionModal(item)}
                      title="Click to view details"
                    >
                      {item.speakerName}
                    </h3>
                    <div className="uom-session-meta">
                      <span className="uom-meta-leader">
                        <User size={14} color="#ea580c" />
                        <span>{item.leader}</span>
                      </span>
                      <span className="uom-meta-tag">
                        <Folder size={12} color="#64748b" />
                        <span>{item.tag}</span>
                      </span>
                    </div>
                    <div className="uom-session-time">
                      <Clock size={13} color="#64748b" />
                      <span>{item.time}</span>
                      <span className="uom-dot-sep">•</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  {/* Col 4: Venue Pill */}
                  <div className="uom-venue-wrap">
                    <div className="uom-venue-pill">
                      <MapPin size={13} color="#ea580c" />
                      <span>{item.venue}</span>
                    </div>
                  </div>

                  {/* Col 5: Action Button */}
                  <div className="uom-action-wrap">
                    <button
                      type="button"
                      className="uom-btn-view-details"
                      onClick={() => setSelectedSessionModal(item)}
                    >
                      <span>View Details</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="uom-empty-state">
                <div className="uom-empty-icon">
                  <Calendar size={22} />
                  </div>
                  <h4 className="uom-empty-title">No events scheduled for {activeDayTab}</h4>
                  <p className="uom-empty-desc">
                    Click "Schedule Hearing" to add a hearing to this day.
                  </p>
                  <button
                    className="uom-btn-primary"
                    onClick={() => setShowScheduleModal(true)}
                  >
                    <Plus size={14} />
                    <span>Schedule Hearing</span>
                  </button>
                </div>
              )}
            </div>
        </section>
      </main>

      {/* ================= SESSION / HEARING DETAILS MODAL (Read More) ================= */}
      {selectedSessionModal && (
        <div className="uom-modal-overlay">
          <div className="uom-modal" style={{ maxWidth: "560px" }}>
            <div className="uom-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="uom-logo-icon" style={{ width: "32px", height: "32px" }}>
                  <Scale size={18} />
                </div>
                <div>
                  <h3 className="uom-modal-title">{selectedSessionModal.speakerName}</h3>
                  <span style={{ fontSize: "11px", color: "var(--uom-text-muted)" }}>
                    Case ID: {selectedSessionModal.caseId || "ODR-2026-HEARING"}
                  </span>
                </div>
              </div>
              <button
                className="uom-close-btn"
                onClick={() => setSelectedSessionModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "6px 0 16px 0" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px", padding: "12px", background: "#f8fafc", borderRadius: "10px" }}>
                <img
                  src={selectedSessionModal.speakerAvatar}
                  alt={selectedSessionModal.speakerName}
                  style={{ width: "64px", height: "64px", borderRadius: "10px", objectFit: "cover" }}
                />
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--uom-text-title)" }}>
                    {selectedSessionModal.caseTitle || selectedSessionModal.speakerName}
                  </div>
                  <div style={{ fontSize: "12px", color: "#ea580c", fontWeight: 600, marginTop: "2px" }}>
                    Presiding Neutral: {selectedSessionModal.neutral || selectedSessionModal.leader}
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--uom-text-muted)", marginTop: "2px" }}>
                    {selectedSessionModal.dateDay} {selectedSessionModal.dateMonth} • {selectedSessionModal.time} • {selectedSessionModal.venue}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <h4 style={{ fontSize: "12px", fontWeight: 700, color: "var(--uom-text-title)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Procedural Scope & Docket Notes
                </h4>
                <p style={{ fontSize: "13px", color: "var(--uom-text-muted)", lineHeight: 1.5 }}>
                  {selectedSessionModal.description || "Official electronic dispute resolution proceeding conducted pursuant to institutional arbitration and conciliation frameworks under Section 65B verification."}
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "18px" }}>
                <div style={{ background: "#f1f5f9", padding: "10px 12px", borderRadius: "8px" }}>
                  <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Session Type</span>
                  <strong style={{ fontSize: "12.5px", color: "#0f172a" }}>{selectedSessionModal.typeLabel || selectedSessionModal.tag}</strong>
                </div>
                <div style={{ background: "#f1f5f9", padding: "10px 12px", borderRadius: "8px" }}>
                  <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Assigned Venue</span>
                  <strong style={{ fontSize: "12.5px", color: "#0f172a" }}>{selectedSessionModal.venue}</strong>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  className="uom-btn-outline"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/meet/${selectedSessionModal.caseId || 'utkal-odr-room'}`);
                    toast.success("Hearing invitation link copied!");
                  }}
                >
                  <Copy size={14} />
                  <span>Copy Link</span>
                </button>
                <button
                  type="button"
                  className="uom-btn-primary"
                  onClick={() => {
                    const sessionToLaunch = selectedSessionModal;
                    setSelectedSessionModal(null);
                    handleLaunchChamber(`Hearing: ${sessionToLaunch.caseTitle || sessionToLaunch.speakerName}`);
                  }}
                  style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", boxShadow: "0 4px 12px rgba(234, 88, 12, 0.35)" }}
                >
                  <Video size={14} />
                  <span>Enter Virtual Chamber</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SCHEDULE MODAL ================= */}
      {showScheduleModal && (
        <div className="uom-modal-overlay">
          <div className="uom-modal">
            <div className="uom-modal-header">
              <h3 className="uom-modal-title">Schedule Hearing</h3>
              <button
                className="uom-close-btn"
                onClick={() => setShowScheduleModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit}>
              <div className="uom-form-group">
                <label className="uom-form-label">Case ID / Number</label>
                <input
                  type="text"
                  className="uom-form-input"
                  placeholder="e.g. ODR-2026-115"
                  value={formCaseId}
                  onChange={(e) => setFormCaseId(e.target.value)}
                  required
                />
              </div>

              <div className="uom-form-group">
                <label className="uom-form-label">Case Title / Parties</label>
                <input
                  type="text"
                  className="uom-form-input"
                  placeholder="e.g. Kumar Infra vs. State Trading Agency"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </div>

              <div className="uom-form-group">
                <label className="uom-form-label">Hearing Type</label>
                <select
                  className="uom-form-select"
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                >
                  <option value="arbitration">Arbitration Hearing</option>
                  <option value="mediation">Mediation Session</option>
                  <option value="conciliation">Conciliation Conference</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="uom-form-group">
                  <label className="uom-form-label">Time</label>
                  <input
                    type="text"
                    className="uom-form-input"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    required
                  />
                </div>
                <div className="uom-form-group">
                  <label className="uom-form-label">Duration</label>
                  <input
                    type="text"
                    className="uom-form-input"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="uom-form-group">
                <label className="uom-form-label">Presiding Arbitrator / Neutral</label>
                <input
                  type="text"
                  className="uom-form-input"
                  value={formNeutral}
                  onChange={(e) => setFormNeutral(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                <button
                  type="button"
                  className="uom-btn-outline"
                  onClick={() => setShowScheduleModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="uom-btn-primary">
                  Save Hearing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= VIRTUAL ROOM SCREEN ================= */}
      {inChamber && !isMinimized && (
        <div className="uom-modal-overlay">
          <div className={`uom-room-modal ${showChatDrawer ? "with-chat" : ""}`}>
            <div className="uom-room-top">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span>{chamberTitle}</span>
                <button
                  className="uom-btn-outline"
                  style={{
                    color: "#ffffff",
                    borderColor: "rgba(255,255,255,0.2)",
                    padding: "3px 10px",
                    fontSize: "12px",
                    borderRadius: "6px",
                  }}
                  onClick={handleCopyUniversalLink}
                  title="Copy joining link to invite others"
                >
                  <LinkIcon size={12} />
                  <span>Copy Joining Link</span>
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#10b981" }}>
                  <span className="uom-status-dot" />
                  <span>Connected • E2E Encrypted</span>
                </div>
                {/* Header Minimize Button */}
                <button
                  className="uom-ctrl-btn"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#f8fafc",
                  }}
                  onClick={() => {
                    setIsMinimized(true);
                    toast.info("Chamber minimized to Picture-in-Picture");
                  }}
                  title="Minimize chamber"
                >
                  <Minimize2 size={16} />
                </button>

                {/* Header Close Button */}
                <button
                  className="uom-ctrl-btn uom-chamber-close-btn"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#f8fafc",
                  }}
                  onClick={handleLeaveChamber}
                  title="Close and exit chamber"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="uom-room-middle">
              <div className="uom-room-video-area">
                {/* Instant Meeting Shareable Link Overlay */}
                {showInstantLinkPrompt && (
                  <div className="uom-instant-link-card">
                    <div className="uom-instant-link-header">
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Sparkles size={16} color="#3b82f6" />
                        <span>Instant Meeting Ready</span>
                      </div>
                      <button
                        className="uom-close-btn"
                        style={{ color: "#94a3b8" }}
                        onClick={() => setShowInstantLinkPrompt(false)}
                        title="Dismiss"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: "6px 0 10px 0" }}>
                      Share this direct link so others can join this session right now:
                    </p>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <input
                        type="text"
                        readOnly
                        value={activeChamberLink || universalMeetingLink}
                        className="uom-form-input"
                        style={{
                          fontSize: "12px",
                          padding: "6px 8px",
                          background: "#090d16",
                          color: "#f8fafc",
                          border: "1px solid #334155",
                        }}
                      />
                      <button
                        type="button"
                        className="uom-btn-primary"
                        style={{ padding: "6px 12px", fontSize: "12px", flexShrink: 0 }}
                        onClick={() => {
                          navigator.clipboard.writeText(activeChamberLink || universalMeetingLink);
                          toast.success("Instant meeting link copied!");
                        }}
                      >
                        <Copy size={13} />
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                )}


                {/* Presenting Banner when screen sharing */}
                {isScreenSharing && (
                  <div className="uom-presenting-banner">
                    <div className="uom-presenting-info">
                      <span className="uom-presenting-pulse" />
                      <MonitorUp size={15} />
                      <span>You are sharing your screen with the hearing chamber</span>
                    </div>
                    <button
                      type="button"
                      className="uom-btn-stop-presenting"
                      onClick={stopScreenShare}
                    >
                      Stop Presenting
                    </button>
                  </div>
                )}

                {isScreenSharing ? (
                  <div className="uom-screen-share-stage">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="uom-video-stream screen-content"
                    />
                    {/* Floating Presenter Webcam PIP if camera is active */}
                    {isVideoOn && (
                      <div className="uom-presenter-pip" title="Your Video (Presenter)">
                        <video
                          ref={pipVideoRef}
                          autoPlay
                          playsInline
                          muted
                          className="uom-presenter-pip-video"
                        />
                        <span className="uom-presenter-pip-label">You (Presenter)</span>
                      </div>
                    )}
                  </div>
                ) : isVideoOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="uom-video-stream"
                  />
                ) : (
                  <div style={{ textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                    <Scale size={48} style={{ opacity: 0.4, margin: "0 auto 12px auto" }} />
                    <p>Camera is switched off</p>
                  </div>
                )}
              </div>

              {/* ================= IN-CALL CHAT DRAWER ================= */}
              {showChatDrawer && (
                <div className="uom-chat-drawer">
                  {/* Chat Drawer Header */}
                  <div className="uom-chat-header">
                    <div>
                      <div className="uom-chat-title">
                        <MessageSquare size={16} color="#3b82f6" />
                        <span>In-Call Messages</span>
                      </div>
                      <div className="uom-chat-subtitle">
                        Everyone in this hearing can message one by one
                      </div>
                    </div>
                    <button
                      className="uom-close-btn"
                      onClick={() => setShowChatDrawer(false)}
                      title="Close Chat"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Encryption Notice */}
                  <div className="uom-chat-notice">
                    <span>🔒 End-to-end encrypted • Certified under Section 65B</span>
                  </div>

                  {/* Message List */}
                  <div className="uom-chat-messages">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`uom-msg-item ${msg.isSelf ? "self" : "other"}`}
                      >
                        {!msg.isSelf && (
                          <div
                            className="uom-msg-avatar"
                            style={{ backgroundColor: msg.roleColor || "#475569" }}
                          >
                            {msg.sender.charAt(0)}
                          </div>
                        )}
                        <div className="uom-msg-bubble-wrap">
                          <div className="uom-msg-meta">
                            <span className="uom-msg-sender">{msg.sender}</span>
                            {msg.role && (
                              <span
                                className="uom-msg-role-tag"
                                style={{
                                  color: msg.roleColor || "#94a3b8",
                                  borderColor: msg.roleColor ? `${msg.roleColor}40` : "#334155",
                                }}
                              >
                                {msg.role}
                              </span>
                            )}
                            <span className="uom-msg-time">{msg.time}</span>
                          </div>
                          <div className={`uom-msg-bubble ${msg.isSelf ? "self" : "other"}`}>
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input Form */}
                  <form onSubmit={handleSendChatMessage} className="uom-chat-input-form">
                    <input
                      type="text"
                      className="uom-chat-input"
                      style={{
                        color: "#000000",
                        WebkitTextFillColor: "#000000",
                        backgroundColor: "#ffffff",
                        caretColor: "#000000",
                        colorScheme: "light",
                      }}
                      placeholder="Send a message to everyone..."
                      value={chatMessageText}
                      onChange={(e) => setChatMessageText(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="uom-chat-send-btn"
                      disabled={!chatMessageText.trim()}
                      title="Send message"
                    >
                      <Send size={15} />
                    </button>
                  </form>
                </div>
              )}
            </div>

            <div className="uom-room-bottom">
              {/* Mic Toggle */}
              <button
                className={`uom-ctrl-btn ${!isMicOn ? "off" : ""}`}
                onClick={toggleMic}
                title={isMicOn ? "Mute" : "Unmute"}
              >
                {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>

              {/* Video Toggle */}
              <button
                className={`uom-ctrl-btn ${!isVideoOn ? "off" : ""}`}
                onClick={toggleVideo}
                title={isVideoOn ? "Turn off video" : "Turn on video"}
              >
                {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
              </button>

              {/* Icon 1: Screen Share (Laptop with up arrow & red dot indicator) */}
              <button
                className={`uom-ctrl-btn ${isScreenSharing ? "active screen-sharing" : ""}`}
                onClick={toggleScreenShare}
                title={isScreenSharing ? "Stop sharing screen (Presenting)" : "Present now (Screen Share)"}
                id="uom-screen-share-btn"
              >
                <div className="uom-share-btn-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                    <polyline points="9 9 12 6 15 9" />
                    <line x1="12" y1="6" x2="12" y2="13" />
                  </svg>
                  <span className={`uom-red-indicator ${isScreenSharing ? "sharing-active" : ""}`} />
                </div>
              </button>


              {/* Icon 5: In-Call Chat Box (Everyone can text one by one) */}
              <button
                className={`uom-ctrl-btn ${showChatDrawer ? "active" : ""}`}
                onClick={() => {
                  setShowChatDrawer(!showChatDrawer);
                  if (!showChatDrawer) toast.info("In-call chat box opened");
                }}
                title="In-call chat box (Chat with everyone)"
              >
                <MessageSquare size={20} />
              </button>

              {/* Leave call */}
              <button
                className="uom-ctrl-btn leave"
                onClick={handleLeaveChamber}
                title="Leave chamber"
              >
                <PhoneOff size={16} />
                <span>Leave</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FLOATING PICTURE-IN-PICTURE (PiP) WIDGET ================= */}
      {inChamber && isMinimized && (
        <div className="uom-pip-widget">
          <div className="uom-pip-top">
            <div style={{ display: "flex", alignItems: "center", gap: "6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              <span className="uom-status-dot" />
              <span style={{ fontSize: "11.5px", fontWeight: 600 }}>{chamberTitle}</span>
            </div>
            <div className="uom-pip-actions">
              <button
                className="uom-pip-ctrl-btn"
                style={{ width: "26px", height: "26px" }}
                onClick={() => setIsMinimized(false)}
                title="Maximize chamber"
              >
                <Maximize2 size={13} />
              </button>
            </div>
          </div>

          <div className="uom-pip-video-area">
            {isScreenSharing && screenStreamRef.current ? (
              <video
                ref={(el) => {
                  if (el && screenStreamRef.current && el.srcObject !== screenStreamRef.current) {
                    el.srcObject = screenStreamRef.current;
                  }
                }}
                autoPlay
                playsInline
                muted
                className="uom-video-stream screen-content"
              />
            ) : isVideoOn ? (
              <video
                ref={(el) => {
                  if (el && streamRef.current && el.srcObject !== streamRef.current) {
                    el.srcObject = streamRef.current;
                  }
                }}
                autoPlay
                playsInline
                muted
                className="uom-video-stream"
              />
            ) : (
              <div style={{ textAlign: "center", color: "#94a3b8", fontSize: "11px" }}>
                <Scale size={24} style={{ opacity: 0.5, margin: "0 auto 4px auto" }} />
                <p>Camera Off</p>
              </div>
            )}
          </div>

          <div className="uom-pip-bottom">
            <button
              className={`uom-pip-ctrl-btn ${!isMicOn ? "off" : ""}`}
              onClick={toggleMic}
              title={isMicOn ? "Mute" : "Unmute"}
            >
              {isMicOn ? <Mic size={14} /> : <MicOff size={14} />}
            </button>

            <button
              className={`uom-pip-ctrl-btn ${!isVideoOn ? "off" : ""}`}
              onClick={toggleVideo}
              title={isVideoOn ? "Turn off camera" : "Turn on camera"}
            >
              {isVideoOn ? <Video size={14} /> : <VideoOff size={14} />}
            </button>

            <button
              className="uom-pip-ctrl-btn"
              onClick={() => setIsMinimized(false)}
              title="Maximize chamber"
            >
              <Maximize2 size={14} />
            </button>

            <button
              className="uom-pip-ctrl-btn leave"
              onClick={handleLeaveChamber}
              title="Leave chamber"
            >
              <PhoneOff size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
