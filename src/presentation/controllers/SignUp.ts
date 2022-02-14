export class SignUpController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Name is missing')
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Email is missing')
      };
    }
    if (!httpRequest.body.password) {
      return {
        statusCode: 400,
        body: new Error('Password is missing')
      };
    }
    if (!httpRequest.body.passwordConfirmation) {
      return {
        statusCode: 400,
        body: new Error('Password confirmation is missing')
      };
    }
    if (!(httpRequest.body.password === httpRequest.body.passwordConfirmation)) {
      return {
        statusCode: 400,
        body: new Error('Password and password confirmatin are different')
      };
    }
    return {
      statusCode: 201,
      body: {
        message: 'created user'
      }
    }
  }
}
