import { DoneCallback, Job } from "bull";
import { Order } from "../../order/entities/order.entity";
import { queueLoggerHelper } from "../../helpers/logger.helper";

export const orderProcess = async (job: Job<Order>, done: DoneCallback) => {
  queueLoggerHelper(job, "order", "PROCESS");

  // do some logic
  try {
    done();
  } catch (err) {
    done();
    throw new Error("Internal server error");
  }
};
