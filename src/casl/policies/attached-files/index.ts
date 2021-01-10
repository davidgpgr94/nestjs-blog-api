
import { Type } from '@nestjs/common';

import { PolicyHandler } from '../policy-handler.interface';

import { DetachFileHandler } from './detach-file-policy.handler';

export * from './detach-file-policy.handler';

export const attachedFilesPolicies: Type<PolicyHandler>[] = [
  DetachFileHandler
]
