import { isRejected, Middleware } from "@reduxjs/toolkit";
import { userActions } from '../../actions'

export const unauthenticatedMiddleware: Middleware = ({
    dispatch,
}) => (next) => (action) => {
    if (isRejected(action) && action.payload?.status === 401) {
        dispatch(userActions.logout());
    }

    return next(action);
};
