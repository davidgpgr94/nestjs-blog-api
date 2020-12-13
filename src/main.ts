
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { text as figletText } from 'figlet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(`Application running on port ${port}`, 'Main');

  figletText('BlogApi', { font: 'ANSI Shadow' }, (err, data) => {
    if (err) return;
    Logger.log('\n' + data, 'Main', false);
  });
}
bootstrap();
