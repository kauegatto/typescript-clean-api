import { SignUpController } from '../../../presentation/controllers/SignUp';

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided ', () => {
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
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
  test('Should return 400 if email provided is invalid', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'JaneDoeEmail.mail',
        password: 'any_password',
        passwordConfirmation: 'another pass'
      }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  })
  test('Should return 201 if valid body is provided ', () => {
    const sut = makeSut();
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
