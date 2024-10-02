import { Evaluadore } from "src/evaluadores/entities/evaluadore.entity";
import { Salone } from "src/salones/entities/salone.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Grupo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;


    @OneToMany(() => Evaluadore, (evaluador) => evaluador.grupoId)
    evaluador: Evaluadore[]


    // @ManyToMany(() => Salone, (salone) => salone.id, {
    //     cascade: true,
    // })
    
    // @JoinTable()
    // salones: Salone[]

    @ManyToMany(() => Salone, (salone) => salone.grupos)
  @JoinTable()  // Esta tabla intermedia se gestiona automáticamente por TypeORM
  salones: Salone[];

}
