import { Inventory } from "src/inventory/entities/inventory.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'departments'})
export class Department {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    leader: string;

    @ManyToOne(() => User, (user) => user.email)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
    user: User;

    @Column()
    userEmail: string;

    @OneToMany(() => Inventory, (inventory) => inventory.name)
    inventorys: Inventory[]
    

}
