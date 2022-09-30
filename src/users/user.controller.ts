import { Request, Response, NextFunction } from "express";
import { UserRepository } from "./user.repository";
import { sendEmail } from "../jobs/queues/email.queue";

export class UserController {
  constructor(private repository: UserRepository) {}

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this.repository.findAll();
      res.status(200).json({
        success: true,
        message: "Successfully get data",
        data: users,
      });
    } catch (err) {
      res.status(200).json({
        success: false,
        message: "Failed",
      });
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body;
    try {
      const user = await this.repository.create(body);
      await sendEmail({
        to: body.email,
        subject: "Register Account",
        html: "<p> Register Account </p>",
      });

      res.status(200).json({
        success: true,
        message: "Successfully created data",
        data: user,
      });
    } catch (err) {
      res.status(200).json({
        success: false,
        message: "Failed",
      });
    }
  }
}
