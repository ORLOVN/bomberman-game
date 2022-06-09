import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Roles } from "@/enums";
import { useAuth } from "@/hooks";

export default function ProtectedLayout({
  layout: Layout,
  allowedRoles,
  fallbackPath,
}: {
  layout: React.ComponentType<any>;
  allowedRoles: Array<Roles[keyof Roles]>;
  fallbackPath: string;
}) {
  const { role } = useAuth();

  if (!allowedRoles.includes(role)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
