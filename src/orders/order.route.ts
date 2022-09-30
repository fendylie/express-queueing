import { Router } from "express";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

const router = Router();

const controller = new OrderController(new OrderService());

router.get("/order", controller.findAll.bind(controller));
router.post("/order", controller.create.bind(controller));
router.put("/order/:id", controller.update.bind(controller));

export default router;
