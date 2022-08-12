// @ts-nocheck
/* eslint-disable */
import React from "react";
import { Outlet } from "react-router-dom";
import { Roles } from "@/enums";
import { useAppSelector } from "@/hooks";
import SSRNavigate from "@/components/SSRNavigate";

export default function ProtectedLayout({
  layout: Layout,
  allowedRoles,
  fallbackLayout: FallbackLayout,
  fallbackPath,
  fallbackElement: FallbackElement
}: {
  layout: React.ComponentType<any>;
  allowedRoles: Array<Roles[keyof Roles]>;
  fallbackLayout: React.ComponentType<any>
  fallbackPath: string;
  fallbackElement: React.ComponentType<any>;
}) {
  const role = useAppSelector(store => store.auth.role);

  if (!allowedRoles.includes(role)) {
    return (null)
/*      <FallbackLayout>
        <SSRNavigate to={fallbackPath} toComponent={FallbackElement} replace/>
      </FallbackLayout>) */
  }

  return (
    <Layout>
      <Outlet />;
    </Layout>
  );
}
