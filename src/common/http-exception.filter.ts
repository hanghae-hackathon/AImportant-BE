import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger();
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const stack = exception.stack;

    // const log = {
    //   timestamp: new Date(),
    //   url: request.url,
    //   response,
    //   stack,
    // };
    // loggerService.error('error', log.stack, 'error');

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';

    // const message = exception.message;

    // 내부 서버 오류인 경우에만 추가 정보를 포함하여 반환합니다.
    const errorResponse = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      // 에러 스택이 클라이언트에게 전송되지 않도록 주석 처리합니다.
      error: exception.message,
    };
    this.logger.error(
      `status code: ${status}, error message: ${exception.message}, \n Request info: ${exception.stack}`.replace(
        /\\/,
        '',
      ),
    );
    response.status(status).json(errorResponse);
  }
}

// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   InternalServerErrorException,
//   Logger,
// } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { AppLoggingService } from '../AppLogginService';

// @Catch() // 처리되지 않은 모든 예외를 잡을 때 사용
// export class HttpExceptionFilter implements ExceptionFilter {
//   // constructor(private logger: Logger) {}

//   catch(exception: Error, host: ArgumentsHost) {
//     const loggerService = new AppLoggingService();
//     const ctx = host.switchToHttp();
//     const res = ctx.getResponse<Response>();
//     const req = ctx.getRequest<Request>();
//     const stack = exception.stack;

//     // 우리가 다루는 대부분의 예외는 이미 NestJS 에서 HttpException 을 상속받는 클래스들로 제공하므로 HttpException 이 아닌
//     // 예외는 알 수 없는 에러이다. 따라서 이를 InternalServerErrorException 으로 처리
//     if (!(exception instanceof HttpException)) {
//       exception = new InternalServerErrorException();
//     }

//     const response = (exception as HttpException).getResponse();

//     const log = {
//       timestamp: new Date(),
//       url: req.url,
//       response,
//       stack,
//     };
//     loggerService.error('error', log.stack, 'error');

//     res.status((exception as HttpException).getStatus()).json(response);
//   }
// }

// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
// } from '@nestjs/common';
// import { trace } from 'console';
// import { errorMonitor } from 'events';
// import { Request, Response } from 'express';
// import { AppLoggingService } from '../AppLogginService';
// import { logger } from '../logger';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const loggerService = new AppLoggingService();

//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();
//     const error = exception.getResponse() as
//       | string
//       | { error: string; statusCode: number; message: string | string[] };

//     // typeof error);

//     if (typeof error === 'string') {
//       loggerService.error(error, '', error);
//       // error(message: string, trace: string, context: string) {
//       //   logger.error(message, { stack: trace, context });
//       // }
//       response.status(status).json({
//         success: false,
//         timestamp: new Date().toISOString(),
//         path: request.url,
//         error,
//       });
//     } else {
//       //onsole.log(request);
//       //console.log(response);
//       // console.log('-----');
//       // console.log(exception.stack);
//       // console.log('-----');
//       // const tempUrl = req.method + ' ' + req.baseUrl;
//       // const _headers = JSON.stringify(req.headers ? req.headers : {});
//       // const _query = JSON.stringify(req.query ? req.query : {});
//       // const _body = JSON.stringify(req.body ? req.body : {});
//       // const _url = JSON.stringify(tempUrl ? tempUrl : {});
//       // console.log('loggerService');
//       // loggerService.log(
//       //   `${_url} ${_headers} ${_query} ${_body}`.replace(/\\/, ''),
//       //   '',
//       // );

//       //1. status code => error 안에
//       //2. error message
//       //3. 요청 정보
//       loggerService.error(
//         `status code: ${error.statusCode}, error message: ${exception.message}, Request info: ${exception.stack}`.replace(
//           /\\/,
//           '',
//         ),
//         '',
//         '',
//       );
//       //loggerService.error(exception.message, '', '');
//       response.status(status).json({
//         success: false,
//         timestamp: new Date().toISOString(),
//         ...error,
//       });
//     }
//   }
// }
