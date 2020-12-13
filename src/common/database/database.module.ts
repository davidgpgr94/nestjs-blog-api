
import { TypeOrmModule } from "@nestjs/typeorm";

import databaseConfig from './database.config';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [],
  useFactory: databaseConfig,
  inject: []
});
