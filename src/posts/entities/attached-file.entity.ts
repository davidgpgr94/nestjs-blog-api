
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

import { Post } from './post.entity';
import { AttchFileExposeGroups } from '@Posts/enums/attached-file-expose-groups.enum';

@Entity()
export class AttachedFile {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Expose({
    groups: [ AttchFileExposeGroups.FULL ]
  })
  path: string;

  @Column()
  filename: string;

  @ManyToOne(() => Post,
    {
      eager: false,
      nullable: false,
      onDelete: 'CASCADE'
    }
  )
  @Index()
  post: Post;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

}
