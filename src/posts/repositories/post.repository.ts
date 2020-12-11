import { Repository, EntityRepository, AbstractRepository } from "typeorm";

import { Post } from '../entities/post.entity';

@EntityRepository(Post)
export class PostRepository extends AbstractRepository<Post> {

  async myFindOne(id: string) {
    const result = await this.repository.findOne(id);
    console.log(result);
    return result;
  }

  async findAll() {
    return await this.repository.find();
  }

}
