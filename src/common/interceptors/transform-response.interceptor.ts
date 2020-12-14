import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface BaseResponse<T> {
  data: T;
}

export interface ArrayResponse<T> extends BaseResponse<Array<T>> {
  total: number;
}

type Response<T> = BaseResponse<T> | ArrayResponse<T>;

export class TransformResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        if (data instanceof Array) return { data, total: data.length };
        else return { data };
      })
    );
  }
}
