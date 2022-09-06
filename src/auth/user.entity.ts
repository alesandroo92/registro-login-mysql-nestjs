import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column()
    password: string;
    
    @Column({ type: "boolean", default: false }) // cada vez que se genere un nuevo usuario, no va a estar activado
    active: boolean;

    @CreateDateColumn() // cuando se crea un usuario, utiliza la hora en la cual fue creado
    createdOn: Date;
}