

import { IDbErrorCodes, IDbErrors } from './database-errors.interface';

export const SqliteErrorCode: IDbErrorCodes = {
  UniqueViolation: 19
}

export const SqliteErrors: IDbErrors = {
  UniqueViolation: 'SQLITE_CONSTRAINT'
}
