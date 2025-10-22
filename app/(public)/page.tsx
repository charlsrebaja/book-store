"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section - Account for fixed navbar height */}
      <section className="hero-bg min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden pt-0 md:pt-0">
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="text-[#FFD700]">Readify</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 text-white text-opacity-95 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover, explore, and purchase your favorite books from around the
            world. Start your reading journey today.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/books" className="btn btn-primary">
              Browse Books
            </Link>
            <Link href="/auth/login" className="btn btn-secondary">
              Sign In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-darkBlue">
            Why Choose Readify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-playfair text-xl font-bold mb-3 text-darkBlue">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-accent to-[#C9ADA1] py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Start Reading?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-10 text-white text-opacity-95 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Browse our extensive collection of books and find your next favorite
            read.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/books"
              className="btn btn-primary bg-white text-accent hover:bg-opacity-90 font-bold text-lg px-8 py-4 inline-block transition duration-300"
            >
              Explore Our Collection
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: "📚",
    title: "Vast Collection",
    description:
      "Browse through thousands of books across all genres and categories.",
  },
  {
    icon: "🛒",
    title: "Easy Shopping",
    description:
      "Simple cart management and secure checkout process with multiple payment options.",
  },
  {
    icon: "⭐",
    title: "Reviews & Ratings",
    description:
      "Read authentic reviews and ratings from other book lovers like you.",
  },
  {
    icon: "💳",
    title: "Secure Payments",
    description:
      "Multiple payment methods including Stripe, Gcash, and PayPal for your convenience.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    description:
      "Quick and reliable shipping to get your books delivered to your doorstep.",
  },
  {
    icon: "👥",
    title: "Community",
    description:
      "Join our community of readers and share your book recommendations.",
  },
];
