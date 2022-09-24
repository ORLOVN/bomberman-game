import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks";

export default function SSRNavigate({
  to,
  toComponent: Component,
  replace,
}: {
  to: string;
  toComponent: React.ComponentType<any>;
  replace: boolean;
}) {
  const isSSR = useAppSelector((state) => state.ssrMode);
  if (isSSR) {
    return <Component />;
  }
  return <Navigate to={to} replace={replace} />;
}
