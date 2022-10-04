import { IsNotEmpty } from "class-validator";
import { ORDER_STATUS } from "../entities/order.entity";

export class UpdateOrderDto {
  @IsNotEmpty()
  status: ORDER_STATUS;
}
