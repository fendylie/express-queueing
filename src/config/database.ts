import { DataSource } from "typeorm";
import { Order } from "../order/entities/order.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export default new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "express",
  synchronize: process.env.NODE_ENV !== "production",
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [Order],
});
