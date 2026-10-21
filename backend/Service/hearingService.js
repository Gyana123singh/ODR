const transporter = require("../config/smtp");
const { assignHearingTemplate } = require("../utils/hearingEmailTemplate");

async function sendAssignHearingEmail(
  to,
  caseName,
  caseId,
  createdAt,
  hearingType,
  duration,
  time,
  location,
  meetLink
) {
  if (!to) throw new Error("No recipient email provided");

  const html = assignHearingTemplate(
    caseName,
    caseId,
    createdAt,
    hearingType,
    duration,
    time,
    location,
    meetLink
  );

  return await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.EMAIL,
    to,
    subject: `Hearing Scheduled - Case ${caseId}`,
    html,
  });
}

module.exports = { sendAssignHearingEmail };
