/* eslint-disable import/no-extraneous-dependencies */
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const APP_NAME = process.env.APP_NAME;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
});

/**
 * Send an email using Nodemailer
 * @param {Object} mailOptions - Email options (to, subject, template data)
 * @param {string} templateName - The EJS template filename (without extension)
 */
async function sendEmail(mailOptions, templateName) {
  try {
    // Set the template file path
    const templatePath = path.join(process.cwd(), "views", `${templateName}.ejs`);

    const baseUrl = process.env.IMAGE_URL;
    // Render the email template with data
    // const emailHtml = await ejs.renderFile(templatePath, mailOptions);
    const emailHtml = await ejs.renderFile(templatePath, {
      ...mailOptions,
      baseUrl
    });

  

    // Prepare email options
    const mailConfig = {
      from: process.env.EMAIL,
      to: mailOptions.to,
      subject: mailOptions.subject || `${APP_NAME} - Notification`,
      html: emailHtml,
    };

    // Send the email
    const info = await transporter.sendMail(mailConfig);
    // //console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

module.exports = { sendEmail };
