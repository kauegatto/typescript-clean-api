import { MissingParamError } from '../errors/MissingParamError';
import HttpRequest from '../interfaces/protocols/HttpRequest';
import HttpResponse from '../interfaces/protocols/HttpResponse';
import { HttpHelper } from '../helpers/HttpHelper';
import { ControllerBase } from '../interfaces/ControllerBase';
import { InvalidParamError } from '../errors/InvalidParamError';

export class SignUpController implements ControllerBase {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields: string[] = ['name', 'email', 'password', 'passwordConfirmation'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return HttpHelper.badRequest(new MissingParamError(field))
      }
    }
    if (!(httpRequest.body.password === httpRequest.body.passwordConfirmation)) {
      return HttpHelper.badRequest(new InvalidParamError('password and password confirmation'));
    }
    return HttpHelper.created<string>(httpRequest.body);

    // should be: return HttpHelper.created<User> when domain entity is created
  }
}
