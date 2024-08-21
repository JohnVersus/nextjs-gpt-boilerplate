/* eslint-disable react/no-unescaped-entities */
import { Heading, Text, Container } from "@chakra-ui/react";

const CancellationAndRefundPolicy = () => {
  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" size="xl" mb={6}>
        Cancellation and Refund Policy
      </Heading>

      <Text mb={4}>
        <strong>Last updated on:</strong> Aug 12th 2024
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Cancellation Policy
      </Heading>

      <Text mb={4}>
        You may cancel your subscription to our SaaS product at any time through
        your account settings. Cancellations will take effect at the end of the
        current billing period, and you will retain access to the service until
        that time. We do not provide refunds for partial billing periods or
        unused features.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Refund Policy
      </Heading>

      <Text mb={4}>
        Refunds will only be considered in exceptional circumstances, such as
        when there has been an error in billing. To request a refund, please
        contact our customer service team within 7 days of the billing date. All
        refund requests are subject to review, and approval is at our sole
        discretion. If approved, the refund will be processed within 9-15
        business days.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Damaged or Defective Products
      </Heading>

      <Text mb={4}>
        Our SaaS product does not involve physical goods. If you encounter a
        technical issue with our service, please contact our support team for
        assistance. We do not offer refunds for technical issues unless our team
        determines that the issue was caused by a fault in our system that
        cannot be resolved.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Product Mismatch
      </Heading>

      <Text mb={4}>
        If the service you receive does not match the description provided or
        does not meet your expectations, please contact our customer service
        team within 7 days of purchase. We will review your case and take
        appropriate action, which may include a refund or service adjustment.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Warranty Issues
      </Heading>

      <Text mb={4}>
        Our SaaS product is provided "as is" without any warranties of any kind,
        either express or implied. We do not provide warranties for any
        third-party services that may be integrated with our product.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Disclaimer
      </Heading>

      <Text mb={4}>
        The above content is created at John Venkata Sai Nagendra Pilla's sole
        discretion. Razorpay shall not be liable for any content provided here
        and shall not be responsible for any claims and liability that may arise
        due to the merchant’s non-adherence to it.
      </Text>
    </Container>
  );
};

export default CancellationAndRefundPolicy;
