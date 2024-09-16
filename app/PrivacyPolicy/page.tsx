import { Heading, Text, Container } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" size="xl" mb={6}>
        Privacy Policy
      </Heading>

      <Text mb={4}>
        <strong>Effective Date:</strong> Aug 12th 2024
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
        We collect personal information that you provide to us when you sign up,
        sign in, or interact with our services. This information may include
        your name, email address, and any other details you provide during the
        authentication process.
      </Text>

      <Text mb={4}>
        Additionally, we may collect certain information automatically when you
        use our services, such as your IP address, browser type, and
        device-related information. This data is collected to ensure the
        security of our services and to enhance user experience.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Use of Information
      </Heading>

      <Text mb={4}>
        The personal information we collect is used to provide, maintain, and
        improve our services. Specifically, we use this information for:
      </Text>

      <ul>
        <li>
          <Text mb={2}>
            Authentication: To allow you to sign up, sign in, and access our
            services securely.
          </Text>
        </li>
        <li>
          <Text mb={2}>
            Communication: To send you updates, notifications, and other
            important information related to your account and our services.
          </Text>
        </li>
        <li>
          <Text mb={2}>
            Security: To monitor and protect against security incidents, fraud,
            and unauthorized access to your account.
          </Text>
        </li>
      </ul>

      <Heading as="h2" size="lg" mb={4}>
        Data Storage and Security
      </Heading>

      <Text mb={4}>
        We employ industry-standard security measures to protect the personal
        information we collect. This includes encryption, secure data storage,
        and strict access controls. However, no method of transmission over the
        internet or electronic storage is completely secure, and we cannot
        guarantee its absolute security.
      </Text>

      <Text mb={4}>
        We retain your personal information for as long as necessary to fulfill
        the purposes outlined in this privacy policy, unless a longer retention
        period is required or permitted by law.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Sharing of Information
      </Heading>

      <Text mb={4}>
        We do not sell, trade, or otherwise transfer your personal information
        to third parties without your consent, except as required by law or as
        necessary to provide our services. We may share your information with
        trusted service providers who assist us in operating our website,
        conducting our business, or servicing you, provided that those parties
        agree to keep this information confidential.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Cookies and Tracking Technologies
      </Heading>

      <Text mb={4}>
        We may use cookies and similar tracking technologies to enhance your
        experience on our website, analyze site traffic, and personalize
        content. You can control the use of cookies through your browser
        settings, but please note that disabling cookies may affect your ability
        to use certain features of our services.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Your Rights
      </Heading>

      <Text mb={4}>
        You have the right to access, correct, or delete your personal
        information that we hold. You can also object to the processing of your
        data or request data portability. To exercise these rights, please
        contact us using the information provided below.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Changes to This Privacy Policy
      </Heading>

      <Text mb={4}>
        We may update this privacy policy from time to time to reflect changes
        in our practices or legal requirements. We encourage you to review this
        policy periodically to stay informed about how we are protecting your
        information.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Contact Us
      </Heading>

      <Text mb={4}>
        If you have any questions or concerns about this privacy policy, please
        contact us using the developer email: admin@johnversus.dev, Phone:
        +917660084378.
      </Text>
    </Container>
  );
};

export default PrivacyPolicy;
