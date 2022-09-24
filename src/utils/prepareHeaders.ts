import { Request } from "express";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

export const prepareHeaders = (
  headers: Headers,
  api: Pick<BaseQueryApi, "extra" | "getState" | "endpoint" | "type" | "forced">
) => {
  let req: Request | undefined;
  if (api.extra) {
    req = (api.extra as { request: Request }).request;
  }
  if (req) {
    const cookies = req.headers.cookie || "";
    headers.set("Cookie", cookies);
  }
  return headers;
};
