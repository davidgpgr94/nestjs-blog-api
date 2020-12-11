import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { PostRepository } from './repositories/post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository
      // Post
    ])
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
