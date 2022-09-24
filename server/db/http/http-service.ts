import AuthError from "./auth-error-service";
import { Methods, IFormData } from "./types";
import queryStringify from "./utils";
import fetch from "isomorphic-fetch";

export default class Http {
  private readonly baseUrl: string;

  private readonly timeout: number;

  constructor(baseUrl: string, timeout: number = 8000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  public get<T>(
    url: string,
    data?: Record<string, unknown>,
    options?: RequestInit
  ): Promise<T> {
    const stringData = data ? queryStringify(data) : null;
    const processedUrl = stringData ? url + stringData : url;

    return this.request<T>(processedUrl, undefined, options);
  }

  public put<T>(
    url: string,
    data?: IFormData,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(url, data, options, Methods.PUT);
  }

  public post<T>(
    url: string,
    data?: IFormData,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(url, data, options, Methods.POST);
  }

  public delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, undefined, options, Methods.DELETE);
  }

  private async request<T>(
    url: string,
    data?: IFormData,
    options?: RequestInit,
    method: Methods = Methods.GET
  ): Promise<T> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.timeout);

    const response = await fetch(`${this.baseUrl}${url}`, {
      ...(options || {}),
      method,
      headers: {
        ...(options?.headers || {}),
        ...(data ? prepareHeadersForRequest(data) : {}),
      },
      body: data ? prepareBodyForRequest(data) : null,
      signal: controller.signal,
    });

    clearTimeout(id);

    if (response.status === 401) {
      throw new AuthError("Unauthorized");
    }

    if (!isResponseJson(response)) {
      // @ts-ignore
      return Promise.resolve(null);
    }

    return response.json();
  }
}

function prepareBodyForRequest(data: IFormData): FormData | string {
  return data instanceof FormData ? data : JSON.stringify(data);
}

function prepareHeadersForRequest(data: IFormData): Record<string, string> {
  return data instanceof FormData
    ? {}
    : {
        "Content-Type": "application/json",
      };
}

function isResponseJson(response: Response): boolean {
  const contentType = response.headers.get("content-type");

  return Boolean(contentType?.includes("application/json"));
}
