
import { IDbErrorCodes, IDbErrors } from './database-errors.interface';
import { MySQLErrorCodes, MySQLErrors } from './mysql-errors.enum';
import { SqliteErrorCode, SqliteErrors } from './sqlite-errors.enum';

import * as ormconfig from '@AppRoot/ormconfig';

export const DbErrors: IDbErrors = (ormconfig.type === 'mysql') ? MySQLErrors : SqliteErrors;
export const DbErrorCodes: IDbErrorCodes = (ormconfig.type === 'mysql') ? MySQLErrorCodes : SqliteErrorCode;
