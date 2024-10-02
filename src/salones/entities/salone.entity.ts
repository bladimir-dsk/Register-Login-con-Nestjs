import { Grupo } from "src/grupos/entities/grupo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Salone {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;


    @OneToMany(() => Grupo, (grupo) => grupo.salonid)
    salone: Salone[]

    
}
