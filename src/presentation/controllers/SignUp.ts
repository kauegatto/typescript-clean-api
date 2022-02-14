import { MissingParamError } from '../errors/MissingParamError';
import HttpRequest from '../interfaces/protocols/HttpRequest';
import HttpResponse from '../interfaces/protocols/HttpResponse';

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      };
    }
    if (!httpRequest.body.password) {
      return {
        statusCode: 400,
        body: new MissingParamError('password')
      };
    }
    if (!httpRequest.body.passwordConfirmation) {
      return {
        statusCode: 400,
        body: new MissingParamError('password confirmation')
      };
    }
    if (!(httpRequest.body.password === httpRequest.body.passwordConfirmation)) {
      return {
        statusCode: 400,
        body: new Error('Password and password confirmatin are different')
      };
    }
    return {
      statusCode: 201,
      body: {
        message: 'created user'
      }
    }
  }
}
