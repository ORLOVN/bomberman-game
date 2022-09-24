export type SignInRequest = {
  login: string;
  password: string;
};

export type OauthYandexRequest = {
  code: string;
  redirect_uri: string;
};

export type getOauthClientIdResponse = {
  service_id: string;
};
