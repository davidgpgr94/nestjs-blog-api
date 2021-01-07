
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SlugService } from '@Common/utils/slug.service';
import { PostsController } from '@Posts/controllers/posts.controller';
import { PostsService } from '@Posts/services/posts.service';
import { PostRepository } from '@Posts/repositories/post.repository';
import { PostSubscriber } from '@Posts/subscribers/post.subscriber';
import { RetrievePostBySlugMiddleware } from '@Posts/middlewares/retrieve-post-by-slug.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository
    ])
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostSubscriber,
    SlugService
  ]
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RetrievePostBySlugMiddleware)
      .forRoutes(
        { path: 'posts/:slug', method: RequestMethod.PUT },
        { path: 'posts/:slug', method: RequestMethod.DELETE },
      )
  }
}
