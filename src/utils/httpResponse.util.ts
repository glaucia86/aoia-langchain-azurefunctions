import { HttpResponseInit } from "@azure/functions";

export function ok(body: object): HttpResponseInit {
  return {
    status: 200,
    jsonBody: body
  };
}

export function badRequest(error: string): HttpResponseInit {
  return {
    status: 400,
    jsonBody: {
      error
    }
  };
}

export function notFound(error: string): HttpResponseInit {
  return {
    status: 404,
    jsonBody: {
      error
    }
  };
}

export function internalServerError(error: string): HttpResponseInit {
  return {
    status: 500,
    jsonBody: {
      error
    }
  };
}