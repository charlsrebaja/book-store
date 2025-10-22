"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/lib/store";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();
  const { getCartCount } = useCartStore();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cartItemsCount = getCartCount();

  // Handle scroll effect for background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  // Function to check if link is active
  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out bg-white ${
        isScrolled
          ? "shadow-md border-b border-gray-200"
          : "shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 font-playfair text-2xl md:text-3xl font-bold text-accent hover:opacity-80 transition"
          >
            Readify
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            <Link
              href="/"
              className={`font-medium transition-all duration-200 relative group ${
                isActive("/")
                  ? "text-accent"
                  : "text-gray-700 hover:text-accent"
              }`}
            >
              Home
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  isActive("/") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            <Link
              href="/books"
              className={`font-medium transition-all duration-200 relative group ${
                isActive("/books")
                  ? "text-accent"
                  : "text-gray-700 hover:text-accent"
              }`}
            >
              Books
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  isActive("/books") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            {(session?.user as any)?.role === "ADMIN" && (
              <Link
                href="/admin"
                className={`font-medium transition-all duration-200 relative group ${
                  isActive("/admin")
                    ? "text-accent"
                    : "text-gray-700 hover:text-accent"
                }`}
              >
                Admin
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActive("/admin") ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-6 ml-8">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-accent transition-colors duration-200"
              aria-label="Shopping cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartItemsCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </Link>

            {/* Auth */}
            {session?.user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-accent font-medium transition-colors duration-200"
                >
                  {session.user.name || "Profile"}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-accent text-white px-4 py-2 rounded-lg hover:shadow-lg hover:opacity-90 transition-all duration-200 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="bg-accent text-white px-4 py-2 rounded-lg hover:shadow-lg hover:opacity-90 transition-all duration-200 font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            title="Toggle menu"
          >
            <span className="sr-only">Toggle menu</span>
            <motion.svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </motion.svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            <Link
              href="/"
              className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive("/")
                  ? "bg-accent/10 text-accent font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/books"
              className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive("/books")
                  ? "bg-accent/10 text-accent font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </Link>
            {(session?.user as any)?.role === "ADMIN" && (
              <Link
                href="/admin"
                className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive("/admin")
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <Link
              href="/cart"
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive("/cart")
                  ? "bg-accent/10 text-accent font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span className="bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <hr className="my-3 border-gray-200" />
            {session?.user ? (
              <>
                <Link
                  href="/profile"
                  className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive("/profile")
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="block bg-accent text-white px-4 py-2 rounded-lg hover:shadow-lg hover:opacity-90 transition-all duration-200 font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
