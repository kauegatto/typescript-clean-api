import { EmailValidator } from '../presentation/interfaces/EmailValidator';
import { EmailValidatorAdapter } from './EmailValidatorAdapter';

describe('Validator Library Adapter', () => {
  const ValidatorStubFactory = (): EmailValidator => {
    return new class implements EmailValidator {
      isValid (email: string): boolean {
        return true;
      }
    }();
  }
  const EmailValidatorAdapterFactory = (validator: EmailValidator): EmailValidatorAdapter => {
    return new EmailValidatorAdapter(validator);
  };
  const makeSut = (): { adapter: EmailValidatorAdapter, validator: EmailValidator } => {
    const validator = ValidatorStubFactory();
    const adapter = EmailValidatorAdapterFactory(validator);
    return { adapter, validator };
  };
  test('Should pass the right values to validator', () => {
    const { adapter, validator } = makeSut();
    const validatorSpy = jest.spyOn(validator, 'isValid');
    adapter.isValid('valid_email@email.com');
    expect(validatorSpy).toBeCalledWith('valid_email@email.com');
  });
  test('Should return false if validator returns false', () => {
    const { adapter, validator } = makeSut();
    jest.spyOn(validator, 'isValid').mockReturnValueOnce(false);
    const isValid: boolean = adapter.isValid('invalid_email');
    expect(isValid).toBe(false);
  });
})
