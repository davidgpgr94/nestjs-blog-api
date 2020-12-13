
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SlugService } from '@Common/utils/slug.service';
import { PostsController } from '@Posts/controllers/posts.controller';
import { PostsService } from '@Posts/services/posts.service';
import { PostRepository } from '@Posts/repositories/post.repository';
import { PostSubscriber } from '@Posts/subscribers/post.subscriber';

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
export class PostsModule {}
