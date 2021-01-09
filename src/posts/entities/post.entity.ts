
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Expose } from 'class-transformer';

import { User } from '@Users/entities/user.entity';
import { Comment } from '@Comments/entities/comment.entity';
import { PostExposeGroups } from '@Posts/enums/post-expose-groups.enum';
import { AttachedFile } from './attached-file.entity';

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Index()
  @Column({ unique: true })
  slug: string;

  @Column()
  text: string;

  @ManyToOne(() => User,
    {
      eager: true,
      nullable: true,
      onDelete: 'SET NULL'
    }
  )
  @Index({ unique: false })
  author: User;

  @OneToMany(() => Comment, comment => comment.post, { eager: true })
  @Expose({
    groups: [ PostExposeGroups.FULL, PostExposeGroups.WITH_COMMENTS ]
  })
  comments: Comment[];

  @OneToMany(() => AttachedFile, file => file.post, { eager: true })
  @Expose({
    groups: [ PostExposeGroups.FULL, PostExposeGroups.WITH_FILES ]
  })
  files: AttachedFile[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

}
