import Http from '../http/http-service';

import BaseApi from '../http/base-api';
import { ErrorResponse } from '../http/types';

import { User } from '@/types';

export type YaUserInfoResponse = User;

const yaUserInfoHttpInstance =  new Http(`${process.env.YANDEX_API_HOST}/api/v2/user`);

export class YaUserInfoService extends BaseApi {
    public find(yaId: number): Promise<YaUserInfoResponse | ErrorResponse> {
        return yaUserInfoHttpInstance.get<
            YaUserInfoResponse | ErrorResponse
        >(`/${yaId}`, this.data as undefined, this.options);
    }
}