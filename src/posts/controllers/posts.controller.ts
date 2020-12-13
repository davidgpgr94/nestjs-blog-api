import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreatePostDto } from '@Posts/dtos/create-post.dto';
import { PostsService } from '@Posts/services/posts.service';

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) {}

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return {slug: await this.postsService.create(createPostDto)};
  }

}
