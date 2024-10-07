"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

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
    <Link
      href={href}
      {...props}
      className="hover:underline hover:underline-offset-4"
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen(!isOpen);

  return (
    <header className="bg-primary text-white py-4 font-medium">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/icon.svg"
            alt="Logo"
            width={24}
            height={24}
            className="mr-2"
          />
          <Link href="/" className="hover:no-underline">
            <span className="text-lg font-bold">GPT Boilerplate</span>
          </Link>
        </div>
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink
                href="/swagger"
                target="_blank"
                rel="noopener noreferrer"
              >
                API Docs
              </NavLink>
            </li>
            <li>
              <NavLink href="/#roadmap">Roadmap</NavLink>
            </li>
            <li>
              <NavLink href="/pricing">Pricing</NavLink>
            </li>
          </ul>
        </nav>
        <button
          className="md:hidden flex items-center justify-center"
          onClick={onToggle}
          aria-label="Toggle Navigation"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-muted" />
          ) : (
            <Menu className="w-6 h-6 text-muted" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-end pr-4 pb-4 space-y-4">
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink
                href="/swagger"
                target="_blank"
                rel="noopener noreferrer"
              >
                API Docs
              </NavLink>
            </li>
            <li>
              <NavLink href="/#roadmap">Roadmap</NavLink>
            </li>
            <li>
              <NavLink href="/pricing">Pricing</NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
