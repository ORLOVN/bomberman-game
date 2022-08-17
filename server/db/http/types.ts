export type ErrorResponse = {
    reason: string;
};

export enum Methods {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

export type IFormData = Record<string, unknown> | FormData;
