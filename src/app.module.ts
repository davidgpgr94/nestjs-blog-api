import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { PostsModule } from '@Posts/posts.module';
import { DatabaseModule } from '@Common/database/database.module';
import { LoggingInterceptor } from '@Common/interceptors/logging.interceptor';
import { TransformResponseInterceptor } from '@Common/interceptors/transform-response.interceptor';

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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule {}
