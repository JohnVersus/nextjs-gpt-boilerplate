import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-sm text-center md:text-left">
          © 2024 GPT Boilerplate
        </span>
        <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0 text-center md:text-left">
          <li>
            <Link
              href="/"
              className="text-sm font-medium hover:underline-offset-2"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/swagger"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-thin hover:underline"
            >
              API Docs
            </Link>
          </li>
          <li>
            <Link
              href="/#roadmap"
              className="text-sm font-thin hover:underline"
            >
              Roadmap
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="text-sm font-thin hover:underline">
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/TermsAndConditions"
              rel="prefetch"
              className="text-sm font-thin hover:underline"
            >
              Terms and Conditions
            </Link>
          </li>
          <li>
            <Link
              href="/CancellationAndRefundPolicy"
              className="text-sm font-thin hover:underline"
            >
              Cancellation and Refund Policy
            </Link>
          </li>
          <li>
            <Link
              href="/PrivacyPolicy"
              className="text-sm font-thin hover:underline"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
