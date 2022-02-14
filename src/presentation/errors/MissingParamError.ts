export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Invalid parameter: ${paramName}`)
  }
}
