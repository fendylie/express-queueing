import { Job } from "bull";
import nodemailer from "nodemailer";
import logger from "../../config/logging";

export const emailProcess = async (job: Job) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail(job.data);

  logger.info(
    `Email job done from ${job.data.from} to ${job.data.to} with subject ${
      job.data.subject
    }. Message sent id ${
      info.messageId
    } and preview url ${nodemailer.getTestMessageUrl(info)}`
  );
};
