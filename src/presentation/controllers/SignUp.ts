import { MissingParamError } from '../errors/MissingParamError';
import HttpRequest from '../interfaces/protocols/HttpRequest';
import HttpResponse from '../interfaces/protocols/HttpResponse';
import { HttpHelper } from '../helpers/HttpHelper';
import { ControllerBase } from '../interfaces/ControllerBase';
import { InvalidParamError } from '../errors/InvalidParamError';
import { EmailValidator } from '../interfaces/EmailValidator';
import { AddAccount, AddAccountModel } from '../../domain/usecases/AddAccount';

export class SignUpController implements ControllerBase {
  private readonly _emailValidator: EmailValidator;
  private readonly _addAccount: AddAccount;

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this._emailValidator = emailValidator;
    this._addAccount = addAccount;
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields: string[] = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return HttpHelper.badRequest(new MissingParamError(field))
        }
      }
      if (!(httpRequest.body.password === httpRequest.body.passwordConfirmation)) {
        return HttpHelper.badRequest(new InvalidParamError('password and password confirmation'));
      }
      if (!this._emailValidator.isValid(httpRequest.body.email)) {
        return HttpHelper.badRequest(new InvalidParamError('email'))
      }
      const account = this._addAccount.add({
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        password: httpRequest.body.password
      })
      return HttpHelper.created<AddAccountModel>(account);
    } catch {
      return HttpHelper.internalServerError();
    }
  }
}
