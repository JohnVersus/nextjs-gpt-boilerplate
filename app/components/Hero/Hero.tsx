import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import Image from "next/image";

const Hero = () => {
  return (
    <Flex
      bg="primary"
      color="text"
      py={20}
      px={10}
      textAlign="left"
      align="center"
      justify="center"
      height="80vh"
      gap={8}
      direction={{ base: "column", md: "row" }}
    >
      <Box maxW="md">
        <Heading as="h1" size="2xl" mb={4}>
          Jumpstart your GPT project
        </Heading>
        <Text
          fontSize="xl"
          mb={6}
          fontWeight="medium"
          textColor="muted"
          lineHeight="xl"
        >
          This boilerplate provides a base template for building your next
          GPT-powered application.
        </Text>
        <Button background={"bgPrimary"} variant="outline">
          Get Started
        </Button>
      </Box>
      <Box
        display={{ base: "none", md: "block" }}
        borderRadius={"15px"}
        width={{ base: "100%", sm: "350px" }}
        height={{ base: "auto", sm: "350px" }}
        position="relative"
        alignSelf="center"
      >
        <Flex align="center" justify="center" height={"100%"}>
          <Image
            src="/image1.png"
            alt="GPT Boilerplate"
            layout="intrinsic"
            objectFit="cover"
            width={350}
            height={350}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Hero;
