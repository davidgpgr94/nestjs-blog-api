
import { Module, BadRequestException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { Env } from '@Common/env-variables';

import { FileConstants } from './constants';
import { destPath, finalFilename } from './utils';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          storage: diskStorage({
            destination: (req, file, next) => {
              const rootFolder = configService.get<string>(Env.FILES_DEST, FileConstants.defaultRootFolder)
              let finalDest = rootFolder;
              try {
                finalDest = destPath(rootFolder);
              } catch (err) {
                console.error(err);
              }
              next(null, finalDest);
            },
            filename: (req, file, next) => {
              const filename: string = finalFilename(file.originalname);
              next(null, filename);
            }
          }),
          limits: {
            fileSize: configService.get<number>(Env.MAX_FILE_SIZE, FileConstants.defaultMaxFileSize)
          },
          fileFilter: (req, file, next) => {
            if (FileConstants.mimetypes.some((mime) => mime == file.mimetype)) {
              next(null, true);
            } else {
              next(new BadRequestException(`${file.originalname} - Invalid mime-type`), false);
            }
          }
        }
      }
    })
  ],
  exports: [MulterModule]
})
export class FilesUploadModule {}
