import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { CommentRepository } from './repositories/comment.repository';

import { RetrievePostBySlugMiddleware } from '@Posts/middlewares/retrieve-post-by-slug.middleware';
import { PostsModule } from '@Posts/posts.module';

@Module({
  controllers: [CommentsController],
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository
    ]),
    PostsModule
  ],
  providers: [ CommentsService ]
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RetrievePostBySlugMiddleware)
      .forRoutes(CommentsController)
  }
}
