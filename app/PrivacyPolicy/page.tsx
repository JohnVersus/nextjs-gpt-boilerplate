import { Box, Heading, Text, Container } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" size="xl" mb={6}>
        Privacy Policy
      </Heading>

      <Text mb={4}>
        <strong>Effective Date:</strong> [Insert Date]
      </Text>

      <Text mb={4}>
        Your privacy is important to us. This privacy policy explains what
        information we collect, how we use it, and your rights regarding any
        information collected.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Information We Collect
      </Heading>

      <Text mb={4}>
        Our GPT application does not store any personal data. The queries and
        interactions with the GPT model are processed in real-time and are not
        stored or logged.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Use of Information
      </Heading>

      <Text mb={4}>
        Since no personal data is collected or stored, we do not use, share, or
        sell any personal information. The information processed by the GPT
        model is solely used to provide responses to user queries in real-time.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Security
      </Heading>

      <Text mb={4}>
        We are committed to ensuring the security of your interactions. Even
        though we do not store personal data, we employ measures to protect the
        integrity and security of our services.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Changes to This Privacy Policy
      </Heading>

      <Text mb={4}>
        We may update this privacy policy from time to time. We encourage you to
        review this policy periodically to stay informed about how we are
        protecting your information.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Contact Us
      </Heading>

      <Text mb={4}>
        If you have any questions or concerns about this privacy policy, please
        contact using the developer email.
      </Text>
    </Container>
  );
};

export default PrivacyPolicy;
