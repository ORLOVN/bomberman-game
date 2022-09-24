import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Box, CircularProgress, Flex } from "@chakra-ui/react";

import { FormikState } from "formik";

import Header from "./components/Header";
import CommentList from "./components/CommentList";
import Textarea from "./components/Textarea";

import { SendMessageFormType } from "./components/Textarea/types";

import { useAppSelector } from "@/hooks";
import { forumApiService } from "@/store";

export default function Topic() {
  const user = useAppSelector((state) => state.auth.user);
  const [createCommentHanlder] = forumApiService.useCreateCommentMutation();

  const [showLoading, setShowLoading] = useState(false);

  const { id: topicId } = useParams();

  const {
    data,
    isLoading: isLoadingMain,
    isFetching: isLoadingComments,
    refetch,
  } = forumApiService.useGetTopicQuery(topicId!);

  if (!isLoadingComments && showLoading) {
    setShowLoading(false);
  }

  const sendCommentHandler = (
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: (nextState?: Partial<FormikState<any>>) => void,
    values: SendMessageFormType
  ) => {
    setSubmitting(true);

    const payload = {
      yaId: user.id,
      topicId: topicId!,
      parentCommentId: null,
      body: values.body,
    };

    createCommentHanlder(payload)
      .unwrap()
      .then()
      .finally(() => {
        setShowLoading(true);
        refetch();
        resetForm();
        setSubmitting(false);
      });
  };

  const { author, avatar, title, body, date, comments, commentsAmount } =
    data || {};

  return (
    <Box mt={4} w={1000} px="6" py="5">
      {isLoadingMain ? (
        <Flex justifyContent="center">
          <CircularProgress isIndeterminate color="teal.300" />
        </Flex>
      ) : (
        <>
          <Header
            author={author!}
            avatar={avatar || ""}
            title={title!}
            body={body!}
            date={date!}
          />
          <CommentList
            comments={comments!}
            commentsAmount={commentsAmount!}
            isLoadingComments={isLoadingComments && showLoading}
            refetch={refetch}
          />
          <Textarea onSubmit={sendCommentHandler} />
        </>
      )}
    </Box>
  );
}
