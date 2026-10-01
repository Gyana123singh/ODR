import axiosInstance from "./axiosConfig";

export const caseApi = {
  // 🟢 Get all cases
  getAllCases: async () => {
    try {
      const response = await axiosInstance.get("/admin/cases");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to fetch cases",
        }
      );
    }
  },

  // delete cases
  deleteClaimantCase: async (id) => {
    try {
      const response = await axiosInstance.delete(`/admin/delete-case/${id}`);
      return response.data;
      console.log("Case deleted successfully");
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to delete case",
        }
      );
    }
  },

  downloadClaimantCaseFile: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/admin/download-case-file/${id}`,
        {
          responseType: "blob", // Important for file downloads
        }
      );
      // Create a URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      // Extract filename from content-disposition header
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "downloaded_file";
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
      }
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to download file",
        }
      );
    }
  },
};
export const allUserApi = {
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get("/admin/get-all-users");
      return "all users data", response;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to fetch cases",
        }
      );
    }
  },

  // delete all users
  deleteAllUsers: async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/delete-all-users/${id}`
      );
      return response.data;
      console.log("Case deleted successfully");
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to delete case",
        }
      );
    }
  },
};

export const documentDetailsApi = {
  getAllDocumentsDetails: async () => {
    try {
      const response = await axiosInstance.get("/admin/document-details");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to fetch cases",
        }
      );
    }
  },

  updateVerifyStatus: async (id, status) => {
    try {
      const response = await axiosInstance.post(
        `admin/update-verify-status/${id}`,
        {
          status,
        }
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to update",
        }
      );
    }
  },

  updateActiveStatus: async (id, status) => {
    try {
      const response = await axiosInstance.post(
        `admin/update-active-status/${id}`,
        {
          status,
        }
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to update",
        }
      );
    }
  },

  downloadSubmittedDocument: async (id, docName) => {
    try {
      const response = await axiosInstance.get(
        `/admin/download-submitted-document/${id}`,
        {
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      let fileName = docName || "submitted-document";
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?([^";]+)"?/);
        if (fileNameMatch && fileNameMatch[1]) {
          try {
            fileName = decodeURIComponent(fileNameMatch[1]);
          } catch (e) {
            fileName = fileNameMatch[1];
          }
        }
      }
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(url);
      }, 100);
      return true;
    } catch (error) {
      throw error;
    }
  },

  newScheduleHearing: async (formData) => {
    try {
      const response = await axiosInstance.post(
        `admin/new-hearing/${caseId}`,
        formData
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to upload new hearing",
        }
      );
    }
  },
  GetnewScheduleHearing: async () => {
    try {
      const response = await axiosInstance.get("admin/get-new-hearing");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to fetch new hearing",
        }
      );
    }
  },

  // delete hearing
  deleteHearing: async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/delete-hearing/${id}`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to delete case",
        }
      );
    }
  },
  hearingActiveStatus: async (id, status) => {
    try {
      const response = await axiosInstance.post(
        `admin/hearing-active-status/${id}`,
        {
          status,
        }
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to update",
        }
      );
    }
  },
  // delete hearing
  deleteSubmitDocument: async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/delete-document/${id}`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to delete case",
        }
      );
    }
  },
};
