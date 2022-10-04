import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { createOrder } from "../jobs/queues/order.queue";
import { ErrorMessageType } from "../constants";

export class OrderController {
  constructor(private orderService: OrderService) {}

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.orderService.findAll();

      res.status(200).json({
        statusCode: 200,
        message: ErrorMessageType.SUCCESS_FETCH_DATA,
        data: users,
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: ErrorMessageType.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const body = req.body;
    try {
      const order = await this.orderService.create(body);
      await createOrder(body);

      res.status(200).json({
        statusCode: 200,
        message: ErrorMessageType.SUCCESS_CREATE_DATA,
        data: order,
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: ErrorMessageType.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;

      const order = await this.orderService.update(id, body);

      res.status(200).json({
        statusCode: 200,
        message: ErrorMessageType.SUCCESS_UPDATE_DATA,
        data: order,
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: ErrorMessageType.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
