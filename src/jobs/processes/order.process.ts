import { DoneCallback, Job } from "bull";
import { Order } from "../../orders/entities/order.entity";
import { queueLoggerHelper } from "../../helpers/logger.helper";

export const orderProcess = async (job: Job<Order>, done: DoneCallback) => {
  queueLoggerHelper(job, "order", "PROCESS");

  // do some logic
  try {
    queueLoggerHelper(job, "order", "SUCCESS");
    done();
  } catch (err) {
    queueLoggerHelper(job, "order", "FAILED");
    done();
    throw new Error("Internal server error");
  }
};
