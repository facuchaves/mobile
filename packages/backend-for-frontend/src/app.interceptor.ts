import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import * as NR from 'newrelic'

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const logger = request.context.logger

    return NR.startBackgroundTransaction(context.getHandler().name, context.getClass().name, () =>
      next.handle().pipe(tap(resposeHandler, errorHandler))
    )

    function resposeHandler(value) {
      NR.endTransaction()
    }
    function errorHandler(error) {
      NR.noticeError(error)
    }
  }
}
