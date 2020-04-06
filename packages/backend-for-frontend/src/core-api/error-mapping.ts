import {
  HttpException,
  HttpStatus,
  NotImplementedException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  MethodNotAllowedException,
  NotAcceptableException,
  RequestTimeoutException,
  ConflictException,
  GoneException,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
  UnprocessableEntityException,
  InternalServerErrorException,
  BadGatewayException,
  ServiceUnavailableException,
  GatewayTimeoutException,
} from '@nestjs/common'
import { isEmpty } from 'lodash'

const ErrorsMap = {
  //Mapeos a mismo excepcion
  //400's
  [HttpStatus.BAD_REQUEST]: new BadRequestException(), //400
  [HttpStatus.UNAUTHORIZED]: new UnauthorizedException(), //401
  [HttpStatus.PAYMENT_REQUIRED]: new HttpException('Payment required', HttpStatus.PAYMENT_REQUIRED), //402
  [HttpStatus.FORBIDDEN]: new ForbiddenException(), //403
  [HttpStatus.NOT_FOUND]: new NotFoundException(), //404
  [HttpStatus.METHOD_NOT_ALLOWED]: new MethodNotAllowedException(), //405
  [HttpStatus.NOT_ACCEPTABLE]: new NotAcceptableException(), //406
  [HttpStatus.PROXY_AUTHENTICATION_REQUIRED]: new HttpException(
    'Proxy authentication required',
    HttpStatus.PROXY_AUTHENTICATION_REQUIRED
  ), //407
  [HttpStatus.REQUEST_TIMEOUT]: new RequestTimeoutException(), //408
  [HttpStatus.CONFLICT]: new ConflictException(), //409
  [HttpStatus.GONE]: new GoneException(), //410
  [HttpStatus.LENGTH_REQUIRED]: new HttpException('Length rquired', HttpStatus.LENGTH_REQUIRED), //411
  [HttpStatus.PRECONDITION_FAILED]: new HttpException('Precondition failed', HttpStatus.PRECONDITION_FAILED), //412
  [HttpStatus.PAYLOAD_TOO_LARGE]: new PayloadTooLargeException(), //413
  [HttpStatus.URI_TOO_LONG]: new HttpException('Uri too long', HttpStatus.URI_TOO_LONG), //414
  [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: new UnsupportedMediaTypeException(), //415
  [HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE]: new HttpException(
    'Requested range not satisfiable',
    HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE
  ), //416
  [HttpStatus.EXPECTATION_FAILED]: new HttpException('Expectation failed', HttpStatus.EXPECTATION_FAILED), //417
  [HttpStatus.I_AM_A_TEAPOT]: new HttpException('i am a teaport', HttpStatus.I_AM_A_TEAPOT), //418
  [HttpStatus.UNPROCESSABLE_ENTITY]: new UnprocessableEntityException(), //422
  [HttpStatus.TOO_MANY_REQUESTS]: new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS), //429

  //500's
  [HttpStatus.INTERNAL_SERVER_ERROR]: new InternalServerErrorException(), //500
  [HttpStatus.BAD_GATEWAY]: new BadGatewayException(), //502
  [HttpStatus.SERVICE_UNAVAILABLE]: new ServiceUnavailableException(), //503
  [HttpStatus.GATEWAY_TIMEOUT]: new GatewayTimeoutException(), //504
  [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: new HttpException(
    'Http version not supported',
    HttpStatus.HTTP_VERSION_NOT_SUPPORTED
  ), //505

  //Mapeos a excepciones diferentes
  [HttpStatus.NOT_IMPLEMENTED]: new InternalServerErrorException(), //501 -> 500
}

export const getExceptionFromStatusCode = (errorCode: number, coreErrorData?: any): HttpException => {
  const error = ErrorsMap[errorCode]
  if (isEmpty(error)) {
    return new HttpException('Error interno', errorCode)
  }
  if (coreErrorData) {
    const { stacktrace, token, ...coreError } = coreErrorData
    error.coreError = coreError
  }
  return error
}
