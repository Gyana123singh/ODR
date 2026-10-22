const Express = require("express");
const router = Express.Router();
const {
  NeutralRegister,
  NeutralLogin,
  NeutralData,
  getAllNeutral,
  getNotification,
  getNotificationForNeutral,
  deleteNeutralNotification,
  deleteAllNeutralNotification,
  updateStatus,
  getCaseStatus,
  getNeutralDashboardStats,
  updateNeutralProfile,
  updateNeutralPassword,
  updateCaseDetails,
} = require("../Controller/NeutralController");
const { verifyToken, authorizeRoles } = require("../middlewares/Auth.js");

const {
  uploadAwardDoc,
  getAwardsForNeutral,
  publishAwardDoc,
  deleteAwardDoc,
} = require("../Controller/NeutralAwardController");
const upload = require("../middlewares/multer.js");

router.post("/register", NeutralRegister);
router.post("/login", NeutralLogin);

router.get("/data", verifyToken, authorizeRoles("neutral", "admin"), NeutralData);
router.get("/get-all-neutral", getAllNeutral);
router.get("/notifications/:neutralId", getNotification);
router.post("/get-notifications", getNotificationForNeutral);
router.delete("/delete-neutral-notification/:id", deleteNeutralNotification);
router.delete(
  "/delete-all-neutral-notification/:email",
  deleteAllNeutralNotification
);
router.get("/get-status/:caseId", getCaseStatus);
router.put("/update-status/:caseId", updateStatus);
router.put("/update-case-details/:caseId", verifyToken, authorizeRoles("neutral", "admin"), updateCaseDetails);

// Neutral Dashboard Stats (Real-Time)
router.get("/dashboard-stats/:neutralId", getNeutralDashboardStats);

// Neutral Profile and Password Updates
router.put("/update-profile", verifyToken, authorizeRoles("neutral", "admin"), updateNeutralProfile);
router.put("/update-password", verifyToken, authorizeRoles("neutral", "admin"), updateNeutralPassword);

// Neutral Orders / Awards / Notes Routes
const handleAwardUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error("Award file upload error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Invalid file or file upload failed",
      });
    }
    next();
  });
};

router.post(
  "/awards/upload",
  verifyToken,
  authorizeRoles("neutral", "admin"),
  handleAwardUpload,
  uploadAwardDoc
);
router.get("/awards/:neutralId", verifyToken, authorizeRoles("neutral", "admin"), getAwardsForNeutral);
router.put("/awards/:id/publish", verifyToken, authorizeRoles("neutral", "admin"), publishAwardDoc);
router.delete("/awards/:id", verifyToken, authorizeRoles("neutral", "admin"), deleteAwardDoc);

module.exports = router;
