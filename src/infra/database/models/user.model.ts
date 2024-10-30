import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class UserModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
