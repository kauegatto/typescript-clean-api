import HttpResponse from '../interfaces/protocols/HttpResponse'

export class HttpHelper { // no keyword for final, using private constructor instead
  private constructor () {}
  public static badRequest (error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error
    }
  }

  public static unauthorized (error: Error): HttpResponse {
    return {
      statusCode: 401,
      body: error
    }
  }

  public static ok (message: string): HttpResponse {
    return {
      statusCode: 200,
      body: message
    }
  }

  public static noContent (message: string): HttpResponse {
    return {
      statusCode: 204,
      body: message
    }
  }

  public static created<T> (entity: T): HttpResponse {
    return {
      statusCode: 201,
      body: entity
    }
  }

  public static internalServerError (): HttpResponse {
    return {
      statusCode: 500,
      body: 'internal server error'
    }
  }
}
