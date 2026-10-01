// src/respondent/components/Modal/uploadDocument.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Paperclip, Loader2 } from "lucide-react";
import axiosInstance, { getApiBaseUrl } from "../../../api/axiosConfig";

export default function UploadDocument({ onClose, respondentId, onUploaded }) {
  const [formData, setFormData] = useState({
    file: null,
    caseId: "",
  });
  const [uploading, setUploading] = useState(false);

  const email = localStorage.getItem("userEmail") || "";
  const DEMO_CASES = [
    { _id: "demo-resp-1", caseId: "2024-45" },
    { _id: "demo-resp-2", caseId: "2024-52" },
    { _id: "demo-resp-3", caseId: "2024-48" },
  ];

  const [respondentOwnCase, setRespondentOwnCase] = useState(DEMO_CASES);

  // Fetch respondent's actual cases
  useEffect(() => {
    const fetchRespondentCases = async () => {
      try {
        const res = await axiosInstance.post("/respondent/my-case", { email });
        const cases = Array.isArray(res.data) ? res.data : res.data.cases || [];
        if (cases.length > 0) {
          setRespondentOwnCase(cases);
          if (!formData.caseId) {
            setFormData((prev) => ({ ...prev, caseId: cases[0].caseId || cases[0].id }));
          }
        }
      } catch (error) {
        console.warn("Fetch respondent cases note (using demo items):", error);
      }
    };

    fetchRespondentCases();
  }, [email]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        file: selected,
      }));
    }
  };

  const handleCaseSelect = (e) => {
    setFormData((prev) => ({
      ...prev,
      caseId: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { file, caseId } = formData;
    if (!caseId) {
      toast.error("Please select a Case ID");
      return;
    }
    if (!file) {
      toast.error("Please choose a file to upload");
      return;
    }

    setUploading(true);

    try {
      const activeRespId =
        respondentId ||
        localStorage.getItem("userId") ||
        "self";

      const formDataToSend = new FormData();
      formDataToSend.append("caseId", caseId);
      formDataToSend.append("email", email);
      formDataToSend.append("respondentEmail", email);
      formDataToSend.append("documents", file);
      formDataToSend.append("file", file);

      const API_BASE_URL = getApiBaseUrl();
      const response = await axiosInstance.post(
        `/respondent/document-upload-by-respondent/${activeRespId}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data && (response.data.success || response.data.document)) {
        toast.success("Document uploaded successfully!");
        if (onUploaded) onUploaded();
        onClose();
      } else {
        toast.error(response.data?.message || "Upload completed with notes");
        if (onUploaded) onUploaded();
        onClose();
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error(error.response?.data?.message || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxHeight: "90vh", overflowY: "auto" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "1.25rem", color: "#0f172a" }}>
        Upload Document & Evidence
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Case ID Select Dropdown */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#334155" }}>
            Select Dispute Case ID
          </label>
          <select
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "14px",
              background: "#fff",
            }}
            value={formData.caseId}
            onChange={handleCaseSelect}
            required
          >
            <option value="">-- Select Case --</option>
            {respondentOwnCase.map((c) => {
              const cid = c.caseId || c.id;
              const title = c.CustomersName && c.oppositePartyName
                ? `${c.CustomersName} vs ${c.oppositePartyName}`
                : c.title || cid;
              return (
                <option key={c._id || cid} value={cid}>
                  Case #{cid} {title ? `(${title})` : ""}
                </option>
              );
            })}
          </select>
        </div>

        {/* File Upload Box */}
        <div
          style={{
            border: "2px dashed #cbd5e1",
            borderRadius: "12px",
            padding: "24px 16px",
            textAlign: "center",
            background: "#f8fafc",
            marginBottom: "1.5rem",
          }}
        >
          <Paperclip size={32} color="#ff9900" style={{ margin: "0 auto 10px auto" }} />
          <p style={{ fontSize: "14px", color: "#475569", margin: "0 0 12px 0" }}>
            {formData.file ? (
              <strong style={{ color: "#0f172a" }}>{formData.file.name}</strong>
            ) : (
              "Upload statement, affidavit, PDF or image evidence (Max 25MB)"
            )}
          </p>

          <label
            htmlFor="resp-file-input"
            style={{
              display: "inline-block",
              padding: "8px 20px",
              backgroundColor: "#ff9900",
              color: "#fff",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {formData.file ? "Change File" : "Browse Device"}
          </label>
          <input
            id="resp-file-input"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Submit & Cancel Actions */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "9px 20px",
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
            disabled={uploading}
            style={{
              padding: "9px 24px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#ff9900",
              color: "#fff",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {uploading && <Loader2 size={16} className="animate-spin" />}
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </form>
    </div>
  );
}
