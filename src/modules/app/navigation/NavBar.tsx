import { Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { FaBars } from "react-icons/fa";
import { NavMenu } from "./NavMenu";
import { ThemeToggler } from "./ThemeToggler";

export interface NavBarProps {
  readonly title: ReactNode;
  readonly onOpen: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onOpen, title, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FaBars />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {title}
      </Text>
      <HStack spacing={{ base: "2", md: "6" }}>
        <ThemeToggler />
        <NavMenu />
      </HStack>
    </Flex>
  );
};
