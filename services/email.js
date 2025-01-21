import nodemailer from "nodemailer";

export async function sendEmail(dest, subject, message = []) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.nodeMailerEmail,
      pass: process.env.nodeMailerPassword,
    },
  });
  let info = transporter.sendMail({
    from: `"ITI" < ${process.env.nodeMailerEmail}>`,
    to: dest,
    subject, // Subject line
    html: message, // html body
  });
  return info;
}
