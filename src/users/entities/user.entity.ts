
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm';
import { Expose } from 'class-transformer';

import { UserExposeGroups } from '@Users/enums/expose.enum';
import { Role } from '@Users/enums/role.enum';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false, unique: true })
  login: string;

  @Column({ nullable: false })
  @Expose({
    groups: [ UserExposeGroups.FULL ],
  })
  hashedPassword: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({
    type: 'simple-enum',
    enum: Role,
    default: Role.User
  })
  role: Role;

  @CreateDateColumn()
  @Expose({
    groups: [ UserExposeGroups.FULL ]
  })
  createdAt?: Date;

  @UpdateDateColumn()
  @Expose({
    groups: [ UserExposeGroups.FULL ]
  })
  updatedAt?: Date;

}
