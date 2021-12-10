import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Icon,
  Link,
  Text
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, ReactText } from "react";
import { IconType } from "react-icons";

export interface LinkItemProps {
  readonly name: string;
  readonly icon: IconType;
  readonly href: string;
}

export interface SideBarProps extends Pick<BoxProps, "display"> {
  readonly title: ReactNode;
  readonly items: LinkItemProps[];
  readonly onClose: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({
  title,
  items,
  onClose,
  ...rest
}) => {
  const router = useRouter();
  return (
    <Box
      borderRightWidth="1px"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {title}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {items.map((link) => (
        <SideBarItem
          key={link.name}
          icon={link.icon}
          href={link.href}
          isActive={router.asPath === link.href}
          onClick={onClose}
        >
          {link.name}
        </SideBarItem>
      ))}
    </Box>
  );
};

interface SideBarItemProps {
  isActive?: boolean;
  icon: IconType;
  href: string;
  onClick: () => void;
  children: ReactText;
}

const SideBarItem = ({
  icon,
  href,
  onClick,
  isActive,
  children,
  ...rest
}: SideBarItemProps) => {
  return (
    <NextLink href={href} passHref>
      <Link style={{ textDecoration: "none" }} onClick={onClick}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          color={isActive ? "teal" : undefined}
          _hover={{
            bg: "teal",
            color: "white"
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white"
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};
