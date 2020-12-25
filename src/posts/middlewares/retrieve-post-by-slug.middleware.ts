import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { Request, Response } from "express";

import { Post } from '@Posts/entities/post.entity';
import { PostsService } from "../services/posts.service";

export type RequestWithPost = Request & {
  post: Post
}

@Injectable()
export class RetrievePostBySlugMiddleware implements NestMiddleware {

  constructor(private postsService: PostsService) {}

  async use(req: RequestWithPost, res: Response, next: () => void) {
    if (!req.params.slug) throw new BadRequestException('Missing slug');
    const post = await this.postsService.findBySlug(req.params.slug);
    if (!post) throw new NotFoundException();
    req.post = post;
    next();
  }

}
