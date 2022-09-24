import Http from "../http/http-service";

import BaseApi from "../http/base-api";
import { ErrorResponse } from "../http/types";

import { User } from "@/types";

export type YaUserInfoResponse = User;
const yaUserInfoHttpInstance = new Http(`${process.env.API_URL}/user`);

export class YaUserInfoService extends BaseApi {
  public find(yaId: number): Promise<YaUserInfoResponse | ErrorResponse> {
    return yaUserInfoHttpInstance.get<YaUserInfoResponse | ErrorResponse>(
      `/${yaId}`,
      this.data as undefined,
      this.options
    );
  }
}
