import { MissingParamError } from '../errors/MissingParamError';
import HttpRequest from '../interfaces/protocols/HttpRequest';
import HttpResponse from '../interfaces/protocols/HttpResponse';
import { HttpHelper } from '../helpers/HttpHelper';

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return HttpHelper.badRequest(new MissingParamError('name'));
    }
    if (!httpRequest.body.email) {
      return HttpHelper.badRequest(new MissingParamError('email'));
    }
    if (!httpRequest.body.password) {
      return HttpHelper.badRequest(new MissingParamError('password'));
    }
    if (!httpRequest.body.passwordConfirmation) {
      return HttpHelper.badRequest(new MissingParamError('password confirmation'));
    }
    if (!(httpRequest.body.password === httpRequest.body.passwordConfirmation)) {
      return HttpHelper.badRequest(new Error('password and passwor confirmation are different'));
    }

    return HttpHelper.created<string>(httpRequest.body);

    // should be: return HttpHelper.created<User> when domain entity is created
  }
}
