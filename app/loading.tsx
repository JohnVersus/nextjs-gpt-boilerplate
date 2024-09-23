import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex
      bg="primary"
      color="text"
      py={20}
      px={10}
      textAlign="center"
      align="center"
      justify="center"
      height="100vh"
    >
      <Spinner size="xl" />
    </Flex>
  );
}
