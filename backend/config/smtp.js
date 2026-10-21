const nodemailer = require("nodemailer");

const host = process.env.SMTP_HOST || "smtp.hostinger.com";
const port = parseInt(process.env.SMTP_PORT || "465", 10);
const secure = process.env.SMTP_SECURE === "false" ? false : port === 465;

const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: secure,
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL || "contact@utkalodr.com",
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS || "Utkalodr272829@30$",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
