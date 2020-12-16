import { Body, Controller, Get, Logger, NotFoundException, Param, Post } from '@nestjs/common';

import { CreatePostDto } from '@Posts/dtos/create-post.dto';
import { PostsService } from '@Posts/services/posts.service';

@Controller('posts')
export class PostsController {

  private readonly logger: Logger;

  constructor(private postsService: PostsService) {
    this.logger = new Logger(PostsController.name);
  }

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const post = await this.postsService.findBySlug(slug);
    if (!post) {
      throw new NotFoundException();
    } else {
      return this.postsService.findBySlug(slug);
    }
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return {slug: await this.postsService.create(createPostDto)};
  }

}
