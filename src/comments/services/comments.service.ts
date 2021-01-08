
import { Injectable } from '@nestjs/common';

import { Post } from '@Posts/entities/post.entity';

import { CreateCommentDto } from '@Comments/dtos/create-comment.dto';
import { CommentRepository } from '@Comments/repositories/comment.repository';

@Injectable()
export class CommentsService {

  constructor(private commentRepository: CommentRepository) {}

  async commentPost(post: Post, comment: CreateCommentDto) {
    const commentEntity = this.commentRepository.create(comment);
    commentEntity.post = post;
    return await this.commentRepository.save(commentEntity);
  }

}
