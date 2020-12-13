import { EntityRepository, AbstractRepository } from "typeorm";
import { CreatePostDto } from "../dtos/create-post.dto";

import { Post } from '../entities/post.entity';

@EntityRepository(Post)
export class PostRepository extends AbstractRepository<Post> {

  async findOne(id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  async findAll() {
    return await this.repository.find();
  }

  async createPost(createPostDto: CreatePostDto) {
    const post = this.repository.create(createPostDto);
    const postsWithSameInitialSlug = await this.repository.createQueryBuilder('post')
      .where("post.slug like :slug", { slug: `${post.getSlug()}%` })
      .getCount();
    if (postsWithSameInitialSlug > 0) {
      post.slug = `${post.getSlug()}-${postsWithSameInitialSlug + 1}`;
    }
    const postCreated = await this.repository.save(post);
    return postCreated.slug;
  }

}
