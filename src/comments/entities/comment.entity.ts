
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index
} from 'typeorm';

import { Post } from '@Posts/entities/post.entity';
import { User } from '@Users/entities/user.entity';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User,
    {
      eager: true,
      nullable: true,
      onDelete: 'SET NULL'
    }
  )
  @Index()
  author: User;

  @ManyToOne(() => Post,
    {
      eager: false,
      nullable: false,
      onDelete: 'CASCADE'
    }
  )
  @Index()
  post: Post;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

}
