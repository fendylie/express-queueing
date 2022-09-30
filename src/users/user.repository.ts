import { User } from "./user.entity";
import database from "../config/database";
import { hashingPassword } from "../helpers/password.helper";

export class UserRepository {
  findAll(): Promise<User[]> {
    const repository = database.getRepository(User);
    return repository.find();
  }

  async create(data: User): Promise<User> {
    const repository = database.getRepository(User);
    const hashPassword = await hashingPassword(data.password);

    const user = repository.create({
      ...data,
      password: hashPassword,
    });

    await repository.save(user);
    return user;
  }
}
