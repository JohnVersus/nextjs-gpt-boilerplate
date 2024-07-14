import { Box } from "@chakra-ui/react";
import { Footer, Header, Hero, Roadmap } from "./components";

export default function Home() {
  return (
    <Box>
      <Header />
      <Hero />
      <Roadmap />
      <Footer />
    </Box>
  );
}
