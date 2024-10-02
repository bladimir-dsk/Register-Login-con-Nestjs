import { Grupo } from "src/grupos/entities/grupo.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Salone {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @ManyToMany(() => Grupo, (grupo) => grupo.salones)
    grupos: Grupo[];
    
}
