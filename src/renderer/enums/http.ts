export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum ContentTypeEnum {
  JSON = 'application/json; charset=utf-8',
  TEXT = 'text/plain; charset=utf-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded; charset=utf-8',
  FORM_DATA = 'multipart/form-data; charset=utf-8'
}
