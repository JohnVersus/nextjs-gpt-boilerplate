"use client";
import {
  Box,
  Flex,
  Stack,
  Text,
  Image,
  IconButton,
  useDisclosure,
  Collapse,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

const NavLink = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  [x: string]: any;
}) => {
  return (
    <ChakraLink
      as={NextLink}
      rel={"prefetch"}
      href={href}
      _hover={{
        textDecoration: "underline",
        textUnderlineOffset: "6px",
      }}
      {...props}
    >
      {children}
    </ChakraLink>
  );
};

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="primary" color="white" py={4} fontWeight="medium">
      <Flex maxW="7xl" mx="auto" px={4} align="center" justify="space-between">
        <Flex align="center">
          <Image src="/icon.svg" alt="Logo" boxSize="24px" mr={2} />
          <ChakraLink
            as={NextLink}
            href="/"
            _hover={{ textDecoration: "none" }}
          >
            <Text fontSize="lg" fontWeight="bold" textDecoration="none">
              GPT Boilerplate
            </Text>
          </ChakraLink>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }}>
          <Stack direction="row" spacing={4}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/swagger" target="_blank" rel="noopener noreferrer">
              API Docs
            </NavLink>
            <NavLink href="/#roadmap">Roadmap</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
          </Stack>
        </Flex>
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          icon={
            isOpen ? (
              <CloseIcon color={"muted"} />
            ) : (
              <HamburgerIcon color={"muted"} />
            )
          }
          variant="black"
          aria-label="Toggle Navigation"
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }} textAlign="right" pr={4}>
          <Stack as="nav" spacing={4}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/swagger" target="_blank" rel="noopener noreferrer">
              API Docs
            </NavLink>
            <NavLink href="/#roadmap">Roadmap</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Header;
