import { EntityRepository, AbstractRepository } from "typeorm";

import { CreatePostDto } from "@Posts/dtos/create-post.dto";
import { Post } from '@Posts/entities/post.entity';
import { UpdatePostDto } from "../dtos/update-post.dto";

@EntityRepository(Post)
export class PostRepository extends AbstractRepository<Post> {

  async findOne(id: number) {
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
    return postCreated;
  }

  async updatePost(postToUpdate: Post, updatePostDto: UpdatePostDto) {
    await this.repository.update(postToUpdate.id, updatePostDto);
    return await this.repository.findOne(postToUpdate.id);
  }

  async countPostsWithSimilarSlug(slug: string): Promise<number> {
    return await this.repository.createQueryBuilder('post')
      .where("post.slug like :slug", { slug: `${slug}%` })
      .getCount();
  }

  async remove(postToRemove: Post) {
    const postRemoved = await this.repository.remove(postToRemove)
    return postRemoved !== undefined;
  }

}
