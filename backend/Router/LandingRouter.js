const Express = require("express");
const router = Express.Router();
const path = require("path");
const Case = require("../models/Case");
const upload = require("../middlewares/multer");
const cloudinary = require("../config/cloudinary");

router.post("/contact", upload.single("file"), async (req, res) => {
  try {
    const data = req.body;
    const file = req.file;
    console.log("Received Dispute Details from Landing Page:", data);
    
    let fileUrl = "";
    
    if (file) {
      console.log("📦 Uploading file:", file.originalname);
      const ext = path.extname(file.originalname).toLowerCase();
      const resourceType =
        ext === ".pdf" || ext === ".doc" || ext === ".docx" || ext === ".txt"
          ? "raw"
          : "auto";

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "uploads",
        resource_type: resourceType,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      console.log("✅ Cloudinary Upload Success:", uploadResult.secure_url);
      fileUrl = uploadResult.secure_url;
    }

    // Generate caseId logic matching ClaimantController
    const year = new Date().getFullYear();
    const lastCase = await Case.findOne({ caseId: { $regex: `^CASE-${year}-` } }).sort({ caseId: -1 });
    
    let nextNumber = 1;
    if (lastCase && lastCase.caseId) {
      const lastNumber = parseInt(lastCase.caseId.split("-")[2]);
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }
    
    const formattedNumber = String(nextNumber).padStart(4, "0");
    const caseId = `CASE-${year}-${formattedNumber}`;

    // Map landing page form data to Case schema fields
    const newCase = new Case({
      caseId,
      DisputeType: data.disputeType,
      DisputeName: data.disputeName,
      DisputeAmount: data.disputeAmount,
      CustomersName: data.customerName,
      CustomersEmail: data.customerEmail,
      CustomersMobileNumber: data.customerMobile,
      CustomersAadharNumber: data.customerAadhar,
      oppositePartyName: data.oppositeName,
      oppositePartyEmail: data.oppositeEmail,
      oppositeMobile: data.oppositeMobile,
      consent: data.consent,
      status: "Pending", // initial status
      file: fileUrl, // save the uploaded file URL
    });

    await newCase.save();
    
    res.status(200).json({ message: "Dispute submitted successfully", caseId });
  } catch (error) {
    console.error("Error processing landing page dispute:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
