import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()

export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique:true})
  name: string;

  @Column({nullable:true})
  description: string;

  
}
