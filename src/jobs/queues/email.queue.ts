import { emailProcess } from "../processes/email.process";
import Queue from "bull";
import Mail from "nodemailer/lib/mailer";
import logger from "../../config/logging";

export const emailQueue = new Queue("email", {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  limiter: {
    max: 1000,
    duration: 5000,
  },
});

emailQueue.process(emailProcess);

export const sendEmail = (data: Mail.Options) => {
  const normalizeData = {
    ...data,
    from: "admin@vodea.id",
  };

  logger.info(
    `Add email queue from ${data.from} to ${data.to} with subject ${data.subject}`
  );

  emailQueue.add(normalizeData, {
    attempts: 2,
  });
};
