import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger, HttpException } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    if (ctx.getType() === 'http') {
      const req = ctx.switchToHttp().getRequest<Request>();
      const method = req.method;
      const url = req.url;

      return next.handle().pipe(
        tap(() => {
          Logger.log(`${method} ${url}`, ctx.getClass().name);
        }),
        catchError(err => {
          if (err instanceof HttpException) {
            Logger.log(`(${err.getStatus()}) ${method} ${url}`, ctx.getClass().name);
          }
          return next.handle();
        })
      );
    }
    return next.handle();
  }
}
