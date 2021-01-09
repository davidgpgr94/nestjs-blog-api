
import * as path from 'path';
import { createParamDecorator, ExecutionContext, Type } from '@nestjs/common';
import { Request } from 'express';

import { AttachedFileDto } from '@Posts/dtos/attached-file.dto';

export const FilesUploaded = createParamDecorator(
  (fileKlass: Type<AttachedFileDto>, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const reqfiles = req.files;
    const files: AttachedFileDto[] = []

    for (let i = 0; i < reqfiles.length; i++) {
      const reqfile = reqfiles[i];
      const file = new fileKlass();
      file.filename = reqfile.originalname;
      file.path = path.resolve(reqfile.path);
      files.push(file);
    }

    return files;
  }
);

