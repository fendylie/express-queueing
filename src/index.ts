import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import OrderRoutes from "./order/order.route";
import database from "./config/database";
import { serverAdapter } from "./jobs/router";
import passport from "passport";
import cors from "cors";
import session from "express-session";

const TokenStrategy = require("passport-accesstoken").Strategy;

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

database
  .initialize()
  .then(() => console.log("running"))
  .catch(console.error);

app.use(
  session({ secret: "TOP_SECRET", saveUninitialized: true, resave: false })
);

app.use(passport.initialize());
app.use(passport.session());

const strategyOptions = {
  tokenHeader: "X-APP-TOKEN",
};

passport.use(
  new TokenStrategy(strategyOptions, (token: any, done: any) => {
    return done(null, {});
  })
);

app.use("/admin/queues", serverAdapter.getRouter());

app.use(passport.authenticate("token", { session: false }));

app.use("/api", OrderRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
