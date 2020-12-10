
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'sqlite',
  database: 'my-db.sqlite3',
  synchronize: false,
  migrationsTableName: 'db_migrations',
  migrationsRun: false,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  cli: {
    migrationsDir: './migrations',
  }
}

export = config;
