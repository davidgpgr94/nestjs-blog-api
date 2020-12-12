
import { join } from 'path';

const config = {
  synchronize: false,
  migrationsTableName: 'db_migrations',
  migrationsRun: false,
  migrations: [join(__dirname, '..', '..', '..', 'migrations/**/*{.ts,.js}')],
  entities: [join(__dirname, '..', '..', '/**/*.entity{.ts,.js}')],
  cli: {
    migrationsDir: './migrations',
  }
}

export = config;
