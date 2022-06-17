import { RoutePaths } from "@/enums";
import { Route } from "@/types";

export const routes: Route[] = [
    {
        name: "Sign In",
        path: `/${RoutePaths.signIn}`,
    },
    {
        name: "Sign Up",
        path: `/${RoutePaths.signUp}`,
    },
];
