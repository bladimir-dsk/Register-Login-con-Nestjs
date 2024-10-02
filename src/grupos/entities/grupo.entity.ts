import { Evaluadore } from "src/evaluadores/entities/evaluadore.entity";
import { Salone } from "src/salones/entities/salone.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Grupo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;


    @ManyToOne(() => Salone, (salone) => salone.id)
    salonid: Salone

    @OneToMany(() => Evaluadore, (evaluador) => evaluador.grupoId)
    evaluador: Evaluadore[]

}
