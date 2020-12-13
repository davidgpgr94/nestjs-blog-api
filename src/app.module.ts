import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostsModule } from '@Posts/posts.module';
import { DatabaseModule } from '@Common/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      expandVariables: true
    }),
   DatabaseModule,
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
