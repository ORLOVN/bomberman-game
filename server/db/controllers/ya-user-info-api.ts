import { ErrorResponse } from '../http/types';
import { YaUserInfoResponse, YaUserInfoService } from '../services/ya-user-info-service';

const yaUserInfoService = new YaUserInfoService();

export default class YaUserInfoAPI {
    static getInfo(
        yaId: number,
        cookie: Record<string, string>
    ): Promise<YaUserInfoResponse | never> {
        return yaUserInfoService
            .withOptions(getRequestHeaders(cookie))
            .find(yaId)
            .then((response: YaUserInfoResponse | ErrorResponse) => {
                if (isErrorResponse(response)) {
                    throw new Error(response.reason);
                }

                return response;
            });
    }
}

function isErrorResponse(
    response: Record<string, unknown>
): response is ErrorResponse {
    return Boolean(response?.reason);
}

function getRequestHeaders(cookie:  Record<string, string>): RequestInit {
    const cookieStr = Object.entries(cookie)
        .reduce((result, [key, val]) => {
            return `${result}; ${key}=${val}`
        }, '')
        .slice(2);

    return {
        mode: 'cors',
        credentials: 'include',
        headers: {
            Cookie: cookieStr
        }
    };
}
