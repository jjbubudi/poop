import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { BuiltInProviderType } from "next-auth/providers";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { CenteredSpinner } from "../common/components/CenteredSpinner";

export const SignIn: React.FC = () => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const signInBg = useColorModeValue("white", "gray.700");
  const session = useSession();
  const router = useRouter();
  const callbackUrl = (router.query.callbackUrl as string) || "/poop";
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace(callbackUrl);
    }
  });

  if (session.status !== "unauthenticated") {
    return <CenteredSpinner />;
  }

  const handleSignIn = (provider: BuiltInProviderType) => {
    setIsSigningIn(true);
    signIn(provider, { callbackUrl });
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={bg}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to record poops 💩
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={signInBg}
          boxShadow={"lg"}
          borderWidth={1}
          p={8}
        >
          <Stack spacing={4}>
            <Button
              isLoading={isSigningIn}
              leftIcon={<FaGoogle />}
              colorScheme="blue"
              onClick={() => handleSignIn("google")}
            >
              Sign in with Google
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
