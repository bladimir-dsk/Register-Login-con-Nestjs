import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class DocumentType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

}
