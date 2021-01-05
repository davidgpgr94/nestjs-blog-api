import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Delete,
  InternalServerErrorException
} from '@nestjs/common';

import { CreatePostDto } from '@Posts/dtos/create-post.dto';
import { UpdatePostDto } from '@Posts/dtos/update-post.dto';
import { PostsService } from '@Posts/services/posts.service';
import { Post as PostEntity } from '@Posts/entities/post.entity';
import { PostEntity as PostEntityDecorator } from '@Posts/decorators/post-entity.decorator';

import { JwtAuthGuard } from '@Auth/guards/jwt-auth.guard';
import { Public } from '@Auth/decorators/public.decorator';
import { ReqUser } from '@Auth/decorators/user.decorator';

import { CheckPolicies } from '@Acl/decorators/check-policies.decorator';
import { Acl } from '@Acl/decorators/acl.decorator';
import { EditPostHandler, CreatePostHandler, RemovePostHandler } from '@Acl/policies';

import { User } from '@Users/entities/user.entity';

@Controller('posts')
@Acl(JwtAuthGuard)
export class PostsController {

  private readonly logger: Logger;

  constructor(private postsService: PostsService) {
    this.logger = new Logger(PostsController.name);
  }

  @Get()
  @Public(true)
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':slug')
  @Public(true)
  async findOne(@Param('slug') slug: string) {
    const post = await this.postsService.findBySlug(slug);
    if (!post) {
      throw new NotFoundException();
    } else {
      return this.postsService.findBySlug(slug);
    }
  }

  @Post()
  @CheckPolicies(CreatePostHandler)
  async create(@Body() createPostDto: CreatePostDto, @ReqUser() author: User) {
    createPostDto.author = author;
    return {slug: await this.postsService.create(createPostDto)};
  }

  @Put(':slug')
  @CheckPolicies(EditPostHandler)
  async update(@Body() updatePostDto: UpdatePostDto, @PostEntityDecorator() postToUpdate: PostEntity) {
    return await this.postsService.update(postToUpdate, updatePostDto);
  }

  @Delete(':slug')
  @CheckPolicies(RemovePostHandler)
  async delete(@PostEntityDecorator() postToDelete: PostEntity) {
    const removed = await this.postsService.remove(postToDelete);
    if (removed) return;
    else throw new InternalServerErrorException();
  }

}
