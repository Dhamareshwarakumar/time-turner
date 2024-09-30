// Success Codes
export const OK = 200;
export const CREATED = 201;

// Client Errors
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const UNPROCESSABLE_ENITITY = 422;
export const TOO_MANY_REQUESTS = 429;

// Server Errors
export const INTERNAL_SERVER_ERROR = 500;
export const SERVICE_UNAVAILABLE = 503;

export type THTTPCodes = 200 | 201 | 400 | 401 | 403 | 404 | 422 | 500 | 503;
