import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { FormEventHandler, useState } from "react";
import { PoopType } from "./api/types";
import { TypeToName } from "./utils";

export const Poop: React.FC = () => {
  const toast = useToast();
  const [poopType, setPoopType] = useState(PoopType.Normal);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    await axios.post("/api/poops", {
      type: poopType
    });
    setIsSubmitting(false);

    toast({
      title: "Poop recorded",
      description: `Type of poop: ${TypeToName[poopType]}`,
      duration: 3000,
      status: "success",
      isClosable: true
    });
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} w="lg" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>I pooped</Heading>
        </Box>
        <Box my={8} textAlign="left">
          <form onSubmit={onSubmit}>
            <FormControl as="fieldset">
              <FormLabel as="legend">Type of poop</FormLabel>
              <RadioGroup
                onChange={(value) => setPoopType(value as PoopType)}
                value={poopType}
              >
                <Stack>
                  <Radio value={PoopType.Normal}>
                    {TypeToName[PoopType.Normal]}
                  </Radio>
                  <Radio value={PoopType.Liquid}>
                    {TypeToName[PoopType.Liquid]}
                  </Radio>
                  <Radio value={PoopType.Little}>
                    {TypeToName[PoopType.Little]}
                  </Radio>
                  <Radio value={PoopType.Nothing}>
                    {TypeToName[PoopType.Nothing]}
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting"
              colorScheme="teal"
              width="full"
              mt={6}
            >
              Done
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
