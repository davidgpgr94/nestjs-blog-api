import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsModule } from './posts/posts.module';
import * as ormconfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormconfig,
      autoLoadEntities: true
    }),
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
