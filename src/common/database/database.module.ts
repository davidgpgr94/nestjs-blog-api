import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfigModule, ConfigService } from "@nestjs/config";
import databaseConfig from './database.config';


export const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: databaseConfig,
  inject: [ConfigService]
});
