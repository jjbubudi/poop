import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { FaChevronDown } from "react-icons/fa";

export const NavMenu: React.FC = () => {
  const session = useSession();

  switch (session.status) {
    case "loading":
      return <Spinner />;
    case "unauthenticated":
      return <Button onClick={() => signIn()}>Sign in</Button>;
    case "authenticated":
      return (
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} _focus={{ boxShadow: "none" }}>
              <HStack>
                <Avatar
                  size={"sm"}
                  name={session.data.user?.name || undefined}
                  src={session.data.user?.image || undefined}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{session.data.user?.name}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FaChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      );
  }
};
