import { Empleado } from "src/empleado/entities/empleado.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Empresa {

    @PrimaryGeneratedColumn()
    id_empresa: number;

    @Column()
    nombre: string;

    @OneToOne(() => User, (user) => user.empresa)
    user: User;

    @OneToMany(() => Empleado, empleado => empleado.empresa)
    empleado: Empleado[];
    
}
