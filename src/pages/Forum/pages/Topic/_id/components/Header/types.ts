import { Topic } from "@/types";

export type HeaderProps = Omit<
    Topic,
    'comments' | 'id' | 'avatar'
> & { avatar: string }
