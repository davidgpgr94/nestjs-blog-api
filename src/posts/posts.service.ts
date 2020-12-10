import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private connection: Connection
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async createMany(posts: Post[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        await queryRunner.manager.save<Post>(post);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

}
