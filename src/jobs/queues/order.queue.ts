import makeQueue from "../../config/queue";
import { orderProcess } from "../processes/order.process";
import { CreateOrderDto } from "../../orders/dto/create-order.dto";
import { OrderService } from "../../orders/order.service";
import { Order } from "../../orders/entities/order.entity";
import { Job } from "bull";
import { queueLoggerHelper } from "../../helpers/logger.helper";

const orderQueue = makeQueue("order");
orderQueue.process(orderProcess);

orderQueue.on("completed", async (job: Job<Order>, result) => {
  console.log(result);
  const service = new OrderService();
  await service.update(job.data.id, {
    status: "SUCCESS",
  });
  queueLoggerHelper(job, "order", "SUCCESS");
});

orderQueue.on("failed", async (job, result) => {
  console.log(job, result);
  const service = new OrderService();
  await service.update(job.data.id, {
    status: "FAILED",
  });
  queueLoggerHelper(job, "order", "FAILED");
});

export const createOrder = (data: CreateOrderDto) => {
  const normalizeData = {
    ...data,
    status: "PENDING",
  };

  orderQueue.add(normalizeData);
};
