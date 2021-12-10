import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { FaPoop, FaToilet } from "react-icons/fa";
import { NavBar } from "./navigation/NavBar";
import { LinkItemProps, SideBar } from "./navigation/SideBar";

const AppName = "💩 Poop 💩";

const LinkItems: LinkItemProps[] = [
  { name: "Poop", icon: FaPoop, href: "/poop" },
  { name: "History", icon: FaToilet, href: "/history" }
];

export const AppLayout: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SideBar
        title={AppName}
        items={LinkItems}
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        returnFocusOnClose={false}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <SideBar title={AppName} items={LinkItems} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <NavBar title={AppName} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};
