import { Order } from "./entities/order.entity";
import database from "../config/database";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ResponseMessageType } from "../constants";

export class OrderService {
  constructor(private orderRepository = database.getRepository(Order)) {}

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: string | number): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id: Number(id) });

    if (!order) {
      throw new Error(ResponseMessageType.NOT_FOUND);
    }

    return order;
  }

  async create(data: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(data);
    await this.orderRepository.save(order);
    return order;
  }

  async update(id: string | number, data: UpdateOrderDto): Promise<Order> {
    await this.orderRepository.update(id, data);
    return this.findOne(id);
  }
}
