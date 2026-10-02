import React, { useState } from "react";
import axiosInstance from "../../../api/axiosConfig";
import { Edit2, Check, X, Loader2 } from "lucide-react";

export default function ViewCaseDetails({ assignedCases, onclose }) {
  if (!assignedCases) {
    return <div>No case data available</div>;
  }

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingAadhar, setIsEditingAadhar] = useState(false);
  const [isViewingDoc, setIsViewingDoc] = useState(false);
  
  const [isEditingDisputeType, setIsEditingDisputeType] = useState(false);
  const [isEditingDisputeName, setIsEditingDisputeName] = useState(false);
  const [isEditingDisputeAmount, setIsEditingDisputeAmount] = useState(false);
  const [isEditingCustomersName, setIsEditingCustomersName] = useState(false);
  const [isEditingCustomersEmail, setIsEditingCustomersEmail] = useState(false);
  const [isEditingOppositePartyName, setIsEditingOppositePartyName] = useState(false);
  const [isEditingOppositePartyEmail, setIsEditingOppositePartyEmail] = useState(false);

  const [phone, setPhone] = useState(assignedCases.CustomersMobileNumber || "");
  const [aadhar, setAadhar] = useState(assignedCases.CustomersAadharNumber || "");
  
  const [disputeType, setDisputeType] = useState(assignedCases.DisputeType || "");
  const [disputeName, setDisputeName] = useState(assignedCases.DisputeName || "");
  const [disputeAmount, setDisputeAmount] = useState(assignedCases.DisputeAmount || "");
  
  const [customersName, setCustomersName] = useState(assignedCases.CustomersName || "");
  const [customersEmail, setCustomersEmail] = useState(assignedCases.CustomersEmail || "");
  
  const [oppositePartyName, setOppositePartyName] = useState(assignedCases.oppositePartyName || "");
  const [oppositePartyEmail, setOppositePartyEmail] = useState(assignedCases.oppositePartyEmail || "");

  const [loading, setLoading] = useState(false);

  const handleUpdate = async (field, value, setEditState) => {
    setLoading(true);
    try {
      const payload = {};
      payload[field] = value;
      
      const res = await axiosInstance.put(`/neutral/update-case-details/${assignedCases._id || assignedCases.id}`, payload);
      if (res.data?.success) {
        assignedCases[field] = value; // Optimistic update
        setEditState(false);
      } else {
        alert(res.data?.message || "Failed to update case details");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating case details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      width: "100%",
      maxWidth: "700px",
      margin: "20px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "12px",
      maxHeight: "80vh",
      overflowY: "auto",
      scrollbarWidth: "thin",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
    },
    section: {
      marginBottom: "20px",
      padding: "15px",
      borderRadius: "10px",
      background: "#f8f9fa",
    },
    sectionTitle: {
      marginBottom: "15px",
      fontSize: "18px",
      color: "#333",
    },
    itemRow: {
      display: "flex",
      marginBottom: "10px",
      alignItems: "center",
      minHeight: "32px",
    },
    link: {
      color: "#007bff",
      textDecoration: "underline",
    },
    input: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "1px solid #cbd5e1",
      fontSize: "14px",
      marginRight: "8px",
      outline: "none",
      width: "200px"
    },
    iconBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#64748b",
      borderRadius: "4px",
    }
  };

  const Item = ({ label, value }) => (
    <div style={styles.itemRow}>
      <strong style={{ width: "220px", flexShrink: 0 }}>{label}:</strong>
      <span>{value ? value : "—"}</span>
    </div>
  );

  const EditableItem = ({ label, value, isEditing, setEditing, tempValue, setTempValue, onSave }) => (
    <div style={styles.itemRow}>
      <strong style={{ width: "220px", flexShrink: 0 }}>{label}:</strong>
      {isEditing ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input 
            style={styles.input}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            disabled={loading}
            autoFocus
          />
          {loading ? (
             <Loader2 size={16} style={{ color: "#3b82f6", marginRight: "8px", animation: "spin 1s linear infinite" }} />
          ) : (
            <button 
              style={{...styles.iconBtn, color: "#10b981", marginRight: "4px"}}
              onClick={onSave}
              title="Save"
            >
              <Check size={18} />
            </button>
          )}
          <button 
            style={{...styles.iconBtn, color: "#ef4444"}}
            onClick={() => {
              setTempValue(value || "");
              setEditing(false);
            }}
            disabled={loading}
            title="Cancel"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{value ? value : "—"}</span>
          <button 
            style={{...styles.iconBtn, marginLeft: "10px"}}
            onClick={() => {
              setTempValue(value || "");
              setEditing(true);
            }}
            title="Edit"
          >
            <Edit2 size={14} />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Case Details</h2>

      {/* Basic Info */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Basic Information</h3>
        <Item label="Case ID" value={assignedCases.caseId} />
        
        <EditableItem 
          label="Dispute Type" 
          value={assignedCases.DisputeType}
          isEditing={isEditingDisputeType}
          setEditing={setIsEditingDisputeType}
          tempValue={disputeType}
          setTempValue={setDisputeType}
          onSave={() => handleUpdate("DisputeType", disputeType, setIsEditingDisputeType)}
        />
        
        <EditableItem 
          label="Dispute Name" 
          value={assignedCases.DisputeName}
          isEditing={isEditingDisputeName}
          setEditing={setIsEditingDisputeName}
          tempValue={disputeName}
          setTempValue={setDisputeName}
          onSave={() => handleUpdate("DisputeName", disputeName, setIsEditingDisputeName)}
        />
        
        <EditableItem 
          label="Dispute Amount" 
          value={assignedCases.DisputeAmount}
          isEditing={isEditingDisputeAmount}
          setEditing={setIsEditingDisputeAmount}
          tempValue={disputeAmount}
          setTempValue={setDisputeAmount}
          onSave={() => handleUpdate("DisputeAmount", disputeAmount, setIsEditingDisputeAmount)}
        />
        
        <Item label="Created At" value={assignedCases.createdAt} />
        <Item label="Status" value={assignedCases.status} />
      </div>

      {/* Customer Info */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Customer Information</h3>
        
        <EditableItem 
          label="Name" 
          value={assignedCases.CustomersName}
          isEditing={isEditingCustomersName}
          setEditing={setIsEditingCustomersName}
          tempValue={customersName}
          setTempValue={setCustomersName}
          onSave={() => handleUpdate("CustomersName", customersName, setIsEditingCustomersName)}
        />
        
        <EditableItem 
          label="Email" 
          value={assignedCases.CustomersEmail}
          isEditing={isEditingCustomersEmail}
          setEditing={setIsEditingCustomersEmail}
          tempValue={customersEmail}
          setTempValue={setCustomersEmail}
          onSave={() => handleUpdate("CustomersEmail", customersEmail, setIsEditingCustomersEmail)}
        />
        
        <EditableItem 
          label="Mobile Number" 
          value={assignedCases.CustomersMobileNumber}
          isEditing={isEditingPhone}
          setEditing={setIsEditingPhone}
          tempValue={phone}
          setTempValue={setPhone}
          onSave={() => handleUpdate("CustomersMobileNumber", phone, setIsEditingPhone)}
        />
        
        <EditableItem 
          label="Aadhar Number" 
          value={assignedCases.CustomersAadharNumber}
          isEditing={isEditingAadhar}
          setEditing={setIsEditingAadhar}
          tempValue={aadhar}
          setTempValue={setAadhar}
          onSave={() => handleUpdate("CustomersAadharNumber", aadhar, setIsEditingAadhar)}
        />
      </div>

      {/* Opposite Party */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Opposite Party</h3>
        
        <EditableItem 
          label="Name" 
          value={assignedCases.oppositePartyName}
          isEditing={isEditingOppositePartyName}
          setEditing={setIsEditingOppositePartyName}
          tempValue={oppositePartyName}
          setTempValue={setOppositePartyName}
          onSave={() => handleUpdate("oppositePartyName", oppositePartyName, setIsEditingOppositePartyName)}
        />
        
        <EditableItem 
          label="Email" 
          value={assignedCases.oppositePartyEmail}
          isEditing={isEditingOppositePartyEmail}
          setEditing={setIsEditingOppositePartyEmail}
          tempValue={oppositePartyEmail}
          setTempValue={setOppositePartyEmail}
          onSave={() => handleUpdate("oppositePartyEmail", oppositePartyEmail, setIsEditingOppositePartyEmail)}
        />
      </div>

      {/* Mediator */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Assigned Mediator</h3>
        <Item label="Name" value={assignedCases.neutral?.name} />
        <Item label="Email" value={assignedCases.neutral?.email} />
      </div>

      {/* File */}
      {assignedCases.file && (
        <div style={styles.section}>
          <button
            onClick={() => setIsViewingDoc(true)}
            style={{
              ...styles.link,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            View Document
          </button>
        </div>
      )}

      {/* Document Preview Overlay */}
      {isViewingDoc && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px"
          }}
          onClick={() => setIsViewingDoc(false)}
        >
          <div 
            style={{
              width: "90%",
              maxWidth: "1000px",
              height: "90%",
              backgroundColor: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "15px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0 }}>Document Preview</h3>
              <button 
                onClick={() => setIsViewingDoc(false)}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}
              >
                <X size={24} color="#666" />
              </button>
            </div>
            
            <div style={{ flex: 1, backgroundColor: "#f8f9fa", position: "relative" }}>
              {(assignedCases.file.toLowerCase().endsWith('.png') || 
                assignedCases.file.toLowerCase().endsWith('.jpg') || 
                assignedCases.file.toLowerCase().endsWith('.jpeg') || 
                assignedCases.file.toLowerCase().endsWith('.gif')) ? (
                <img 
                  src={assignedCases.file} 
                  alt="Document" 
                  style={{ width: "100%", height: "100%", objectFit: "contain" }} 
                />
              ) : (
                <iframe
                  src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(assignedCases.file)}`}
                  title="Document Preview"
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              )}
            </div>
            
            <div style={{ padding: "10px 15px", borderTop: "1px solid #eee", textAlign: "right" }}>
              <a 
                href={assignedCases.file} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontWeight: "500",
                  fontSize: "14px"
                }}
              >
                Download Original
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
