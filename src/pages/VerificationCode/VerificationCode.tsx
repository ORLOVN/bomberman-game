import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { authApiService } from "@/store";
import { NotificationService } from "@/components/ErrorHandler";
import { ErrorResponse } from "@/types";
import { RoutePaths } from "@/enums";

export default function Home() {
  const [ searchParams ] = useSearchParams();
  const [ oauthYandexVerify ] = authApiService.useOauthVerifyMutation();
  const navigate = useNavigate();

  const REDIRECT_URI = `${window.location.origin}/${RoutePaths.verificationCode}`;


  useEffect(() => {
    oauthYandexVerify({
      code: searchParams.get('code')!,
      redirect_uri: REDIRECT_URI
    })
    .unwrap()
    .catch(
      (error: FetchBaseQueryError) => {
        NotificationService
          .notifyError((error.data as ErrorResponse).reason);

          navigate('/sign-in');
      }
    );
  }, []);
  return (
    <div>Verification is processing... Just a moment :)</div>
  );
}
