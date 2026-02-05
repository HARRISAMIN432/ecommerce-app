import nodemailer from "nodemailer";

export const sendMail = async (subject, receiver, body) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
  const options = {
    from: `"Muhammad Harris <${process.env.NODEMAILER_EMAIL}>"`,
    to: receiver,
    subject: subject,
    html: body,
  };

  try {
    await transporter.sendMail(options);
    return { success: true, message: "Email sent successfully" };
  } catch (e) {
    return { success: false, message: "Error sending email", error: e };
  }
};
