
import { IDbErrorCodes, IDbErrors } from './database-errors.interface';


export const MySQLErrorCodes: IDbErrorCodes = {
  UniqueViolation: 1169
}

export const MySQLErrors: IDbErrors = {
  UniqueViolation: 'ER_DUP_UNIQUE'
}
