// src/admin/component/Modal/EditCaseForm.jsx
import { useState, useEffect, useRef } from "react";
import { Paperclip, FileText, CheckCircle2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axiosConfig";

export default function EditCaseForm({ caseData, onClose, onSuccess }) {
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    requestType: "Case",
    DisputeName: "",
    DisputeSummary: "",
    oppositePartyName: "",
    mobileNumber: "",
    file: null,
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change (admin upload new file)
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  // Load case data when modal opens
  useEffect(() => {
    if (caseData) {
      setFormData({
        requestType: caseData.requestType || "Case",
        DisputeName: caseData.DisputeName || "",
        oppositePartyName: caseData.oppositePartyName || "",
        DisputeSummary: caseData.DisputeSummary || caseData.description || "",
        mobileNumber: caseData.mobileNumber || caseData.oppositeMobile || "",
        file: null,
      });
    }
  }, [caseData]);

  // Submit edited data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const {
        requestType,
        DisputeName,
        oppositePartyName,
        mobileNumber,
        DisputeSummary,
        file,
      } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("requestType", requestType);
      formDataToSend.append("title", DisputeName);
      formDataToSend.append("DisputeName", DisputeName);
      formDataToSend.append("oppositePartyName", oppositePartyName);
      formDataToSend.append("mobileNumber", mobileNumber);
      formDataToSend.append("oppositeMobile", mobileNumber);
      formDataToSend.append("description", DisputeSummary);
      formDataToSend.append("DisputeSummary", DisputeSummary);
      if (file instanceof File) {
        formDataToSend.append("file", file);
      }

      await axiosInstance.put(
        `/admin/update-case/${caseData._id}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Case updated successfully!");
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error("Error editing case:", error);
      toast.error(error.response?.data?.message || "Failed to update case");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="responsive-container" style={{ maxHeight: "88vh", overflowY: "auto", padding: "10px" }}>
      <div className="responsive-container-inside" style={{ backgroundColor: "#fff", borderRadius: "10px", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b", marginBottom: "1rem" }}>
          Edit Case Details
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Dispute Type */}
          <div className="form-group">
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
              Request Type
            </label>
            <input
              type="text"
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              className="form-input"
              style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
            />
          </div>

          {/* Dispute Name */}
          <div className="form-group">
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
              Dispute Name
            </label>
            <input
              type="text"
              name="DisputeName"
              placeholder="Enter Dispute Name"
              value={formData.DisputeName}
              onChange={handleChange}
              className="form-input"
              required
              style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
            />
          </div>

          {/* Opposite Party Name */}
          <div className="form-group">
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
              Opposite Party Name
            </label>
            <input
              type="text"
              name="oppositePartyName"
              placeholder="Enter Opposite Party Name"
              value={formData.oppositePartyName}
              onChange={handleChange}
              className="form-input"
              style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
            />
          </div>

          {/* Opposite Party Mobile */}
          <div className="form-group">
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
              Opposite Party Mobile Number
            </label>
            <input
              type="text"
              name="mobileNumber"
              placeholder="Enter Opposite Party Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="form-input"
              style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
            />
          </div>

          {/* Dispute Summary */}
          <div className="form-group">
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
              Dispute Summary
            </label>
            <textarea
              name="DisputeSummary"
              placeholder="Enter Dispute Summary"
              value={formData.DisputeSummary}
              onChange={handleChange}
              rows="3"
              style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>

          {/* File Upload */}
          <div style={{ backgroundColor: "#f8fafc", padding: "1rem", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>
              Case File (Upload new file to replace)
            </label>

            <input
              ref={fileInputRef}
              id="admin-edit-case-file-upload-input"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            {!formData.file ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ fontSize: "13px", color: "#64748b" }}>
                  {caseData?.file ? "Current file attached on server" : "No new file selected"}
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: "7px 14px",
                    backgroundColor: "#0284c7",
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
                  <Paperclip size={15} />
                  Choose File
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ fontSize: "13px", color: "#16a34a", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={16} /> New file: {formData.file.name}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, file: null }))}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#fee2e2",
                    color: "#b91c1c",
                    border: "1px solid #fecaca",
                    borderRadius: "6px",
                    fontSize: "12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
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
                backgroundColor: isSubmitting ? "#93c5fd" : "#0066cc",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "600",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Updating..." : "Update Case"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
