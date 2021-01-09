
import { Repository, EntityRepository } from 'typeorm';

import { AttachedFile } from '@Posts/entities/attached-file.entity';

@EntityRepository(AttachedFile)
export class AttachedFileRepository extends Repository<AttachedFile> {}
