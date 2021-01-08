import {
  Body,
  Controller,
  Logger,
  Post
} from '@nestjs/common';

import { JwtAuthGuard } from '@Auth/guards/jwt-auth.guard';
import { ReqUser } from '@Auth/decorators/user.decorator';

import { Acl } from '@Acl/decorators/acl.decorator';
import { CheckPolicies } from '@Acl/decorators/check-policies.decorator';

import { PostEntity as PostEntityDecorator } from '@Posts/decorators/post-entity.decorator';
import { Post as PostEntity } from '@Posts/entities/post.entity';

import { CreateCommentDto } from '@Comments/dtos/create-comment.dto';
import { CommentsService } from '@Comments/services/comments.service';

import { User } from '@Users/entities/user.entity';

@Controller('posts/:slug/comments')
@Acl(JwtAuthGuard)
export class CommentsController {

  private readonly logger: Logger;

  constructor(private commentsService: CommentsService) {
    this.logger = new Logger(CommentsController.name);
  }

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto, @PostEntityDecorator() post: PostEntity, @ReqUser() author: User) {
    createCommentDto.author = author;
    return await this.commentsService.commentPost(post, createCommentDto);
  }

}
