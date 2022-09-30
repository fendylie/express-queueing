import { Router } from "express";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";

const router = Router();

const controller = new UserController(new UserRepository());

router.get("/user", controller.findAll.bind(controller));
router.post("/user", controller.create.bind(controller));

export default router;
