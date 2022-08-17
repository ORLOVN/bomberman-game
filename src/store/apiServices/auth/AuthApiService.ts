import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import fetch from 'isomorphic-fetch';
import { User } from '@/types';
import { SignUpFormType } from '@/pages/SignUp/types';
import { SignInRequest } from './types';

const authApiService = createApi({
    reducerPath: 'authApiService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.HOST}${process.env.PROXY_API_PATH}/auth`,
        credentials: 'include',
        fetchFn: fetch,
    }),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        getUserInfo: build.query<User, void>({
            query: () => ({
                url: '/user'
            }),
            providesTags: ['Auth']
        }),
        signIn: build.mutation<void, SignInRequest>({
            query: (credentials) => ({
                url: '/signin',
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
                url: '/signup',
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
                url: '/logout',
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
