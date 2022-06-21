import { InferType } from "yup";
import { User } from "@/types";
import { ProfileEditSchema } from "./schemas";

export type Props = {
    user: User;
}

export type UserInfoForm = {
    profile: Pick<User,
        'first_name' |
        'second_name' |
        'login' |
        'email' |
        'phone'
    > & {
        display_name: string
    },
    avatar: null | string | File
}

export type ProfileEditFormType = InferType<typeof ProfileEditSchema>;
