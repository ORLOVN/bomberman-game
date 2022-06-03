import AuthError from '@/api/auth-error-service';
import {IFormData, Methods} from '@/api/types';
import queryStringify from '@/api/utils';

export default class Http {
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(baseUrl: string, timeout: number = 8000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  public get<T>(url: string, body?: Record<string, unknown>, options?: RequestInit): Promise<T | null> {
    const processedUrl = body ? url + queryStringify(body) : url;

    return this.request<T>(processedUrl, undefined, options);
  }

  public put<T>(url: string, body?: IFormData, options?: RequestInit): Promise<T | null> {
    return this.request<T>(url, body, options, Methods.PUT);
  }

  public post<T>(url: string, body?: IFormData, options?: RequestInit): Promise<T | null> {
    return this.request<T>(url, body, options, Methods.POST);
  }

  public delete<T>(url: string, options?: RequestInit): Promise<T | null> {
    return this.request<T>(url, undefined, options, Methods.DELETE);
  }

  private async request<T>(
    url: string,
    body?: IFormData,
    options: RequestInit = {},
    method: Methods = Methods.GET,
  ): Promise<T | null> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.timeout);

    options.headers = {
      ...options.headers || {},
      ...getContentTypeForRequest(body),
    };

    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      body: body ? prepareBodyForRequest(body) : null,
      method,
      signal: controller.signal,
    });

    clearTimeout(id);

    if (response.status === 401) {
      throw new AuthError('Unauthorized');
    }

    if (!isResponseJson(response)) {
      return Promise.resolve(null);
    }

    return response.json();
  }
}

function getContentTypeForRequest(body?: IFormData): Record<string, string> {
  if (body instanceof FormData || !body) {
    return {};
  }

  return {
    'Content-Type': 'application/json',
  };
}

function prepareBodyForRequest(body: IFormData): FormData | string {
  return body instanceof FormData ? body : JSON.stringify(body);
}

function isResponseJson(response: Response): boolean {
  const contentType = response.headers.get('content-type');

  return Boolean(contentType?.includes('application/json'));
}
