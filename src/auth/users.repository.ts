import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";



@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(name: string, email: string, password: string): Promise<void> {
 
      const user = this.create({ name, email, password }); // el create es una clase de typeorm

      try {
        await this.save(user); // guardamos el usuario en la base de datos
      } catch (error) {
        if(error.code === "ER_DUP_ENTRY") {
          throw new ConflictException("This email is already registered") // Si hay un email registrado saldra este msg, el ER_DUP_ENTRY lo sacamos del debugger
        }
        throw new InternalServerErrorException(); // Si hay otro tipo de error nos saldra ese msj
      }
      
    }

    async findOneByEmail(email: string): Promise<User> {
      return this.findOne({ email })
    }
}