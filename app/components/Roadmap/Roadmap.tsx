import React from "react";
import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  Link,
  VStack,
  Container,
  Badge,
} from "@chakra-ui/react";
import NextLink from "next/link";

const items = [
  {
    title: "Swagger Docs Integration",
    description:
      "Create a comprehensive Swagger UI for exploring and interacting with your API.",
    linkText: "View Swagger UI",
    linkHref: "/swagger",
    status: "",
  },
  {
    title: "API Schema Generation",
    description:
      "Automatically generate a fully functional API schema based on your GPT API model.",
    linkText: "View API Schema",
    linkHref: "/api/swagger",
    status: "",
  },
  {
    title: "Integrated Middleware",
    description:
      "Simplify your API endpoint configuration with middleware for authentication, logging, and more.",
    linkText: "View Swagger UI",
    linkHref: "/swagger",
    status: "",
  },
  {
    title: "Testing Suite",
    description:
      "Integrated testing chatBot for easy evaluation of GPT API endpoints.",
    status: "Coming Soon",
    linkText: "",
    linkHref: "",
  },
  {
    title: "Auth & Billing",
    description:
      "Enable user registration for access to pro features and billing.",
    status: "Coming Soon",
    linkText: "",
    linkHref: "",
  },
];

const Roadmap = () => {
  return (
    <Box bg="bgGray" py={16} id="roadmap">
      <Container maxW="container.lg">
        <Heading as="h2" size="xl" mb={4}>
          Roadmap
        </Heading>
        <Text mb={8} color="textGray" fontWeight="medium">
          Check out the completed and upcoming features we&apos;re working on to
          enhance your GPT development experience.
        </Text>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
          {items.map((item, index) => (
            <VStack
              key={index}
              p={6}
              align="start"
              bg="white"
              spacing={4}
              borderRadius="md"
              boxShadow="sm"
            >
              <Heading as="h3" size="md">
                {item.title}
              </Heading>
              <Text color="textGray" fontWeight="medium">
                {item.description}
              </Text>
              {item.status ? (
                <Badge bg="bgGray" px={4} py={1} borderRadius="full">
                  <Text fontWeight="semiBold" size={"sm"}>
                    {item.status}
                  </Text>
                </Badge>
              ) : (
                <NextLink href={item.linkHref || ""}>
                  <Text
                    fontWeight="semiBold"
                    fontSize={"sm"}
                    _hover={{
                      textDecoration: "underline",
                      textUnderlineOffset: "6px",
                    }}
                  >
                    {item.linkText} &rarr;
                  </Text>
                </NextLink>
              )}
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Roadmap;
