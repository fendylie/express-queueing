import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import UserRoutes from "./users/user.route";
import OrderRoutes from "./orders/order.route";
import database from "./config/database";
import { serverAdapter } from "./jobs/router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

database
  .initialize()
  .then(() => console.log("running"))
  .catch(console.error);

app.use("/admin/queues", serverAdapter.getRouter());

app.use("/api", UserRoutes);
app.use("/api", OrderRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
