import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class PerfilUsuario {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    genero: string
    @Column()
    pais: string
    @Column()
    contacto: string
    @Column()
    edad: number
    @Column( {type: 'date'})
    fecha_nacimiento: Date
    @Column()
    direccion: string



    @ManyToOne(() => User, (user) => user.email,)
    @JoinColumn({name: 'userEmail', referencedColumnName: 'email', })
    user: User;

    //creamos una columna para el email de referencedcolumn
    @Column()
    userEmail: string;


}
