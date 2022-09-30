import logger from "../config/logging";
import { Job } from "bull";
import { JOB_STATUS } from "../constants";

export const queueLoggerHelper = (
  job: Job,
  queueName: string,
  status: JOB_STATUS
) => {
  if (status === "SUCCESS") {
    logger.info(`Completed ${queueName} job ${job.id}`);
  } else if (status === "FAILED") {
    logger.info(`Failed ${queueName} job ${job.id} reason ${job.failedReason}`);
  } else {
    logger.info(`Processing ${queueName} job ${job.id}`);
  }
};
