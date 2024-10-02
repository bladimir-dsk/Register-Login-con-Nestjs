import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Alumno {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;

}
