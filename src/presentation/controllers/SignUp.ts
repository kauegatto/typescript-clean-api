import { MissingParamError } from '../errors/MissingParamError';
import HttpRequest from '../interfaces/protocols/HttpRequest';
import HttpResponse from '../interfaces/protocols/HttpResponse';
import { HttpHelper } from '../helpers/HttpHelper';
import { ControllerBase } from '../interfaces/ControllerBase';
import { InvalidParamError } from '../errors/InvalidParamError';
import { EmailValidatorAdapter } from '../interfaces/EmailValidatorAdapter';

export class SignUpController implements ControllerBase {
  private readonly _emailValidator: EmailValidatorAdapter;
  constructor (emailValidator: EmailValidatorAdapter) {
    this._emailValidator = emailValidator;
  }

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
    try {
      if (!this._emailValidator.isValid(httpRequest.body.email)) {
        return HttpHelper.badRequest(new InvalidParamError('email'))
      }
    } catch {
      return HttpHelper.internalServerError();
    }
    return HttpHelper.created<string>(httpRequest.body);

    // should be: return HttpHelper.created<User> when domain entity is created
  }
}
