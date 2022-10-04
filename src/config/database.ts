import { DataSource } from "typeorm";
import { Order } from "../order/entities/order.entity";

export default new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "express",
  synchronize: process.env.NODE_ENV === "DEVELOPMENT",
  logging: false,
  entities: [Order],
});
