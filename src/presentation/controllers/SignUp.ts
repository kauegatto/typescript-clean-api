export class SignUpController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: {
          error: 'name is missing'
        }
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: {
          error: 'email is missing'
        }
      };
    }
    if (!httpRequest.body.password) {
      return {
        statusCode: 400,
        body: {
          error: 'password is missing'
        }
      };
    }
    if (!httpRequest.body.passwordConfirmation) {
      return {
        statusCode: 400,
        body: {
          error: 'password confirmation is missing'
        }
      };
    }
    if (!(httpRequest.body.password === httpRequest.body.passwordConfirmation)) {
      return {
        statusCode: 400,
        body: {
          error: 'password and password confirmation are different'
        }
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
