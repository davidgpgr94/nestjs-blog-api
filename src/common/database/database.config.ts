
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Env } from '../env-variables';
import * as ormconfig from './ormconfig';

export default (configService: ConfigService) => {
  const nodeEnv = configService.get(Env.NODE_ENV)
  let config: TypeOrmModuleOptions = undefined;
  console.log(ormconfig);
  if (nodeEnv === 'production') {
    config = {
      ...ormconfig,
      type: 'mysql',
      host: configService.get(Env.DATABASE_HOST),
      port: configService.get(Env.DATABASE_PORT),
      username: configService.get(Env.DATABASE_USER),
      password: configService.get(Env.DATABASE_PASSWORD),
      database: configService.get(Env.DATABASE_NAME)
    }
  } else {
    config = {
      ...ormconfig,
      type: 'sqlite',
      database: configService.get(Env.DATABASE_NAME)
    }
  }

  return config;
}
