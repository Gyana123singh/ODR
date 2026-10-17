import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NeutralApi } from "../../../api/NeutralApi";
import { ClaimantApi } from "../../../api/ClaimantApi";

const AsignCase = ({ selectedCaseId, onClose, reload }) => {
  const [neutralData, setNeutralData] = useState([]);

  const [selectedNeutralId, setSelectedNeutralId] = useState("");

  // ⭐ Fetch All Neutrals
  useEffect(() => {
    const getAllNeutral = async () => {
      const res = await NeutralApi.getAllNeutral();
      setNeutralData(res.data);
      console.log("fetch neutral", res.data);
    };
    getAllNeutral();
  }, []);

  // ⭐ Assign Hearing
  const handleAssignHearing = async () => {
    if (!selectedNeutralId) return toast.warning("Select Mediator");

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3636";
      const res = await axios.put(
        `${API_BASE_URL}/admin/schedule-hearing`,
        {
          caseId: selectedCaseId,
          neutralId: selectedNeutralId,
        }
      );

      toast.success("Session Scheduled with Mediator!");

      onClose();
    } catch (error) {
      toast.error("Error scheduling session");
    }
  };

  const validNeutrals = (neutralData || []).filter((item) => {
    if (!item) return false;
    const name = (item.name || "").trim().toLowerCase();
    const email = (item.email || "").trim().toLowerCase();
    const demoKeywords = ["neutral", "neutrals", "neutral user", "user", "firebase user", "test", "demo", "admin"];
    if (demoKeywords.includes(name) || name.startsWith("neutral") || name.startsWith("test ") || name.startsWith("demo ")) return false;
    if (/^\+?\d{7,15}$/.test(name.replace(/[\s-]/g, ""))) return false;
    if (!email || email.includes("neutral@") || email.includes("neutrals@") || email.includes("test@") || email.includes("example.com")) return false;
    return true;
  });

  return (
    <div style={{ background: "white", padding: "25px", borderRadius: "12px" }}>
      <h3 style={{ textAlign: "center" }}>Schedule Session</h3>

      {/* Mediator Select */}
      <label>Select Mediator</label>
      <select
        className="form-select"
        onChange={(e) => setSelectedNeutralId(e.target.value)}
      >
        <option value="">{validNeutrals.length > 0 ? "Select Mediator" : "No verified mediators available"}</option>
        {validNeutrals.map((n) => (
          <option key={n._id} value={n._id}>
            {n.name} ({n.email})
          </option>
        ))}
      </select>

      <button
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "10px",
          background: "green",
          color: "white",
          borderRadius: "8px",
        }}
        onClick={handleAssignHearing}
      >
        Schedule Session
      </button>

      <button
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          background: "gray",
          color: "white",
          borderRadius: "8px",
        }}
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
};

export default AsignCase;
