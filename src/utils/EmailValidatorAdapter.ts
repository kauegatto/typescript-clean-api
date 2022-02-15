import { EmailValidator } from '../presentation/interfaces/EmailValidator';

export class EmailValidatorAdapter implements EmailValidator {
  public readonly _emailValidator: EmailValidator;
  constructor (emailValidator: EmailValidator) {
    this._emailValidator = emailValidator;
  }

  public isValid (email: string): boolean {
    if (this._emailValidator.isValid(email)) {
      return true;
    } else {
      return false;
    }
  }
}
