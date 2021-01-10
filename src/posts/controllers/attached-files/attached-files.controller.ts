import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Res
} from '@nestjs/common';
import { Response } from 'express';

import { AttachedFilesService } from '@Posts/services/attached-files.service';
import { PostEntity as PostEntityDecorator } from '@Posts/decorators/post-entity.decorator';
import { Post as PostEntity } from '@Posts/entities/post.entity';

import { JwtAuthGuard } from '@Auth/guards/jwt-auth.guard';
import { Public } from '@Auth/decorators/public.decorator';

import { Acl } from '@Acl/decorators/acl.decorator';
import { CheckPolicies } from '@Acl/decorators/check-policies.decorator';
import { DetachFileHandler } from '@Acl/policies';

@Controller('posts/:slug/files')
@Acl(JwtAuthGuard)
export class AttachedFilesController {

  constructor(private attachedFilesService: AttachedFilesService) {}

  @Delete(':file_id')
  @CheckPolicies(DetachFileHandler)
  async detachFile(@Param('file_id') fileId: number, @PostEntityDecorator() post: PostEntity) {
    const detached = await this.attachedFilesService.detachFile(fileId, post);
    if (!detached) throw new InternalServerErrorException('An error occurred while trying to detach the file');
  }

  @Get(':file_id')
  @Public(true)
  async downloadFile(@Param('file_id') fileId: number, @PostEntityDecorator() post: PostEntity, @Res() res: Response) {
    const file = post.files.find(f => f.id === fileId);
    if (!file) throw new NotFoundException('File not found');
    return res.download(file.path, file.filename);
  }

}
