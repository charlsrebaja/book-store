"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#E8E8E8] mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-accent mb-4">
              Readify
            </h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Your online destination for discovering and purchasing quality
              books.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#2B2B2B] mb-4 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#4B5563] hover:text-accent transition duration-200 font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="text-[#4B5563] hover:text-accent transition duration-200 font-medium"
                >
                  Browse Books
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#4B5563] hover:text-accent transition duration-200 font-medium"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#4B5563] hover:text-accent transition duration-200 font-medium"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-[#2B2B2B] mb-4 text-lg">
              Categories
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/books?category=Fiction"
                  className="text-[#4B5563] hover:text-accent transition duration-200 font-medium"
                >
                  Fiction
                </Link>
              </li>
              <li>
                <Link
                  href="/books?category=Business"
                  className="text-[#4B5563] hover:text-accent transition duration-200 font-medium"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  href="/books?category=Self-Help"
                  className="text-[#4B5563] hover:text-accent transition duration-200 font-medium"
                >
                  Self-Help
                </Link>
              </li>
              <li>
                <Link
                  href="/books?category=Classics"
                  className="text-[#4B5563] hover:text-accent transition duration-200 font-medium"
                >
                  Classics
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-[#2B2B2B] mb-4 text-lg">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-[#4B5563] hover:text-accent transition duration-200 font-medium"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#4B5563] hover:text-accent transition duration-200 font-medium"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-[#4B5563] hover:text-accent transition duration-200 font-medium"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-[#4B5563] hover:text-accent transition duration-200 font-medium"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E8E8E8]"></div>

        {/* Bottom Section */}
        <div className="pt-8 md:pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-[#4B5563] text-center md:text-left">
              &copy; {currentYear} Readify. All rights reserved. Built with ❤️
              by Charls.
            </p>
            <div className="flex gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4B5563] hover:text-accent transition duration-200"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333H16V2.169c-.585-.089-1.308-.169-2.227-.169-2.753 0-4.772 1.236-4.772 3.829V8z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4B5563] hover:text-accent transition duration-200"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4B5563] hover:text-accent transition duration-200"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
