import { useState } from "react";
import { toast } from "react-toastify";
import { User, Mail, Phone, FileText } from "lucide-react";

export default function EditProfileForm({ onClose, currentName, currentEmail, currentPhone, onSuccess }) {
  const initialEmail = currentEmail || localStorage.getItem("userEmail") || "admin@example.com";
  const rawName = currentName || localStorage.getItem("username") || localStorage.getItem("userName");
  const initialName = (rawName && rawName !== "System Admin" && rawName !== "User") ? rawName : initialEmail;

  const [formData, setFormData] = useState({
    name: initialName,
    email: initialEmail,
    phone: currentPhone || localStorage.getItem("userPhone") || "",
    bio: localStorage.getItem("admin_bio") || "Platform Administrator at Utkal ODR",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePic: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.warn("Name is required");
      return;
    }

    localStorage.setItem("username", formData.name);
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userEmail", formData.email);
    if (formData.phone) localStorage.setItem("userPhone", formData.phone);
    if (formData.bio) localStorage.setItem("admin_bio", formData.bio);

    toast.success("Profile updated successfully!");
    if (onSuccess) onSuccess(formData);
    if (onClose) onClose();
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b", marginBottom: "1.25rem", textAlign: "center" }}>
        Edit Profile
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Profile Picture */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "0.5rem" }}>
          <div style={{ position: "relative", width: "80px", height: "80px" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#e0f2fe",
                color: "#0284c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #0284c7",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              {formData.name ? formData.name.charAt(0).toUpperCase() : <User size={36} />}
            </div>
            <label
              htmlFor="profilePic"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "#0284c7",
                color: "#fff",
                borderRadius: "50%",
                width: "26px",
                height: "26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              ✎
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
            Full Name / Display Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter full name"
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Email */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Phone */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Bio */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
            Designation / Bio
          </label>
          <textarea
            name="bio"
            rows="2"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Platform Administrator..."
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontSize: "13px",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Submit */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "0.5rem" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "9px 16px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#f8fafc",
              color: "#475569",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: "9px 22px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#0066cc",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
