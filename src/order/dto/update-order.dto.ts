import { IsIn, IsNotEmpty } from "class-validator";
import { ORDER_STATUS } from "../entities/order.entity";
import { JOB_STATUS_ARRAY } from "../../constants";

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsIn(JOB_STATUS_ARRAY)
  status: ORDER_STATUS;
}
