import { Router } from "express";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { validateInput } from "../helpers/validation.helper";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

const router = Router();

const controller = new OrderController(new OrderService());

router.get("/order", controller.findAll.bind(controller));
router.post(
  "/order",
  [validateInput(CreateOrderDto)],
  controller.create.bind(controller)
);
router.put(
  "/order/:id",
  [validateInput(UpdateOrderDto)],
  controller.update.bind(controller)
);

export default router;
