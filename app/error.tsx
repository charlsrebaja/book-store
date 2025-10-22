"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Root Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <h1 className="font-playfair text-6xl font-bold text-darkBlue mb-2">
            ⚠️
          </h1>
          <h2 className="font-playfair text-3xl font-bold text-darkBlue mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-2">
            We encountered an unexpected error.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Error: {error.message || "Unknown error"}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="w-full bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition font-medium"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="block w-full bg-darkBlue text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-medium"
          >
            Go Home
          </Link>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          {error.digest && <p>Error ID: {error.digest}</p>}
        </div>
      </div>
    </div>
  );
}
