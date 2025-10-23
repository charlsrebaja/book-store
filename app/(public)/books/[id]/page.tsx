"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description?: string;
  imageUrl?: string;
  category?: string;
  stock: number;
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  pages?: number;
  language?: string;
  rating?: number;
  reviews?: number;
}

export default function BookDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/books/${params.id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("Book not found");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBook();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (book) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price,
          imageUrl: book.imageUrl,
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-darkBlue mb-4">
          Book Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          {error || "The book you're looking for doesn't exist."}
        </p>
        <Link
          href="/books"
          className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
        >
          Browse All Books
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/books" className="hover:text-accent transition-colors">
            Books
          </Link>
          <span>/</span>
          <span className="text-darkBlue font-medium">{book.title}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Book Image */}
            <div className="relative h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
              {book.imageUrl ? (
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-9xl">📚</span>
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="flex flex-col">
              <h1 className="font-playfair text-4xl font-bold text-darkBlue mb-3">
                {book.title}
              </h1>
              <p className="text-xl text-gray-700 mb-4">by {book.author}</p>

              {/* Rating */}
              {book.rating && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < Math.floor(book.rating || 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {book.rating.toFixed(1)} ({book.reviews || 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-accent">
                  ${book.price.toFixed(2)}
                </span>
              </div>

              {/* Description */}
              {book.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-darkBlue mb-2">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              )}

              {/* Book Details */}
              <div className="mb-6 space-y-2 text-sm">
                {book.category && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Category:</span>{" "}
                    {book.category}
                  </p>
                )}
                {book.isbn && (
                  <p className="text-gray-600">
                    <span className="font-semibold">ISBN:</span> {book.isbn}
                  </p>
                )}
                {book.publisher && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Publisher:</span>{" "}
                    {book.publisher}
                  </p>
                )}
                {book.publishedDate && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Published:</span>{" "}
                    {new Date(book.publishedDate).toLocaleDateString()}
                  </p>
                )}
                {book.pages && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Pages:</span> {book.pages}
                  </p>
                )}
                {book.language && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Language:</span>{" "}
                    {book.language}
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {book.stock > 0 ? (
                  <span className="text-green-600 font-semibold">
                    ✓ In Stock ({book.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    ✗ Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              {book.stock > 0 && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x border-gray-300 font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(book.stock, quantity + 1))
                      }
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 px-8 py-3 bg-accent text-white rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Add to Cart
                  </button>
                </div>
              )}

              {/* Back to Books */}
              <Link
                href="/books"
                className="inline-flex items-center gap-2 text-accent hover:text-opacity-80 transition-colors font-medium"
              >
                ← Back to All Books
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
