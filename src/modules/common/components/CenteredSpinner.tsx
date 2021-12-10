import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

export const CenteredSpinner: React.FC = () => {
  return (
    <Center w="full" h="lg">
      <Spinner />
    </Center>
  );
};
