
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SlugService } from '@Common/utils/slug.service';
import { PostsController } from '@Posts/controllers/posts.controller';
import { AttachedFilesController } from '@Posts/controllers/attached-files/attached-files.controller';
import { PostsService } from '@Posts/services/posts.service';
import { PostRepository } from '@Posts/repositories/post.repository';
import { AttachedFileRepository } from '@Posts/repositories/attached-file.repository';
import { PostSubscriber } from '@Posts/subscribers/post.subscriber';
import { RetrievePostBySlugMiddleware } from '@Posts/middlewares/retrieve-post-by-slug.middleware';
import { FilesUploadModule } from '@Common/files-upload/files-upload.module';
import { AttachedFilesService } from '@Posts/services/attached-files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      AttachedFileRepository
    ]),
    FilesUploadModule
  ],
  controllers: [PostsController, AttachedFilesController],
  providers: [
    PostsService,
    PostSubscriber,
    SlugService,
    AttachedFilesService
  ],
  exports: [ PostsService ]
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RetrievePostBySlugMiddleware)
      .forRoutes(
        { path: 'posts/:slug', method: RequestMethod.PUT },
        { path: 'posts/:slug', method: RequestMethod.DELETE },
        AttachedFilesController
      )
  }
}
