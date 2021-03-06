import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { AppController } from '@AppRoot/app.controller';

import { PostsModule } from '@Posts/posts.module';
import { DatabaseModule } from '@Common/database/database.module';
import { LoggingInterceptor } from '@Common/interceptors/logging.interceptor';
import { TransformResponseInterceptor } from '@Common/interceptors/transform-response.interceptor';
import { AllExceptionsFilter } from '@Common/filters/all-exceptions.filter';
import { AuthModule } from '@Auth/auth.module';
import { UsersModule } from '@Users/users.module';
import { CaslModule } from '@Acl/casl.module';
import { CommentsModule } from '@Comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      expandVariables: true
    }),
    DatabaseModule,
    PostsModule,
    AuthModule,
    UsersModule,
    CaslModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidUnknownValues: true
      })
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ],
})
export class AppModule {}
