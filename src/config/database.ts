import { DataSource } from "typeorm";
import { User } from "../users/user.entity";
import { Order } from "../orders/entities/order.entity";

export default new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "express",
  synchronize: true,
  logging: false,
  entities: [User, Order],
});
