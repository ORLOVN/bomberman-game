import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNotifications } from "react-notifications-component";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorHandler/ErrorBoundary";
import HomePage from "@/pages/Home";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import ProfilePage from "@/pages/Profile";
import ForumPage from "@/pages/Forum";
import { AuthProvider } from "@/hooks";
import ProtectedLayout from "@/layouts/helpers/components/ProtectedLayout";
import GuestLayout from "@/layouts/GuestLayout";
import { Roles, RoutePaths } from "@/enums";
import UserLayout from "@/layouts/UserLayout";

export default function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <ReactNotifications />
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route
                element={
                  <ProtectedLayout
                    layout={GuestLayout}
                    allowedRoles={[Roles.guest]}
                    fallbackPath={RoutePaths.home}
                  />
                }
              >
                <Route path={`/${RoutePaths.signIn}`} element={<SignInPage />} />
                <Route path={`/${RoutePaths.signUp}`} element={<SignUpPage />} />
                <Route path="*" element={<Navigate to={`/${RoutePaths.signIn}`} replace />} />
              </Route>

              <Route
                path={RoutePaths.home}
                element={
                  <ProtectedLayout
                    layout={UserLayout}
                    allowedRoles={[Roles.user]}
                    fallbackPath={`/${RoutePaths.signIn}`}
                  />
                }
              >
                <Route index element={<HomePage />} />
                <Route path={RoutePaths.profile} element={<ProfilePage />} />
                <Route path={RoutePaths.forum} element={<ForumPage />} />
                <Route path="*" element={<Navigate to={RoutePaths.home} replace />} />
              </Route>
              <Route path="*" element={<Navigate to={RoutePaths.home} replace />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </AuthProvider>
    </ChakraProvider>
  );
}
