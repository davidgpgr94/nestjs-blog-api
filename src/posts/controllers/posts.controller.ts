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
  InternalServerErrorException,
  SerializeOptions,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';


import { CreatePostDto } from '@Posts/dtos/create-post.dto';
import { UpdatePostDto } from '@Posts/dtos/update-post.dto';
import { PostsService } from '@Posts/services/posts.service';
import { Post as PostEntity } from '@Posts/entities/post.entity';
import { PostEntity as PostEntityDecorator } from '@Posts/decorators/post-entity.decorator';
import { FilesUploaded } from '@Posts/decorators/files-uploaded.decorator';
import { PostExposeGroups } from '@Posts/enums/post-expose-groups.enum';
import { AttachedFileDto } from '@Posts/dtos/attached-file.dto';

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
  @SerializeOptions({
    groups: [ PostExposeGroups.FULL ]
  })
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
  @UseInterceptors(FilesInterceptor('files'))
  @SerializeOptions({
    groups: [ PostExposeGroups.FULL ]
  })
  async create(@Body() createPostDto: CreatePostDto, @ReqUser() author: User, @FilesUploaded(AttachedFileDto) files: AttachedFileDto[]) {
    createPostDto.author = author;
    createPostDto.files = files;
    const postCreated = await this.postsService.create(createPostDto);
    return postCreated;
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
