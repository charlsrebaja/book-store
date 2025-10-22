"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import { useCartStore } from "@/lib/store";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  imageUrl?: string;
  rating: number;
  reviews: number;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<
    "price-low" | "price-high" | "rating" | "newest"
  >("newest");
  const [totalBooks, setTotalBooks] = useState(0);
  const [booksPerPage] = useState(12);

  // Zustand cart store
  const addToCart = useCartStore((state) => state.addToCart);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/books", {
        params: {
          category: category !== "all" ? category : undefined,
          search: search || undefined,
          page,
          limit: booksPerPage,
          sort: sortBy,
        },
      });
      setBooks(response.data.books);
      setTotalBooks(response.data.total || response.data.books.length);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, [category, search, page, booksPerPage, sortBy]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleAddToCart = (book: Book) => {
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      imageUrl: book.imageUrl,
    });

    // Show feedback animation
    setAddedItems((prev) => new Set([...prev, book.id]));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(book.id);
        return newSet;
      });
    }, 1500);
  };

  const categories = ["all", "Fiction", "Business", "Self-Help", "Classics"];
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  return (
    <div className="bg-white min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-darkBlue mb-3">
            Browse Our Collection
          </h1>
          <p className="text-gray-600 text-lg">
            Discover {totalBooks} books across multiple categories
          </p>
        </motion.div>

        {/* Filters & Sorting */}
        <motion.div
          className="mb-12 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-darkBlue mb-3">
              Search Books
            </label>
            <input
              type="text"
              placeholder="Search by title, author, or description..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-accent focus:outline-none transition bg-white text-darkBlue placeholder-gray-500"
            />
          </div>

          {/* Categories & Sorting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categories */}
            <div>
              <label className="block text-sm font-semibold text-darkBlue mb-3">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      category === cat
                        ? "bg-accent text-white shadow-md"
                        : "bg-gray-100 text-darkBlue border border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label
                htmlFor="sort-select"
                className="block text-sm font-semibold text-darkBlue mb-3"
              >
                Sort By
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  setPage(1);
                }}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-accent focus:outline-none transition bg-white text-darkBlue font-medium"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Books Count */}
        {!loading && books.length > 0 && (
          <p className="text-sm text-gray-600 mb-6">
            Showing {books.length} of {totalBooks} books
          </p>
        )}

        {/* Books Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-[#4B5563]">
              No books found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 auto-rows-max w-full">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  className="min-w-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="group cursor-pointer h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-accent/20">
                    {/* Book Cover Container - Uniform Height, 2:3 Aspect Ratio */}
                    <Link
                      href={`/books/${book.id}`}
                      className="flex-1 relative"
                    >
                      <div className="relative w-full aspect-[2/3] mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl overflow-hidden shadow-xs flex items-center justify-center group-hover:shadow-md transition-shadow">
                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 z-10 bg-yellow-400 text-darkBlue px-3 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1">
                          <span>★</span>
                          {book.rating}
                        </div>

                        {book.imageUrl ? (
                          <Image
                            src={book.imageUrl}
                            alt={book.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            priority={false}
                            quality={80}
                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-darkBlue/10">
                            <span className="text-5xl">📚</span>
                          </div>
                        )}
                      </div>

                      {/* Book Info */}
                      <div className="p-4 space-y-3">
                        <h3 className="font-playfair text-lg font-bold text-darkBlue line-clamp-2 group-hover:text-accent transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600">{book.author}</p>
                        <div className="flex items-center gap-1 text-gray-600">
                          <span className="text-yellow-500">★</span>
                          <span className="text-xs">
                            {book.rating} ({book.reviews} reviews)
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-accent">
                          ${book.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>

                    {/* Add to Cart Button - Outside Link */}
                    <div className="px-4 pb-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(book);
                        }}
                        className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                          addedItems.has(book.id)
                            ? "bg-green-500 text-white shadow-md"
                            : "bg-accent text-white hover:bg-opacity-90 shadow-md hover:shadow-lg"
                        }`}
                      >
                        {addedItems.has(book.id)
                          ? "✓ Added to Cart!"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && books.length > 0 && totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center gap-3 mt-16 pb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 text-darkBlue font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-2 rounded-lg font-medium transition ${
                    page === p
                      ? "bg-accent text-white shadow-md"
                      : "border-2 border-gray-200 text-darkBlue hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 text-darkBlue font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
