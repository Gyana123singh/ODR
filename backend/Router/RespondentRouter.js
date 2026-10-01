const Express = require("express");
const router = Express.Router();
const upload = require("../middlewares/multer");
const {
  RespondentRegister,
  RespondentLogin,
  RespondentData,
  getRespondentCase,
  getScheduleHearingByCaseId,
  getCaseNotification,
  deleteRespondentNotification,
  deleteAllRespondentNotification,
  getRespondentUsers,
  uploadDocumentForRespondent,
  getDocumentsByUser,
  deleteRespondentDocument,
  createRespondentEvent,
  updateRespondentEvent,
  deleteRespondentEvent,
  submitCaseResponse,
  updateRespondentProfile,
  updateRespondentPassword,
} = require("../Controller/RespondentController");
const { verifyToken, authorizeRoles } = require("../middlewares/Auth.js");

router.post("/register", RespondentRegister);
router.post("/login", RespondentLogin);

router.get("/data", verifyToken, authorizeRoles("respondent"), RespondentData);
router.put("/update-profile", verifyToken, authorizeRoles("respondent"), updateRespondentProfile);
router.put("/update-password", verifyToken, authorizeRoles("respondent"), updateRespondentPassword);

// Case management & response
router.post("/my-case", getRespondentCase);
router.get("/my-case", verifyToken, getRespondentCase);
router.post("/submit-case-response", submitCaseResponse);

// Events & hearings CRUD
router.post("/get-hearing-by-caseId", getScheduleHearingByCaseId);
router.get("/get-hearing-by-caseId", verifyToken, getScheduleHearingByCaseId);
router.post("/create-event", createRespondentEvent);
router.put("/update-event/:id", updateRespondentEvent);
router.delete("/delete-event/:id", deleteRespondentEvent);

// Notifications
router.post("/get-notification", getCaseNotification);
router.delete(
  "/delete-respondent-notification/:id",
  deleteRespondentNotification
);
router.delete(
  "/delete-all-respondent-notification/:email",
  deleteAllRespondentNotification
);

// Users list
router.get("/get-respondent-users", getRespondentUsers);

// Documents CRUD
router.post(
  "/document-upload-by-respondent/:respondentId",
  upload.any(),
  uploadDocumentForRespondent
);
router.post(
  "/document-upload-by-respondent",
  upload.any(),
  uploadDocumentForRespondent
);
router.get("/get-documents/:email", getDocumentsByUser);
router.delete("/delete-document/:id", deleteRespondentDocument);

module.exports = router;
