
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, Index } from 'typeorm';
const urlSlug = require('url-slug');

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

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @BeforeInsert()
  beforeInserActions() {
    this.addSlug();
  }

  public getSlug() {
    return urlSlug(this.title);
  }

  private addSlug() {
    if (!this.slug)
      this.slug = this.getSlug();
  }

}
