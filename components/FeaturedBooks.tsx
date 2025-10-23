"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  imageUrl?: string;
  rating: number;
  reviews: number;
}

export default function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const response = await axios.get("/api/books/bestsellers");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching bestsellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-12 text-darkBlue">
            Featured Books - Bestsellers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md h-96 animate-pulse"
              >
                <div className="w-full h-64 bg-gray-200 rounded-t-xl"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (books.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-darkBlue">
            Featured Books
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our bestselling books loved by readers worldwide
          </p>
        </motion.div>

        {/* Swiper Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="featured-books-swiper pb-12"
          >
            {books.map((book, index) => (
              <SwiperSlide key={book.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/books/${book.id}`}>
                    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col border border-gray-100 hover:border-accent/30">
                      {/* Book Cover */}
                      <div className="relative w-full aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        {/* Bestseller Badge */}
                        <div className="absolute top-3 left-3 z-10 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                          <span>🏆</span>
                          <span>Bestseller</span>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 z-10 bg-yellow-400 text-darkBlue px-3 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1">
                          <span>★</span>
                          {book.rating.toFixed(1)}
                        </div>

                        {book.imageUrl ? (
                          <Image
                            src={book.imageUrl}
                            alt={book.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-contain group-hover:scale-110 transition-transform duration-500"
                            quality={85}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-darkBlue/10">
                            <span className="text-6xl">📚</span>
                          </div>
                        )}
                      </div>

                      {/* Book Info */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-playfair text-lg font-bold text-darkBlue line-clamp-2 mb-2 group-hover:text-accent transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            by {book.author}
                          </p>

                          {/* Rating & Reviews */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm ${
                                    i < Math.floor(book.rating)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">
                              ({book.reviews} reviews)
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold text-accent">
                            ${book.price.toFixed(2)}
                          </p>
                          <button className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/books"
            className="inline-block px-8 py-3 bg-darkBlue text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            View All Books →
          </Link>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .featured-books-swiper .swiper-pagination-bullet {
          background: #9caf88;
          opacity: 0.5;
        }

        .featured-books-swiper .swiper-pagination-bullet-active {
          background: #1a3a52;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
