import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PostsService } from '../services/posts.service';

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) {}

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return {slug: await this.postsService.create(createPostDto)};
  }

}
