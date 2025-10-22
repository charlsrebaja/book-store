"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md bg-white p-8 rounded-xl shadow-soft">
        <div className="mb-6">
          <h1 className="font-playfair text-5xl font-bold text-red-600 mb-2">
            ⚠️
          </h1>
          <h2 className="font-playfair text-2xl font-bold text-darkBlue mb-2">
            Admin Error
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            Something went wrong in the admin panel.
          </p>
          <div className="bg-red-50 border border-red-200 rounded p-3 text-left">
            <p className="text-xs text-red-700 font-mono break-words">
              {error.message || "Unknown error"}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => reset()}
            className="w-full bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = "/admin")}
            className="w-full bg-darkBlue text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-medium"
          >
            Return to Dashboard
          </button>
        </div>

        {error.digest && (
          <p className="mt-4 text-xs text-gray-500">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
