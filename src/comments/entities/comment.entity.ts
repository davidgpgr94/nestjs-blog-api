
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index
} from 'typeorm';
import { Expose } from 'class-transformer';

import { Post } from '@Posts/entities/post.entity';
import { User } from '@Users/entities/user.entity';

import { CommentExposeGroups } from '@Comments/enums/expose.enum';

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

  @Expose({
    groups: [
      CommentExposeGroups.FULL,
      CommentExposeGroups.WITH_POST
    ]
  })
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
