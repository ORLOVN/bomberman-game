import { RoutePaths } from "@/enums";
import { Route } from "@/types";

export const routes: Route[] = [
    {
        name: "Home",
        path: `${RoutePaths.home}`,
    },
    {
        name: "Profile",
        path: `/${RoutePaths.profile}`,
    },
    {
        name: "Forum",
        path: `/${RoutePaths.forum}`,
    },
];
