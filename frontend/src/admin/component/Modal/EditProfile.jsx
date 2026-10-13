import { useState } from "react";
import { toast } from "react-toastify";
import { User } from "lucide-react";
import axiosInstance from "../../../api/axiosConfig";

export default function EditProfileForm({
  onClose,
  currentName,
  currentEmail,
  currentPhone,
  currentBio,
  currentPic,
  onSuccess,
}) {
  const initialEmail = currentEmail || localStorage.getItem("userEmail") || "";
  const initialName = currentName || localStorage.getItem("userName") || localStorage.getItem("username") || "";
  const initialPhone = currentPhone || localStorage.getItem("userPhone") || "";
  const initialBio = currentBio || localStorage.getItem("admin_bio") || "Platform Administrator at Utkal ODR";

  const [formData, setFormData] = useState({
    name: initialName,
    email: initialEmail,
    phone: initialPhone,
    bio: initialBio,
    profilePic: null,
  });

  const [previewPic, setPreviewPic] = useState(currentPic || null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePic: file,
      }));
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.warn("Name is required");
      return;
    }

    setLoading(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name.trim());
      dataToSend.append("email", formData.email.trim());
      dataToSend.append("phone", formData.phone.trim());
      dataToSend.append("bio", formData.bio || "");
      if (formData.profilePic instanceof File) {
        dataToSend.append("profilePic", formData.profilePic);
      }

      const response = await axiosInstance.put("/admin/update-profile", dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.success) {
        const updated = response.data.data;
        if (updated.name) {
          localStorage.setItem("username", updated.name);
          localStorage.setItem("userName", updated.name);
        }
        if (updated.email) {
          localStorage.setItem("userEmail", updated.email);
        }
        if (updated.phone) {
          localStorage.setItem("userPhone", updated.phone);
        }
        if (updated.bio) {
          localStorage.setItem("admin_bio", updated.bio);
        }

        window.dispatchEvent(new Event("adminProfileUpdated"));
        toast.success(response.data.message || "Profile updated successfully!");

        if (onSuccess) onSuccess(updated);
        if (onClose) onClose();
      } else {
        toast.error(response.data?.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Admin update profile error:", err);
      toast.error(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
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
                overflow: "hidden",
              }}
            >
              {previewPic ? (
                <img
                  src={previewPic}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : formData.name ? (
                formData.name.charAt(0).toUpperCase()
              ) : (
                <User size={36} />
              )}
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
              title="Change Profile Photo"
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
            disabled={loading}
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
            disabled={loading}
            style={{
              padding: "9px 22px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: loading ? "#93c5fd" : "#0066cc",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
