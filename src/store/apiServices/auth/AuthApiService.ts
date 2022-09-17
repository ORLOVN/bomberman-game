import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import fetch from 'isomorphic-fetch';
import { createApi } from "../utils"
import { User } from '@/types';
import { SignUpFormType } from '@/pages/SignUp/types';
import {prepareHeaders} from "@/utils/prepareHeaders";
import { getOauthClientIdResponse, OauthYandexRequest, SignInRequest } from './types';

const origin = SCRIPT_ENV === "server" ? `http://localhost:${process.env.PORT}` : '';

const authApiService = createApi({
    reducerPath: 'authApiService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${origin}${process.env.PROXY_API_PATH}`,
        credentials: 'include',
        fetchFn: fetch,
        prepareHeaders,
    }),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        getUserInfo: build.query<User, void>({
            query: () => ({
                url: '/auth/user'
            }),
            providesTags: ['Auth']
        }),
        getOauthClientId: build.query<getOauthClientIdResponse, string>({
            query: (redirectUrl) => ({
                url: '/oauth/yandex/service-id',
                params: { redirect_uri: redirectUrl }
            })
        }),
        oauthVerify: build.mutation<void, OauthYandexRequest>({
            query: (credentials) => ({
                url: '/oauth/yandex',
                method: 'POST',
                body: credentials,
                responseHandler: (response) => (
                    response.ok
                        ? response.text()
                        : response.json()
                ),
            }),
            invalidatesTags: (result) => result ? ['Auth'] : []
        }),
        signIn: build.mutation<void, SignInRequest>({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
                responseHandler: (response) => (
                    response.ok
                        ? response.text()
                        : response.json()
                ),
            }),
            invalidatesTags: (result) => result ? ['Auth'] : []
        }),
        signUp: build.mutation<void, Omit<SignUpFormType, 'repeat_password'>>({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials,
                responseHandler: (response) => (
                    response.ok
                        ? response.text()
                        : response.json()
                ),
            }),
            invalidatesTags: (result) => result ? ['Auth'] : []
        }),
        signOut: build.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                responseHandler: (response) => (
                    response.ok
                        ? response.text()
                        : response.json()
                ),
            })
        })
    })
});

export default authApiService;
