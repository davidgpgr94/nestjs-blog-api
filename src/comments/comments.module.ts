import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments.controller';

@Module({
  controllers: [CommentsController]
})
export class CommentsModule {}
