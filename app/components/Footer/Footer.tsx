import { Box, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Box bg="primary" color="text" py={4} px={10}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
      >
        <Text fontSize="sm" textAlign={{ base: "center", md: "left" }}>
          © 2024 GPT Boilerplate
        </Text>
        <Flex mt={{ base: 2, md: 0 }} justify={{ base: "center", md: "end" }}>
          <ChakraLink
            as={NextLink}
            href="/"
            mx={2}
            fontSize="sm"
            fontWeight="medium"
          >
            Home
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/swagger"
            mx={2}
            fontSize="sm"
            fontWeight="medium"
          >
            API Docs
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/#roadmap"
            mx={2}
            fontSize="sm"
            fontWeight="medium"
          >
            Roadmap
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/pricing"
            mx={2}
            fontSize="sm"
            fontWeight="medium"
          >
            Pricing
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/TermsAndConditions"
            mx={2}
            fontSize="sm"
            fontWeight="medium"
          >
            Terms and Conditions
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/CancellationAndRefundPolicy"
            mx={2}
            fontSize="sm"
            fontWeight="medium"
          >
            Cancellation and Refund Policy
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/PrivacyPolicy"
            mx={2}
            fontSize="sm"
            fontWeight="medium"
          >
            Privacy Policy
          </ChakraLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
