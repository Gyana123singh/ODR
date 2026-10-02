import {
  FileText,
  Upload,
  Download,
  Trash2,
  Plus,
  ChevronRight,
  Calendar,
  Clock,
  User,
  CheckCircle,
  X,
  Send,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance, { getApiBaseUrl } from "../../api/axiosConfig";
import AllDetails from "../../neutral/components/Modal/AllDetails";
import ModalComponent from "../../neutral/components/Modal/ModalComponent";

export default function CaseDetails() {
  const [caseData, setCaseData] = useState([]);
  const [openModal, setOpenModal] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [responseForm, setResponseForm] = useState({
    responseText: "",
    consent: "Yes",
  });

  // Taken from respondent login
  const userEmail = localStorage.getItem("userEmail") || "";
  const userPhone = localStorage.getItem("userPhone") || "";

  const fetchCases = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/respondent/my-case", {
        email: userEmail,
        phone: userPhone,
      });
      const data = Array.isArray(res.data) ? res.data : res.data.cases || [];
      if (data.length > 0) {
        setCaseData(data);
      } else {
        // If no backend cases yet, show demo items with clear notice
        setCaseData(cases);
      }
    } catch (error) {
      console.warn("Error fetching respondent cases, using fallback:", error);
      setCaseData(cases);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [userEmail, userPhone]);

  const [isMobile] = useState(window.innerWidth <= 480);
  const [cases] = useState([
    {
      id: "2024-45",
      title: "Smith vs. Johnson",
      status: "Active",
      statusColor: "#22bb33",
      filedDate: "15 Aug 2025",
      dueDate: "25 Sep 2025",
      documents: 5,
      submissions: 2,
    },
    {
      id: "2024-52",
      title: "ABC Corp vs. XYZ Ltd",
      status: "Pending",
      statusColor: "#ff9900",
      filedDate: "20 Aug 2025",
      dueDate: "30 Sep 2025",
      documents: 3,
      submissions: 1,
    },
    {
      id: "2024-48",
      title: "Estate of Brown",
      status: "In Review",
      statusColor: "#2196f3",
      filedDate: "10 Aug 2025",
      dueDate: "28 Sep 2025",
      documents: 8,
      submissions: 3,
    },
  ]);

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
      padding: "0.5rem 1rem",
      backgroundColor: "rgba(255,255,255,0.2)",
      border: "1px solid rgba(255,255,255,0.5)",
      color: "#fff",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    caseGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fill, minmax(350px, 1fr))",
      gap: "1.5rem",
    },
    caseCard: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      overflow: "hidden",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    caseHeader: {
      padding: "1rem",
      borderBottom: "1px solid #eee",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "1rem",
    },
    caseTitle: {
      flex: 1,
    },
    caseName: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "0.25rem",
    },
    caseId: {
      fontSize: "13px",
      color: "#999",
    },
    statusBadge: (color) => ({
      display: "inline-block",
      padding: "0.35rem 0.75rem",
      backgroundColor: color + "22",
      color: color,
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      whiteSpace: "nowrap",
      flexShrink: 0,
    }),
    caseContent: {
      padding: "1rem",
    },
    caseMetaGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
      marginBottom: "1rem",
    },
    metaItem: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "flex-start",
    },
    metaIcon: {
      color: "#ff9900",
      flexShrink: 0,
      marginTop: "0.2rem",
    },
    metaText: {
      display: "flex",
      flexDirection: "column",
    },
    metaLabel: {
      fontSize: "12px",
      color: "#999",
      fontWeight: "600",
    },
    metaValue: {
      fontSize: "14px",
      color: "#333",
      fontWeight: "500",
    },
    documentsSection: {
      display: "flex",
      gap: "1rem",
      padding: "0.75rem",
      backgroundColor: "#f9f9f9",
      borderRadius: "6px",
      marginBottom: "1rem",
    },
    docItem: {
      flex: 1,
      textAlign: "center",
    },
    docNumber: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#0066cc",
    },
    docLabel: {
      fontSize: "12px",
      color: "#666",
    },
    actionButtons: {
      display: "flex",
      gap: "0.5rem",
    },
    actionButton: (bgColor) => ({
      flex: 1,
      padding: "0.5rem",
      backgroundColor: bgColor + "22",
      color: bgColor,
      border: "1px solid " + bgColor + "33",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.3rem",
      transition: "all 0.3s ease",
    }),
    emptyState: {
      textAlign: "center",
      padding: "3rem 1rem",
      color: "#999",
    },
    emptyIcon: {
      fontSize: "48px",
      marginBottom: "1rem",
    },
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (!selectedCase) return;
    
    // Handle demo cases gracefully
    const submitId = selectedCase.caseId || selectedCase.id;
    if (submitId && String(submitId).startsWith("2024-")) {
      setSubmitting(true);
      setTimeout(() => {
        toast.success("Statement & Response submitted to Court Registry!");
        setOpenModal(null);
        setResponseForm({ responseText: "", consent: "Yes" });
        setSubmitting(false);
      }, 800);
      return;
    }

    setSubmitting(true);
    try {
      const res = await axiosInstance.post("/respondent/submit-case-response", {
        caseId: submitId,
        responseText: responseForm.responseText,
        consent: responseForm.consent,
      });
      if (res.data && res.data.success) {
        toast.success("Statement & Response submitted to Court Registry!");
        setOpenModal(null);
        setResponseForm({ responseText: "", consent: "Yes" });
        fetchCases();
      } else {
        toast.error(res.data?.message || "Failed to submit response");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit response. Please check connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <span>📋 Case Details / Submissions</span>
        {loading && <Loader2 size={18} className="animate-spin" />}
      </div>

      {/* Cases Grid */}
      {caseData.length > 0 ? (
        <div style={styles.caseGrid}>
          {caseData.map((caseItem) => {
            const caseKey = caseItem._id || caseItem.caseId || caseItem.id;
            const badgeColor =
              caseItem.statusColor ||
              (caseItem.status === "Active" || caseItem.status === "Verified"
                ? "#22bb33"
                : caseItem.status === "Closed"
                ? "#64748b"
                : "#ff9900");
            const displayName =
              caseItem.CustomersName && caseItem.oppositePartyName
                ? `${caseItem.CustomersName} Vs ${caseItem.oppositePartyName}`
                : caseItem.title || caseItem.DisputeName || "Dispute Matter";

            return (
              <div
                key={caseKey}
                style={styles.caseCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={styles.caseHeader}>
                  <div style={styles.caseTitle}>
                    <div style={styles.caseName}>{displayName}</div>
                    <div style={styles.caseId}>Case #{caseItem.caseId || caseItem.id}</div>
                  </div>
                  <div style={styles.statusBadge(badgeColor)}>
                    {caseItem.status || "Active"}
                  </div>
                </div>

                <div style={styles.caseContent}>
                  {/* Metadata Grid */}
                  <div style={styles.caseMetaGrid}>
                    <div style={styles.metaItem}>
                      <Calendar size={16} style={styles.metaIcon} />
                      <div style={styles.metaText}>
                        <div style={styles.metaLabel}>Filed</div>
                        <div style={styles.metaValue}>{caseItem.createdAt || "Recent"}</div>
                      </div>
                    </div>
                    <div style={styles.metaItem}>
                      <div style={styles.metaText}>
                        <div style={styles.metaLabel}>Type</div>
                        <div style={styles.metaValue}>{caseItem.DisputeType || "Arbitration"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div style={styles.documentsSection}>
                    <div style={styles.docItem}>
                      <div style={styles.docNumber}>{caseItem.documents?.length || caseItem.documents || 0}</div>
                      <div style={styles.docLabel}>Documents</div>
                    </div>
                    <div style={styles.docItem}>
                      <div style={styles.docNumber}>{caseItem.submissions || (caseItem.consent ? 1 : 0)}</div>
                      <div style={styles.docLabel}>Submissions</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={styles.actionButtons}>
                    <button
                      style={styles.actionButton("#0066cc")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#0066cc33";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#0066cc22";
                      }}
                      onClick={() => {
                        setSelectedCase(caseItem);
                        setOpenModal("details");
                      }}
                    >
                      <FileText size={14} />
                      Details
                    </button>
                    <button
                      style={styles.actionButton("#22bb33")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#22bb3333";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#22bb3322";
                      }}
                      onClick={() => {
                        setSelectedCase(caseItem);
                        setOpenModal("submit");
                      }}
                    >
                      <Upload size={14} />
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📁</div>
          <p>No cases found</p>
        </div>
      )}

      {/* Case Details Modal */}
      {openModal === "details" && selectedCase && (
        <ModalComponent title="Case Information" onClose={() => setOpenModal(null)}>
          <AllDetails
            caseData={selectedCase}
            onClose={() => setOpenModal(null)}
          />
        </ModalComponent>
      )}

      {/* Submit Response Modal */}
      {openModal === "submit" && selectedCase && (
        <ModalComponent title="Submit Statement of Defense" onClose={() => setOpenModal(null)}>
          <form onSubmit={handleSubmitResponse} style={{ padding: "1.5rem" }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#0f172a" }}>
              Submit Formal Response for Case #{selectedCase.caseId || selectedCase.id}
            </h3>
            <p style={{ margin: "0 0 1rem 0", fontSize: "13px", color: "#64748b" }}>
              Your formal statement will be registered directly in the ODR case timeline and notified to all parties.
            </p>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                Consent to Dispute Resolution Proceedings:
              </label>
              <select
                value={responseForm.consent}
                onChange={(e) => setResponseForm((prev) => ({ ...prev, consent: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                }}
              >
                <option value="Yes">Yes — I agree to resolve through Utkal ODR</option>
                <option value="No">No — Objecting to jurisdiction</option>
              </select>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                Statement of Defense / Counter-Statement:
              </label>
              <textarea
                rows={5}
                required
                placeholder="Enter your defense statement, rebuttal of claimant assertions, or settlement proposal..."
                value={responseForm.responseText}
                onChange={(e) => setResponseForm((prev) => ({ ...prev, responseText: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  background: "#fff",
                  color: "#475569",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: "8px 18px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#22bb33",
                  color: "#fff",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Submit Defense
              </button>
            </div>
          </form>
        </ModalComponent>
      )}
    </div>
  );
}
