"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public Page Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <h1 className="font-playfair text-6xl font-bold text-darkBlue mb-2">
            404
          </h1>
          <h2 className="font-playfair text-2xl font-bold text-darkBlue mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or an error
            occurred.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="w-full bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium"
          >
            Try Again
          </button>
          <Link
            href="/books"
            className="block w-full bg-darkBlue text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-medium"
          >
            Browse Books
          </Link>
          <Link
            href="/"
            className="block w-full border-2 border-accent text-accent px-6 py-2 rounded-lg hover:bg-accent hover:text-white transition font-medium"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
