/* eslint-disable react/no-unescaped-entities */
import { Heading, Text, Container } from "@chakra-ui/react";

const TermsAndConditions = () => {
  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" size="xl" mb={6}>
        Terms and Conditions
      </Heading>

      <Text mb={4}>
        <strong>Last updated on:</strong> Aug 12th 2024
      </Text>

      <Text mb={4}>
        For the purpose of these Terms and Conditions, the term "we", "us",
        "our" used anywhere on this page shall mean John's Tech, whose
        registered/operational office is 6-4, Pilla Suribabu Bungalow, Patha
        vuuru, Penugollu Dharmavaram, S Rayavaram Visakhapatnam ANDHRA PRADESH
        531060. "You", "your", "user", "subscriber" shall mean any natural or
        legal person who is visiting our website and/or subscribed to our
        services.
      </Text>

      <Text mb={4}>
        Your use of the website and/or subscription to our services is governed
        by the following Terms and Conditions:
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Use of Services
      </Heading>

      <Text mb={4}>
        By subscribing to our SaaS product, you agree to use it in compliance
        with these terms, applicable laws, and any additional terms outlined in
        a separate agreement with us. You are responsible for maintaining the
        confidentiality of your account credentials and for all activities that
        occur under your account.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Subscription and Billing
      </Heading>

      <Text mb={4}>
        Your subscription to our service will continue until terminated. The
        subscription fee will be billed at the start of your subscription and on
        each subsequent billing cycle. By providing a payment method, you
        authorize us to charge the applicable subscription fees to your
        designated payment method.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Cancellation and Termination
      </Heading>

      <Text mb={4}>
        You can cancel your subscription at any time by accessing your account
        settings. Upon cancellation, your access to the service will continue
        until the end of your current billing period. We reserve the right to
        suspend or terminate your account if you violate these Terms and
        Conditions or if we suspect fraudulent activity on your account.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Intellectual Property
      </Heading>

      <Text mb={4}>
        All intellectual property rights in the service, including but not
        limited to software, content, and trademarks, are owned by us or our
        licensors. You are granted a non-exclusive, non-transferable, limited
        license to use the service solely for your internal business purposes.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Limitation of Liability
      </Heading>

      <Text mb={4}>
        To the fullest extent permitted by law, we shall not be liable for any
        indirect, incidental, or consequential damages arising from your use of
        the service, including but not limited to loss of revenue, profits, or
        data.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Modifications to the Service and Prices
      </Heading>

      <Text mb={4}>
        We reserve the right to modify or discontinue the service (or any part
        thereof) at any time, with or without notice. We may also adjust pricing
        for the service, but you will be notified in advance and given the
        opportunity to cancel your subscription before any price change takes
        effect.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Governing Law
      </Heading>

      <Text mb={4}>
        These Terms and Conditions are governed by and construed in accordance
        with the laws of India. Any disputes arising out of or related to your
        use of the service shall be subject to the exclusive jurisdiction of the
        courts located in Visakhapatnam, Andhra Pradesh, India.
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

export default TermsAndConditions;
