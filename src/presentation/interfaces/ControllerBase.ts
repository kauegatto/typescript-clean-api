import HttpRequest from './protocols/HttpRequest';
import HttpResponse from './protocols/HttpResponse';

export interface ControllerBase{
  handle: (httpRequest: HttpRequest) => HttpResponse
}
