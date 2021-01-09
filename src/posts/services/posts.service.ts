
import { Injectable } from '@nestjs/common';

import { CreatePostDto } from '@Posts/dtos/create-post.dto';
import { Post } from '@Posts/entities/post.entity';
import { PostRepository } from '@Posts/repositories/post.repository';
import { UpdatePostDto } from '@Posts/dtos/update-post.dto';

import { AttachedFilesService } from './attached-files.service';

@Injectable()
export class PostsService {

  // constructor(
  //   @InjectRepository(Post)
  //   private postsRepository: Repository<Post>,
  //   private connection: Connection
  // ) {}

  constructor(
    private postsRepository: PostRepository,
    private attachedFilesService: AttachedFilesService
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.findAll();
  }

  async findBySlug(slug: string): Promise<Post> {
    return await this.postsRepository.findBySlug(slug);
  }

  async create(createPostDto: CreatePostDto) {
    const postCreated = await this.postsRepository.createPost(createPostDto);
    await this.attachedFilesService.attachFilesToPost(createPostDto.files, postCreated);
    return await this.postsRepository.findOne(postCreated.id);
  }

  async update(postToUpdate: Post, updatePostDto: UpdatePostDto) {
    return this.postsRepository.updatePost(postToUpdate, updatePostDto);
  }

  async remove(postToRemove: Post) {
    return this.postsRepository.remove(postToRemove);
  }

  // async createMany(posts: Post[]) {
  //   const queryRunner = this.connection.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     for (let i = 0; i < posts.length; i++) {
  //       let post = posts[i];
  //       await queryRunner.manager.save<Post>(post);
  //     }
  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

}
