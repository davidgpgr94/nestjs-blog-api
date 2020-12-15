
import { ExceptionFilter, Catch, ArgumentsHost, Logger, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { Env, NodeEnvValues } from '@Common/env-variables';

interface ErrorResponse {
  statusCode: number;
  message: string;
  path?: string;
}


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  private readonly logger: Logger;

  constructor(private configService: ConfigService) {
    this.logger = new Logger(AllExceptionsFilter.name);
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest<Request>();

    let error: HttpException = exception;
    if (!(error instanceof HttpException)) {
      error = new InternalServerErrorException();
    }

    let response: ErrorResponse = {
      statusCode: error.getStatus(),
      message: error.message
    }

    const nodeEnv = this.configService.get(Env.NODE_ENV);
    if (nodeEnv !== NodeEnvValues.prod) {
      response.path = req.url;
    }

    if (nodeEnv === NodeEnvValues.dev) {
      this.logger.error(exception.toString());
    }

    res.status(response.statusCode).json(response);
  }

}
