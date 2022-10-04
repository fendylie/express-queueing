import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { createOrder } from "../jobs/queues/order.queue";
import { ResponseMessageType, StatusCodeType } from "../constants";
import { ResponseBody } from "../@core/interfaces/response.interface";
import { Order } from "./entities/order.entity";

export class OrderController {
  constructor(private orderService: OrderService) {}

  async findAll(
    req: Request,
    res: Response<ResponseBody<Order[]>>
  ): Promise<void> {
    try {
      const orders = await this.orderService.findAll();

      res.status(StatusCodeType.OK).json({
        statusCode: StatusCodeType.OK,
        message: ResponseMessageType.SUCCESS_FETCH_DATA,
        data: orders,
      });
    } catch (err) {
      res.status(StatusCodeType.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodeType.INTERNAL_SERVER_ERROR,
        message: ResponseMessageType.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async create(
    req: Request,
    res: Response<ResponseBody<Order>>
  ): Promise<void> {
    const body = req.body;

    try {
      const order = await this.orderService.create(body);
      await createOrder(order);

      res.status(StatusCodeType.CREATED).json({
        statusCode: StatusCodeType.CREATED,
        message: ResponseMessageType.SUCCESS_CREATE_DATA,
        data: order,
      });
    } catch (err) {
      res.status(StatusCodeType.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodeType.INTERNAL_SERVER_ERROR,
        message: ResponseMessageType.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async update(
    req: Request,
    res: Response<ResponseBody<Order>>
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;

      const order = await this.orderService.update(id, body);

      res.status(StatusCodeType.OK).json({
        statusCode: StatusCodeType.OK,
        message: ResponseMessageType.SUCCESS_UPDATE_DATA,
        data: order,
      });
    } catch (err) {
      const error = err as Error;

      if (error.message === ResponseMessageType.NOT_FOUND) {
        res.status(StatusCodeType.NOT_FOUND).json({
          statusCode: StatusCodeType.NOT_FOUND,
          message: ResponseMessageType.NOT_FOUND,
        });

        return;
      }

      res.status(StatusCodeType.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodeType.INTERNAL_SERVER_ERROR,
        message: ResponseMessageType.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
