import { Box, Flex, Text, Link } from "@chakra-ui/react";

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
          <Link href="/" mx={2} fontSize="sm" fontWeight="medium">
            Home
          </Link>
          <Link href="/swagger" mx={2} fontSize="sm" fontWeight="medium">
            API Docs
          </Link>
          <Link href="#roadmap" mx={2} fontSize="sm" fontWeight="medium">
            Roadmap
          </Link>
          <Link href="/pricing" mx={2} fontSize="sm" fontWeight="medium">
            Pricing
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
