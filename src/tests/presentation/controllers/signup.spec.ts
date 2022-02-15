import { SignUpController } from '../../../presentation/controllers/SignUp';
import { EmailValidatorAdapter } from '../../../presentation/interfaces/EmailValidatorAdapter';
import HttpRequest from '../../../presentation/interfaces/protocols/HttpRequest';
import AccountModel from '../../../domain/models/Account';
import { AddAccount, AddAccountModel } from '../../../domain/usecases/AddAccount';

interface SutTypes {
  sut: SignUpController
  emailValidator: EmailValidatorAdapter
  addAccountStub: AddAccount
}

const emailValidatorStubFactory = (): EmailValidatorAdapter => {
  class EmailValidatorStub implements EmailValidatorAdapter {
    isValid (email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
}
const addAccountStubFactory = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add (account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password'
      }
      return fakeAccount
    }
  }
  return new AddAccountStub();
}

const sutFactory = (): SutTypes => {
  const emailValidatorStub = emailValidatorStubFactory();
  const addAccountStub = addAccountStubFactory();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return {
    sut, // equals to sut: sut
    emailValidator: emailValidatorStub,
    addAccountStub: addAccountStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided ', () => {
    const { sut } = sutFactory();
    const httpRequest: HttpRequest = {
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
    const { sut } = sutFactory();
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
    const { sut } = sutFactory();
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
    const { sut } = sutFactory();
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
    const { sut } = sutFactory();
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
    const { sut, emailValidator } = sutFactory();
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
    const { sut, emailValidator } = sutFactory();
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
    const { sut } = sutFactory();
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
  test('Should return 500 if emailValidator throws', () => {
    const { sut, emailValidator } = sutFactory()
    jest.spyOn(emailValidator, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });
  test('should call addAccount with correct values', () => {
    const { sut, addAccountStub } = sutFactory();
    const addAccountSpy = jest.spyOn(addAccountStub, 'add');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    sut.handle(httpRequest);
    expect(addAccountSpy).toBeCalledWith({
      name: 'any_name',
      email: 'email@gmail.com',
      password: 'any_password'
    })
  });
});
