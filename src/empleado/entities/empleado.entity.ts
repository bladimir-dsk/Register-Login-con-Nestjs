import { Empresa } from "src/empresa/entities/empresa.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Empleado {

    @PrimaryGeneratedColumn()
    id_empleado: number;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Empresa, empresa => empresa.empleado)
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa;

    @Column()
    userEmail: string;

    // @Column()
    // id_empresas: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'id_usuario', }) // Relación por ID
    user: User;
    

}
