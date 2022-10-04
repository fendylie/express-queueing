import makeQueue from "../../config/queue";
import { orderProcess } from "../processes/order.process";
import { CreateOrderDto } from "../../order/dto/create-order.dto";
import { OrderService } from "../../order/order.service";
import { Order } from "../../order/entities/order.entity";
import { Job } from "bull";
import { queueLoggerHelper } from "../../helpers/logger.helper";

export const orderQueue = makeQueue("order");
orderQueue.process(orderProcess);

orderQueue.on("completed", async (job: Job<Order>, result) => {
  const service = new OrderService();
  await service.update(job.data.id, {
    status: "SUCCESS",
  });
  queueLoggerHelper(job, "order", "SUCCESS");
});

orderQueue.on("failed", async (job, result) => {
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
