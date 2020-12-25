
import { RequestWithPost } from '@AppRoot/posts/middlewares/retrieve-post-by-slug.middleware';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Post } from '@Posts/entities/post.entity';

export const PostEntity = createParamDecorator<unknown, ExecutionContext, Post>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithPost>();
    return request.post;
  },
)
