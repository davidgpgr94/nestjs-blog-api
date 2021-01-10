
import { Injectable, Logger } from '@nestjs/common';

import { AttachedFileDto } from '@Posts/dtos/attached-file.dto';
import { Post } from '@Posts/entities/post.entity';
import { AttachedFile } from '@Posts/entities/attached-file.entity';
import { AttachedFileRepository } from '@Posts/repositories/attached-file.repository';

import * as bfs from 'fs';
const fs = bfs.promises;

@Injectable()
export class AttachedFilesService {

  private logger: Logger;

  constructor(private attachedFileRepository: AttachedFileRepository) {
    this.logger = new Logger(AttachedFilesService.name);
  }

  async attachFilesToPost(files: AttachedFileDto[], post: Post) {
    const filesToSave: AttachedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file: AttachedFile = this.attachedFileRepository.create(files[i]);
      file.post = post;
      filesToSave.push(file);
    }
    return await this.attachedFileRepository.save(filesToSave);
  }

  async detachFile(fileId: number, post: Post) {
    let fileDetached: boolean = false;
    const file = post.files.find(f => f.id === fileId);
    try {
      if (file) await this.attachedFileRepository.remove(file);
    } catch (err) {
      this.logger.warn('An error occurred while trying to delete a file from the DB');
      console.error(err);
    }

    try {
      await fs.unlink(file.path);
      fileDetached = true;
    } catch (err) {
      this.logger.warn('An error occurred while trying to delete a file from the system');
      console.error(err);
      await this.attachedFileRepository.save(file);
    }
    return fileDetached;
  }

}
