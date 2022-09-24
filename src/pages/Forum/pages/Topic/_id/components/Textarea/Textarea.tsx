import React, { lazy, Suspense, useState } from "react";
import { Form, Formik } from "formik";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  Textarea as TextareaField,
} from "@chakra-ui/react";

import { TextFormControl } from "@/components/FormControls";

import { SendMessageFormType, Props } from "./types";
import { SendMessageSchema } from "./schemas";
import { BiSmile } from "react-icons/bi";
import { useAppSelector } from "@/hooks";

export default function Textarea({ onSubmit }: Props) {
  const user = useAppSelector((state) => state.auth.user);
  const Picker = lazy(() => import("emoji-picker-react"));

  const [showEmojies, setShowEmojies] = useState(false);

  return (
    <Flex>
      <Avatar
        name="You"
        src={
          user.avatar
            ? `${process.env.PROXY_API_PATH}/resources${user.avatar}`
            : ""
        }
      />
      <Box flex="1" ml={2}>
        <Text mb={2} fontSize="sm" fontWeight="bold">
          You:
        </Text>
        <Formik
          initialValues={{ body: "" } as SendMessageFormType}
          validationSchema={SendMessageSchema}
          onSubmit={(values, { setSubmitting, resetForm }) =>
            onSubmit(setSubmitting, resetForm, values)
          }
        >
          {({
            isSubmitting,
            handleSubmit,
            isValid,
            dirty,
            setFieldValue,
            values,
          }) => (
            <Form onSubmit={handleSubmit}>
              <TextFormControl<SendMessageFormType>
                name="body"
                placeholder="Type your reply here..."
                showError={false}
                component={TextareaField}
              />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                position="relative"
              >
                <Button
                  type="submit"
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  disabled={!dirty || (dirty && !isValid) || isSubmitting}
                >
                  Send
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowEmojies((prev) => !prev)}
                >
                  <Icon w={6} h={6} as={BiSmile} />
                </Button>
                <Box
                  style={{
                    bottom: "40px",
                    right: 0,
                    display: showEmojies ? "block" : "none",
                  }}
                  position="absolute"
                >
                  <Suspense fallback={<div />}>
                    <Picker
                      onEmojiClick={(_, emojiObject) => {
                        setFieldValue(
                          "body",
                          `${values.body}${emojiObject.emoji}`
                        );
                      }}
                      disableAutoFocus
                      native
                    />
                  </Suspense>
                </Box>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
