import { Box, Flex, Text, Stack, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Box bg="primary" color="white" py={4} px={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="7xl"
        mx="auto"
      >
        <Text fontSize="sm" textAlign={{ base: "center", md: "left" }}>
          © 2024 GPT Boilerplate
        </Text>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          mt={{ base: 2, md: 0 }}
          textAlign={{ base: "center", md: "left" }}
        >
          <ChakraLink as={NextLink} href="/" fontSize="sm" fontWeight="medium">
            Home
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/swagger"
            fontSize="sm"
            fontWeight="medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Docs
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/#roadmap"
            fontSize="sm"
            fontWeight="medium"
          >
            Roadmap
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/pricing"
            fontSize="sm"
            fontWeight="medium"
          >
            Pricing
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/TermsAndConditions"
            fontSize="sm"
            fontWeight="medium"
            rel="prefetch"
          >
            Terms and Conditions
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/CancellationAndRefundPolicy"
            fontSize="sm"
            fontWeight="medium"
          >
            Cancellation and Refund Policy
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/PrivacyPolicy"
            fontSize="sm"
            fontWeight="medium"
          >
            Privacy Policy
          </ChakraLink>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
