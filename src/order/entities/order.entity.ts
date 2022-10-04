import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export type ORDER_STATUS = "SUCCESS" | "PENDING" | "FAILED";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column()
  user_id: string;

  @Column()
  server_id: string;

  @Column()
  order_number: string;

  @Column()
  diamond: string;

  @Column({ default: "PENDING" })
  status: ORDER_STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
