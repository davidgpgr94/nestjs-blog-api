
import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { DetachFileHandler } from '@Acl/policies/attached-files/detach-file-policy.handler';

export const DetachFilePolicyProvider: Provider = {
  provide: DetachFileHandler,
  inject: [ REQUEST ],
  useFactory: (req: Request) => {
    if (!req.post) return new DetachFileHandler(undefined);

    const fileId = parseInt(req.params.file_id);
    const file = req.post.files.find(file => file.id === fileId);
    file.post = req.post;
    return new DetachFileHandler(file);
  }
}
