import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger, HttpException } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    if (ctx.getType() === 'http') {
      this.logger.setContext(ctx.getClass().name);
      const req = ctx.switchToHttp().getRequest<Request>();
      const method = req.method;
      const url = req.url;

      return next.handle().pipe(
        tap(() => {
          this.logger.log(`${method} ${url}`);
        }),
        catchError(err => {
          if (err instanceof HttpException) {
            this.logger.log(`(${err.getStatus()}) ${method} ${url}`);
          }
          return next.handle();
        })
      );
    }
    return next.handle();
  }
}
