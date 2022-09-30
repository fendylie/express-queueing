import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { createOrder } from "../jobs/queues/order.queue";

export class OrderController {
  constructor(private orderService: OrderService) {}

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.orderService.findAll();

      res.status(200).json({
        statusCode: 200,
        message: "Successfully get data",
        data: users,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const body = req.body;
    try {
      const order = await this.orderService.create(body);
      await createOrder(body);

      res.status(200).json({
        message: "Successfully created data",
        data: order,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;

      const order = await this.orderService.update(id, body);

      res.status(200).json({
        message: "Successfully updated data",
        data: order,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
