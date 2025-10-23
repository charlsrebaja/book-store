"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import FeaturedBooks from "@/components/FeaturedBooks";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Home() {
  const heroSlides = [
    {
      id: 1,
      backgroundImage: "/images/hero/hero-bg1.png",
      headline: "Welcome to Readify",
      highlight: "Your Literary Journey Starts Here",
      description:
        "Discover, explore, and purchase your favorite books from around the world. Start your reading journey today.",
      ctaText: "Browse Books",
      ctaLink: "/books",
    },
    {
      id: 2,
      backgroundImage: "/images/hero/book-bg.png",
      headline: "Vast Collection",
      highlight: "Thousands of Books Await",
      description:
        "Browse through our extensive library of books across all genres. From bestsellers to hidden gems, find your next great read.",
      ctaText: "Explore Collection",
      ctaLink: "/books",
    },
    {
      id: 3,
      backgroundImage: "/images/hero/cta-bg.png",
      headline: "Special Offers",
      highlight: "Great Deals on Bestsellers",
      description:
        "Check out our featured books and special promotions. Don't miss out on amazing discounts and new arrivals.",
      ctaText: "View Deals",
      ctaLink: "/books",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Carousel Section */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="hero-swiper min-h-screen"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-20">
                {/* Background Image */}
                <div
                  className={`absolute inset-0 hero-slide-bg-${slide.id}`}
                ></div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                {/* Content */}
                <div className="max-w-4xl mx-auto text-center relative z-10">
                  <motion.h1
                    className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    key={`headline-${slide.id}`}
                  >
                    {slide.headline}
                  </motion.h1>
                  <motion.h2
                    className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-[#FFD700] drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    key={`highlight-${slide.id}`}
                  >
                    {slide.highlight}
                  </motion.h2>
                  <motion.p
                    className="text-base sm:text-lg md:text-xl mb-8 text-white text-opacity-95 drop-shadow-md max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    key={`description-${slide.id}`}
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    key={`cta-${slide.id}`}
                  >
                    <Link
                      href={slide.ctaLink}
                      className="btn btn-primary text-lg px-8 py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                    >
                      {slide.ctaText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Books - Bestsellers Section */}
      <FeaturedBooks />

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
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 cta-bg"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/80 to-[#C9ADA1]/80"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Start Reading?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-10 text-white text-opacity-95 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
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
              className="btn btn-primary bg-white text-white hover:bg-opacity-90 font-bold text-lg px-8 py-4 inline-block transition duration-300"
            >
              Explore Our Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Custom Hero Carousel Styles */}
      <style jsx global>{`
        .hero-swiper {
          width: 100%;
          height: 100vh;
        }

        .hero-swiper .swiper-pagination {
          bottom: 30px !important;
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          background: #ffd700;
          opacity: 1;
          width: 30px;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .hero-swiper .swiper-pagination {
            bottom: 20px !important;
          }

          .hero-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
          }

          .hero-swiper .swiper-pagination-bullet-active {
            width: 20px;
          }
        }

        .hero-slide-bg-1 {
          background-image: url("/images/hero/hero-bg1.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .hero-slide-bg-2 {
          background-image: url("/images/hero/book-bg.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .hero-slide-bg-3 {
          background-image: url("/images/hero/book-bg3.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>
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
