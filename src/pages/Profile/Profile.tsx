import React from "react";
import { Box, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { FaKey, FaUserEdit } from "react-icons/fa";

import ProfileEditForm from "./components/ProfileEditForm";
import PasswordEditForm from "./components/PasswordEditForm";

import { user } from "./constants";

export default function Profile() {
  return (
    <Box w={1000}>
      <Tabs isFitted size="lg">
        <TabList>
          <Tab>
            <Icon as={FaUserEdit} mr={4} w={6} h={6} />
            <Text lineHeight={1}>User info</Text>
          </Tab>
          <Tab>
            <Icon as={FaKey} mr={4} w={5} h={5} />
            <Text>Password</Text>
          </Tab>
        </TabList>
        <TabPanels pt={12}>
          <TabPanel>
            <ProfileEditForm user={user} />
          </TabPanel>
          <TabPanel>
            <PasswordEditForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
