import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  server_id: string;

  @IsNotEmpty()
  order_number: string;

  @IsNotEmpty()
  diamond: string;
}
