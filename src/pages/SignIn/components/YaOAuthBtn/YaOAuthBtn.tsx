import { Button, Image } from "@chakra-ui/react";
import React from "react";

import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import styles from "./YaOAuthBtn.module.scss";

import YaLogo from "@/assets/images/yandex_logo.png";
import { useAppSelector } from "@/hooks";
import Theme from "@/enums/Theme";
import { authApiService } from "@/store";
import { NotificationService } from "@/components/ErrorHandler";
import { ErrorResponse } from "@/types";

export default function YaOAuthBtn() {
  const theme = useAppSelector((state) => state.theme.theme);

  const [getOauthClientId] = authApiService.useLazyGetOauthClientIdQuery();

  const isDark = theme === Theme.DARK;

  const clickHandler = () => {
    const REDIRECT_URI = `${window.location.origin}`;

    getOauthClientId(REDIRECT_URI)
      .unwrap()
      .then((res) => {
        const { service_id } = res;
        window.location.href = `
                https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}
            `;
      })
      .catch((error: FetchBaseQueryError) => {
        NotificationService.notifyError((error.data as ErrorResponse).reason);
      });
  };

  return (
    <Button
      onClick={clickHandler}
      className={isDark ? styles.button_dark : styles.button}
      leftIcon={
        <Image
          src={YaLogo}
          boxSize="24px"
          mr={3}
          borderRadius="full"
          alt="Sign in with Yandex ID"
        />
      }
      borderRadius={12}
    >
      Sign in with Yandex ID
    </Button>
  );
}
