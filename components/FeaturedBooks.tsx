"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useCart } from "@/hooks/useCart";

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
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await axios.get("/api/books/featured");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching featured books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, book: Book) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling

    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      imageUrl: book.imageUrl,
    });
  };

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
                className="bg-white rounded-xl shadow-md h-[540px] animate-pulse"
              >
                <div className="w-full h-[320px] bg-gray-200 rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
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
            modules={[Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
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
            className="featured-books-swiper pb-16"
          >
            {books.map((book, index) => (
              <SwiperSlide key={book.id} className="h-auto">
                <motion.div
                  className="h-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/books/${book.id}`} className="block h-full">
                    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer h-[540px] flex flex-col border border-gray-100 hover:border-accent/30">
                      {/* Book Cover - Fixed Height */}
                      <div className="relative w-full h-[320px] bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 overflow-hidden">
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
                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                            quality={85}
                            priority={index < 4}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-darkBlue/10">
                            <span className="text-7xl">📚</span>
                          </div>
                        )}
                      </div>

                      {/* Book Info - Fixed Height */}
                      <div className="p-4 flex flex-col justify-between flex-1 min-h-[180px]">
                        <div className="flex-1">
                          <h3 className="font-playfair text-lg font-bold text-darkBlue line-clamp-2 mb-2 min-h-[3.5rem] group-hover:text-accent transition-colors leading-snug">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 truncate">
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
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              ({book.reviews})
                            </span>
                          </div>
                        </div>

                        {/* Price & Button - Always at Bottom */}
                        <div className="flex items-center justify-between mt-auto pt-3">
                          <p className="text-2xl font-bold text-accent">
                            ${book.price.toFixed(2)}
                          </p>
                          <button
                            onClick={(e) => handleAddToCart(e, book)}
                            className="relative overflow-hidden px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-accent/50 active:shadow-md group"
                          >
                            <span className="relative z-10">Add to Cart</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-accent via-[#C9ADA1] to-accent bg-[length:200%_100%] animate-slide-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
        .featured-books-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .featured-books-swiper .swiper-pagination-bullet {
          background: #9caf88;
          opacity: 0.5;
        }

        .featured-books-swiper .swiper-pagination-bullet-active {
          background: #1a3a52;
          opacity: 1;
        }

        @keyframes slide-gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-slide-gradient {
          animation: slide-gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
