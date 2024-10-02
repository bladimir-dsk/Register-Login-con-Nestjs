import { Grupo } from "src/grupos/entities/grupo.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Evaluadore {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;

    @Column()
    calificacion: number;


    @ManyToOne(() => Grupo, (grupo) => grupo.id)
    grupoId: Grupo
}
