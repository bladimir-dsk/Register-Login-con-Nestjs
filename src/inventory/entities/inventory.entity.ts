import { Category } from 'src/category/entities/category.entity';
import { Department } from 'src/department/entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'inventories' })
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  location: string;

  @Column()
  category: string;

  // @Column()
  // department: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  dateEntry: Date;

  @Column({ type: 'boolean', default: true })
  state: boolean;

  @Column()
  observations: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.email)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User;

  @Column()
  userEmail: string;

  @ManyToOne(() => Department, (department) => department.id, {
    eager: true,
  })
  departments: Department;

  @ManyToOne(() => Category, (category) => category.id, {
    eager: true,
  })
  categorys: Category;
}
