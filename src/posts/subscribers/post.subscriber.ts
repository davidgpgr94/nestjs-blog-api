
import { SlugService } from '@Common/utils/slug.service';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';


import { Post } from '@Posts/entities/post.entity';
import { PostRepository } from '@Posts/repositories/post.repository';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {

  constructor(
    connection: Connection,
    private slugService: SlugService
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Post;
  }

  async beforeInsert(event: InsertEvent<Post>) {
    if (!event.entity.slug) {
      event.entity.slug = this.slugService.slug(event.entity.title);
      const postsWithSimilarSlug = await event.manager.getCustomRepository(PostRepository).countPostsWithSimilarSlug(event.entity.slug);
      if (postsWithSimilarSlug > 0) {
        event.entity.slug += `-${postsWithSimilarSlug + 1}`;
      }
    }
  }

}
