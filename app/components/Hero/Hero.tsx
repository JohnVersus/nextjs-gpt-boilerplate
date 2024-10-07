import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div
      className="
        flex flex-col md:flex-row
        items-center justify-center
        bg-primary text-text
        py-20 px-10
        h-[80vh]
        gap-8
        text-left
      "
    >
      <div className="max-w-md">
        <h1 className="text-5xl font-extrabold mb-4 leading-snug">
          Jumpstart your GPT project
        </h1>
        <p className="text-xl mb-6 font-medium text-textGray leading-tight">
          This boilerplate provides a base template for building your next
          GPT-powered application.
        </p>
        <Button
          asChild
          variant="outline"
          className="bg-bgPrimary text-primary font-semibold border-primary hover:bg-bgGray"
        >
          <a
            href="https://github.com/JohnVersus/nextjs-gpt-boilerplate"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>
        </Button>
      </div>
      <div
        className="
          hidden md:block
          self-center
          rounded-[15px]
          w-full sm:w-[350px]
          h-auto sm:h-[350px]
          relative
        "
      >
        <div className="flex items-center justify-center h-full">
          <Image
            src="/image1.png"
            alt="NextJs GPT Boilerplate"
            width={350}
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
