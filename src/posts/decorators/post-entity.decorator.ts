
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { Post } from '@Posts/entities/post.entity';

export const PostEntity = createParamDecorator<unknown, ExecutionContext, Post>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.post;
  },
)
