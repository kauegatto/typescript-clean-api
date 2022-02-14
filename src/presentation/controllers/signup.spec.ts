import { SignUpController } from './SignUp';

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided ', () => {
    const sut = new SignUpController();
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
  test('Should return 201 if valid body is provided ', () => {
    const sut = new SignUpController();
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
