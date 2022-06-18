import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/types';
import { SignInRequest } from './types';

const authApiService = createApi({
    reducerPath: 'authApiService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.HOST}/api/v2/auth`,
        credentials: 'include'
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
                responseHandler: 'text'
            }),
            invalidatesTags: (result, _error, _id) => result ? ['Auth'] : []
        }),
        signOut: build.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
                responseHandler: 'text'
            })
        })
    })
});

export default authApiService;
