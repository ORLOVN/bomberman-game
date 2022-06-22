import React from "react";
import { CircularProgress, Flex } from "@chakra-ui/react";
import { ReactNotifications } from "react-notifications-component";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorHandler/ErrorBoundary";
import HomePage from "@/pages/Home";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import ProfilePage from "@/pages/Profile";
import LeaderboardPage from "@/pages/Leaderboard";
import ForumPage from "@/pages/Forum";
import CreateTopicPage from "@/pages/Forum/pages/CreateTopic";
import TopicPage from "@/pages/Forum/pages/Topic/_id";
import ProtectedLayout from "@/layouts/helpers/components/ProtectedLayout";
import GuestLayout from "@/layouts/GuestLayout";
import { Roles, RoutePaths } from "@/enums";
import UserLayout from "@/layouts/UserLayout";
import { authApiService } from "@/store";
import GameBootstrap from '@/components/GameBootstrap';

export default function App() {
  const { isLoading } = authApiService.useGetUserInfoQuery();

  const preloader = (
    <Flex justify="center" align="center" minHeight="100vh">
      <CircularProgress isIndeterminate color="teal" />
    </Flex>
  );

  return (
      <>
        <ReactNotifications />
        { isLoading
          ? preloader
          : (
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
                      <Route path={RoutePaths.game} element={<GameBootstrap />} />
                      <Route path={RoutePaths.profile} element={<ProfilePage />} />
                      <Route path={RoutePaths.leaderboard} element={<LeaderboardPage />} />
                      <Route path={RoutePaths.forum}>
                        <Route index element={<ForumPage />} />
                        <Route path={RoutePaths.createTopic} element={<CreateTopicPage />} />
                        <Route path={RoutePaths.topicId} element={<TopicPage />} />
                        <Route path="*" element={<Navigate to={RoutePaths.forum} replace />} />
                      </Route>
                      <Route path="*" element={<Navigate to={RoutePaths.home} replace />} />
                    </Route>
                    <Route path="*" element={<Navigate to={RoutePaths.home} replace />} />
                  </Routes>
                </Router>
              </ErrorBoundary>
            )
        }
      </>
  );
}
