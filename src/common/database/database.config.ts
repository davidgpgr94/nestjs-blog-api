
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as ormconfig from '@AppRoot/ormconfig';

export default () => {
  let config: TypeOrmModuleOptions = {
    ...ormconfig,
    autoLoadEntities: true
  }
  return config;
}
