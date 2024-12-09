import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class GeneredDocument {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @CreateDateColumn()
    createdAt: Date
}
