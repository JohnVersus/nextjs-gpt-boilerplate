import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const items = [
  {
    title: "Swagger Docs Integration",
    description:
      "Create a comprehensive Swagger UI for exploring and interacting with your API.",
    linkText: "View Swagger UI",
    linkHref: "/swagger",
    status: "",
    isExternal: true,
  },
  {
    title: "API Schema Generation",
    description:
      "Auto generates a fully functional API schema based on your GPT API model.",
    linkText: "View API Schema",
    linkHref: "/api/swagger",
    status: "",
    isExternal: true,
  },
  {
    title: "Publishable as GPT",
    description: "Easily deploy your API as a GPT on ChatGPT.",
    linkText: "View BookStore GPT",
    linkHref: "https://chatgpt.com/g/g-28N44QTyi-bookstore",
    status: "",
    isExternal: true,
  },
  {
    title: "Integrated Middleware",
    description:
      "Simplify your API endpoint configuration with middleware for authentication, logging, and more.",
    linkText: "View Swagger UI",
    linkHref: "/swagger",
    status: "",
    isExternal: true,
  },
  {
    title: "Auth & Billing",
    description: "Prcing page has been setup with link user authentication.",
    status: "",
    linkText: "Visit Pricing Page",
    linkHref: "/pricing",
  },
  {
    title: "Testing Suite",
    description:
      "Integrated testing chatBot for easy evaluation of GPT API endpoints.",
    status: "Coming Soon",
    linkText: "",
    linkHref: "",
  },
];

const Roadmap = () => {
  return (
    <div className="bg-bgGray py-16 overflow-x-hidden" id="roadmap">
      <div className="container max-w-screen-lg mx-auto p-4">
        <h2 className="text-3xl font-extrabold mb-4">Roadmap</h2>
        <p className="mb-8 text-textGray font-medium">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Check out the completed and upcoming features we're working on to
          enhance your GPT development experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-4 md:p-6 items-start bg-white rounded-md shadow-sm space-y-4 w-full"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-textGray font-medium">{item.description}</p>
              {item.status ? (
                <Badge className="bg-bgGray" variant={"outline"}>
                  <span className="font-semibold text-sm">{item.status}</span>
                </Badge>
              ) : item.linkText && item.linkHref ? (
                <Link
                  href={item.linkHref}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="font-semibold text-sm hover:underline hover:underline-offset-4"
                >
                  {`${item.linkText} →`}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
