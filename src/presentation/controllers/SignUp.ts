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
    return {
      statusCode: 201,
      body: {
        message: 'created user'
      }
    }
  }
}
