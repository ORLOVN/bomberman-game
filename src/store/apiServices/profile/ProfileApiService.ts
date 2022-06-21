import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { UserInfoForm } from '@/pages/Profile/components/ProfileEditForm/types';
import { PasswordEditFormType } from '@/pages/Profile/components/PasswordEditForm';

import { UpdateUserResponse } from './types';

const profileApiService = createApi({
    reducerPath: 'profileApiService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.HOST}/user`,
        credentials: 'include',
    }),
    endpoints: (build) => ({
        updateAvatar: build.mutation<UpdateUserResponse, FormData>({
            query: (formData: FormData) => ({
                url: '/profile/avatar',
                method: 'PUT',
                body: formData,
            }),
        }),
        updateProfile: build.mutation<UpdateUserResponse, UserInfoForm['profile']>({
            query: (credentials) => ({
                url: '/profile',
                method: 'PUT',
                body: credentials,
            }),
        }),
        updatePassword: build.mutation<
            void,
            Pick<PasswordEditFormType, 'oldPassword' | 'newPassword'>
        >({
            query: (credentials) => ({
                url: '/password',
                method: 'PUT',
                body: credentials,
                responseHandler: (response) => (
                    response.ok
                        ? response.text()
                        : response.json()
                ),
            }),
        })
    })
});

export default profileApiService;
