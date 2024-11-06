import { Department } from "src/department/entities/department.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'persons' })
export class Person {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    birthdayDate: Date;

    @Column()
    phone: string;

    @ManyToOne(() => User, (user) => user.email)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
    user: User;

    @Column()
    userEmail: string;

    @OneToMany(() => Department, (departament) => departament.id)
    departaments: Department[];
}
