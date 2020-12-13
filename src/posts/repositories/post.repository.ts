import { EntityRepository, AbstractRepository } from "typeorm";

import { CreatePostDto } from "@Posts/dtos/create-post.dto";
import { Post } from '@Posts/entities/post.entity';

@EntityRepository(Post)
export class PostRepository extends AbstractRepository<Post> {

  async findOne(id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  async findBySlug(slug: string) {
    return await this.repository.findOne({ slug: slug });
  }

  async findAll() {
    return await this.repository.find();
  }

  async createPost(createPostDto: CreatePostDto) {
    const post = this.repository.create(createPostDto);
    const postCreated = await this.repository.save(post);
    return postCreated.slug;
  }

  async countPostsWithSimilarSlug(slug: string): Promise<number> {
    return await this.repository.createQueryBuilder('post')
      .where("post.slug like :slug", { slug: `${slug}%` })
      .getCount();
  }

}
