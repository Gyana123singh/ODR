require("dotenv").config();
const transporter = require("./config/smtp");

async function verifySmtp() {
  console.log("-----------------------------------------");
  console.log("Verifying Utkal ODR Hostinger SMTP Config");
  console.log("-----------------------------------------");
  console.log(`Host: ${process.env.SMTP_HOST || "smtp.hostinger.com"}`);
  console.log(`Port: ${process.env.SMTP_PORT || 465}`);
  console.log(`Secure: ${process.env.SMTP_SECURE || true}`);
  console.log(`User: ${process.env.SMTP_USER || process.env.EMAIL}`);

  try {
    await transporter.verify();
    console.log("✅ SMTP Server Connection & Authentication Successful!");

    // Send a test email to the mailbox itself
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Utkal ODR" <${process.env.SMTP_USER || process.env.EMAIL}>`,
      to: process.env.SMTP_USER || process.env.EMAIL,
      subject: "Utkal ODR SMTP Verification Successful",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0066cc;">Utkal ODR SMTP is Live</h2>
          <p>This email confirms that Hostinger SMTP has been properly configured for <strong>Utkal ODR</strong>.</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #777;">Sent via contact@utkalodr.com (smtp.hostinger.com:465)</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Test Email Sent Successfully!");
    console.log(`   Message ID: ${info.messageId}`);
    console.log("-----------------------------------------");
  } catch (error) {
    console.error("❌ SMTP Verification Failed:", error.message);
    if (error.response) console.error("   Response:", error.response);
  }
}

verifySmtp();
