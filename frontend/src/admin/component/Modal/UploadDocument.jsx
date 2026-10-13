import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Paperclip, UploadCloud, CheckCircle2, Trash2, FileText } from "lucide-react";
import { caseApi } from "../../../api/AdminApi";
import axiosInstance from "../../../api/axiosConfig";

export default function UploadDocument({ onClose, onSuccess }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState("");
  const [documentType, setDocumentType] = useState("Evidence");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingCases, setLoadingCases] = useState(true);

  // Fetch all cases safely
  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoadingCases(true);
        const res = await caseApi.getAllCases();
        const list = Array.isArray(res?.data) ? res.data : [];
        setCases(list);
        if (list.length > 0) {
          setSelectedCaseId(list[0].caseId || list[0]._id || "");
        }
      } catch (error) {
        console.error("Error fetching cases for document upload:", error);
        toast.error("Failed to load cases list");
      } finally {
        setLoadingCases(false);
      }
    };

    fetchCases();
  }, []);

  const handleSelectedFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size > 20 * 1024 * 1024) {
      toast.error("File is too large. Maximum size allowed is 20MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    const chosenFile = e.target.files?.[0];
    if (chosenFile) {
      handleSelectedFile(chosenFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleSelectedFile(droppedFile);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCaseId) {
      toast.error("Please select a target case");
      return;
    }

    if (!file) {
      toast.error("Please attach a document file");
      return;
    }

    // Find the selected case record to pass accurate metadata
    const selectedCaseObj = cases.find(
      (c) => c.caseId === selectedCaseId || c._id === selectedCaseId
    );

    const claimantName =
      selectedCaseObj?.claimant?.name ||
      selectedCaseObj?.CustomersName ||
      selectedCaseObj?.DisputeName ||
      "Claimant";

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caseId", selectedCaseId);
      formData.append("claimantName", claimantName);
      formData.append("documentType", documentType);

      const response = await axiosInstance.post("/admin/document-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.success || response.status === 201 || response.status === 200) {
        toast.success("Document uploaded successfully!");
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      } else {
        toast.error(response.data?.message || "Failed to upload document");
      }
    } catch (error) {
      console.error("Document upload error:", error);
      toast.error(error.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "1.5rem", maxHeight: "88vh", overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "8px",
            backgroundColor: "#dcfce7",
            color: "#16a34a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UploadCloud size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
            Upload Case Document
          </h2>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
            Upload legal evidence, orders, or agreements to a dispute case dossier
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Case Dropdown */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
            Select Target Case *
          </label>
          <select
            name="caseId"
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            required
            disabled={loadingCases}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#fff",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          >
            <option value="">-- Choose Dispute Case --</option>
            {cases.map((c) => {
              const claimantName =
                c.claimant?.name || c.CustomersName || "Unnamed Claimant";
              const disputeTitle = c.DisputeName ? ` (${c.DisputeName})` : "";
              const caseLabel = `${c.caseId || "CASE"} — ${claimantName}${disputeTitle}`;
              const value = c.caseId || c._id;
              return (
                <option key={c._id || c.caseId} value={value}>
                  {caseLabel}
                </option>
              );
            })}
          </select>
          {loadingCases && (
            <span style={{ fontSize: "12px", color: "#64748b" }}>Loading cases...</span>
          )}
        </div>

        {/* Document Type Dropdown */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
            Document Classification
          </label>
          <select
            name="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#fff",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          >
            <option value="Evidence">Evidence & Supporting Proof</option>
            <option value="Legal Notice">Legal Notice / Demand</option>
            <option value="Agreement">Contract / Agreement</option>
            <option value="Award & Order">Arbitral Award / Order</option>
            <option value="Identity Proof">Identity Verification</option>
          </select>
        </div>

        {/* File Upload Zone */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>
              Attach Document File *
            </label>
            {file && (
              <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                <CheckCircle2 size={14} /> Ready to upload
              </span>
            )}
          </div>

          <input
            ref={fileInputRef}
            id="admin-submitted-doc-file-input"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${isDragging ? "#16a34a" : "#cbd5e1"}`,
                backgroundColor: isDragging ? "#f0fdf4" : "#f8fafc",
                borderRadius: "8px",
                padding: "1.5rem 1rem",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "#e2e8f0",
                  color: "#475569",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.5rem",
                }}
              >
                <Paperclip size={22} />
              </div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "2px" }}>
                Click to browse or drag & drop file here
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "0.75rem" }}>
                Supports PDF, DOC, DOCX, PNG, JPG up to 20MB
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                style={{
                  padding: "7px 16px",
                  backgroundColor: "#16a34a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Paperclip size={14} />
                Select File
              </button>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                padding: "0.875rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "6px",
                    backgroundColor: "#ecfdf5",
                    color: "#059669",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FileText size={20} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "13.5px",
                      fontWeight: "600",
                      color: "#1e293b",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={file.name}
                  >
                    {file.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    {formatFileSize(file.size)}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f1f5f9",
                    color: "#334155",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  style={{
                    padding: "5px 8px",
                    backgroundColor: "#fef2f2",
                    color: "#dc2626",
                    border: "1px solid #fecaca",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                  title="Remove file"
                >
                  <Trash2 size={13} />
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "0.5rem" }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            style={{
              padding: "9px 18px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#f8fafc",
              color: "#475569",
              fontSize: "14px",
              fontWeight: "600",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "9px 24px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: isSubmitting ? "#86efac" : "#16a34a",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Uploading Document..." : "Upload Document"}
          </button>
        </div>
      </form>
    </div>
  );
}
