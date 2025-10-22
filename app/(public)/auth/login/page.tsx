"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else if (result?.ok) {
        // Fetch user session to determine redirect path
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();

        if (session?.user) {
          const userRole = (session.user as any)?.role;
          if (userRole === "ADMIN") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        className="bg-white rounded-xl shadow-soft p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-playfair text-3xl font-bold text-darkBlue mb-2 text-center">
          Sign In
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Welcome back to Readify
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-darkBlue mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-darkBlue mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary bg-darkBlue text-white w-full hover:bg-opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <button
          onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
          className="btn btn-outline w-full border-2 border-darkBlue text-darkBlue mb-6"
        >
          Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?
          <Link
            href="/auth/register"
            className="text-lightGold hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
