import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";;

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errorInfo = exception ? exception.response : '';

    const errorResponse: any = { error: true }
    if (exception instanceof HttpException) {
      errorResponse.statusCode = exception.getStatus();

      if (errorInfo && typeof errorInfo == 'string')
        errorResponse.message = errorInfo
      else if (errorInfo?.message)
        errorResponse.message = Array.isArray(errorInfo.message) ? errorInfo.message[0] : errorInfo.message;
      else
        errorResponse.message = 'System failed to handle your request, please try again later'
    }

    else {
      errorResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse.message = 'System failed to handle your request, please try again later';

    }

    response
      .status(errorResponse.statusCode)
      .json(errorResponse);
  }
}
