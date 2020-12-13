
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig';

export default () => {
  let config: TypeOrmModuleOptions = {
    ...ormconfig,
    autoLoadEntities: true
  }
  return config;
}
