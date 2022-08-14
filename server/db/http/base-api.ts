import { IFormData } from './types';

export default abstract class BaseApi {
    protected data?: IFormData;

    protected query?: Record<string, unknown>;

    protected options?: RequestInit;

    public withQuery(data: Record<string, unknown>): this {
        this.query = data;
        return this;
    }

    public withData(data: IFormData): this {
        this.data = data;
        return this;
    }

    public withOptions(options: RequestInit): this {
        this.options = options;
        return this;
    }
}
