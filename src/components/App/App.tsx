import React from "react";
import { CircularProgress, Flex, ChakraProvider } from "@chakra-ui/react";
import { ReactNotifications } from "react-notifications-component";
import {Route, Routes} from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorHandler/ErrorBoundary";
import HomePage from "@/pages/Home";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import ProfilePage from "@/pages/Profile";
import LeaderboardPage from "@/pages/Leaderboard";
import ForumPage from "@/pages/Forum";
import CreateTopicPage from "@/pages/Forum/pages/CreateTopic";
import TopicPage from "@/pages/Forum/pages/Topic/_id";
import GuestLayout from "@/layouts/GuestLayout";
import { Roles, RoutePaths } from "@/enums";
import UserLayout from "@/layouts/UserLayout";
import { authApiService } from "@/store";
import GameBootstrap from '@/components/GameBootstrap';
import SSRNavigate from "@/components/SSRNavigate";
import {useAppSelector} from "@/hooks";
import Error404 from "@/pages/Error404";

export default function App() {
  const { isLoading } = authApiService.endpoints.getUserInfo.useQueryState(undefined);

  const role = useAppSelector(store => store.auth.role);

  const preloader = (
    <Flex justify="center" align="center" minHeight="100vh">
      <CircularProgress isIndeterminate color="teal" />
    </Flex>
  );

  const userPresentation = (
    <Route element={<UserLayout/>}>
      <Route index element={<HomePage />} />
      <Route path={`/${RoutePaths.signIn}`} element={
        <SSRNavigate to={RoutePaths.home} toComponent={HomePage} replace />} />
      <Route path={`/${RoutePaths.signUp}`} element={
        <SSRNavigate to={RoutePaths.home} toComponent={HomePage} replace />} />
      <Route path={RoutePaths.game} element={<GameBootstrap />} />
      <Route path={RoutePaths.profile} element={<ProfilePage />} />
      <Route path={RoutePaths.leaderboard} element={<LeaderboardPage />} />
      <Route path={RoutePaths.forum}>
        <Route index element={<ForumPage />} />
        <Route path={RoutePaths.createTopic} element={<CreateTopicPage />} />
        <Route path={RoutePaths.topicId} element={<TopicPage />} />
      </Route>
    </Route>
  );
  const guestPresentation = (
    <Route element={<GuestLayout/>}>
      <Route path={`/${RoutePaths.signIn}`} element={<SignInPage />} />
      <Route index element={<SignInPage />} />
      <Route path={`/${RoutePaths.signUp}`} element={<SignUpPage />} />
      <Route path="*" element={
        <SSRNavigate to={RoutePaths.signIn} toComponent={SignInPage} replace />} />
    </Route>
  );

  return (
      <ChakraProvider>
        <ReactNotifications />
        { isLoading
          ? preloader
          : (
              <ErrorBoundary>
                <Routes>
                  {
                    role === Roles.user ? userPresentation : guestPresentation
                  }
                  <Route path="*" element={<Error404/>} />
                </Routes>
              </ErrorBoundary>
            )
        }
      </ChakraProvider>
  );
}
