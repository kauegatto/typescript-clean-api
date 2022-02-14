import { SignUpController } from '../../../presentation/controllers/SignUp';
import { EmailValidatorAdapter } from '../../../presentation/interfaces/EmailValidatorAdapter';

interface SutTypes {
  sut: SignUpController
  emailValidator: EmailValidatorAdapter
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidatorAdapter {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);
  return {
    sut, // equals to sut: sut
    emailValidator: emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided ', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: '',
        email: 'email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test('Should return 400 if no email is provided ', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: '',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test('Should return 400 if no password is provided ', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'email@gmail.com',
        password: '',
        passwordConfirmation: 'pass'
      }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test('Should return 400 if no password confirmation is provided ', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'email@gmail.com',
        password: 'any_password',
        passwordConfirmation: ''
      }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test('Should return 400 if password and password and password confirmation are different ', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'another pass'
      }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test('Should return 400 if invalid email is provided', () => {
    const { sut, emailValidator } = makeSut();
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false);
    // boa prática : iniciar mock como true e mockar valor falso onde quiser que falhe.
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'JaneDoeEmail.mail',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test('Should call emailValidator.isValid with correct email ', () => {
    const { sut, emailValidator } = makeSut();
    const isValidSpy = jest.spyOn(emailValidator, 'isValid');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'jorge@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toBeCalledWith('jorge@gmail.com');
  });
  test('Should return 201 if valid body is provided ', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
  });
});
