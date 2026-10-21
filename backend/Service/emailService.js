const transporter = require("../config/smtp");
const { assignNeutralTemplate } = require("../utils/emailTemplates");

async function sendAssignEmail(
  to,
  caseNumber,
  name,
  disputeType,
  disputeName,
  oppositePartyName,
  createdAt
) {
  if (!to) throw new Error("No recipient email provided");

  const html = assignNeutralTemplate(
    caseNumber,
    name,
    disputeType,
    disputeName,
    oppositePartyName,
    createdAt
  );

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.EMAIL,
    to,
    subject: `Neutral Assigned - Case ${caseNumber}`,
    html,
  });

  return info;
}

module.exports = { sendAssignEmail };
