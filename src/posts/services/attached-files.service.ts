
import { Injectable } from '@nestjs/common';

import { AttachedFileDto } from '@Posts/dtos/attached-file.dto';
import { Post } from '@Posts/entities/post.entity';
import { AttachedFile } from '@Posts/entities/attached-file.entity';
import { AttachedFileRepository } from '@Posts/repositories/attached-file.repository';

@Injectable()
export class AttachedFilesService {

  constructor(private attachedFileRepository: AttachedFileRepository) {}

  async attachFilesToPost(files: AttachedFileDto[], post: Post) {
    const filesToSave: AttachedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file: AttachedFile = this.attachedFileRepository.create(files[i]);
      file.post = post;
      filesToSave.push(file);
    }
    return await this.attachedFileRepository.save(filesToSave);
  }

}
