
import { User } from '@Users/entities/user.entity';
import { Comment } from '@Comments/entities/comment.entity';
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
  comments: Comment[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

}
