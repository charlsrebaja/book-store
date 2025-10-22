"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error("Failed to fetch stats:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <div className="mb-8">
        <h1 className="font-playfair text-4xl font-bold text-darkBlue mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here&apos;s what&apos;s happening with your bookstore
          today.
        </p>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {loading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card">
                <div className="animate-pulse">
                  <div className="h-12 w-12 mx-auto bg-gray-300 rounded-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">📚</div>
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Books
                </div>
              </div>
              <p className="text-gray-600 mb-2 font-medium">Total Books</p>
              <p className="text-3xl font-bold text-darkBlue">
                {stats.totalBooks}
              </p>
            </div>

            <div className="card bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">📦</div>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Orders
                </div>
              </div>
              <p className="text-gray-600 mb-2 font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-darkBlue">
                {stats.totalOrders}
              </p>
            </div>

            <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">👥</div>
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  Users
                </div>
              </div>
              <p className="text-gray-600 mb-2 font-medium">Total Users</p>
              <p className="text-3xl font-bold text-darkBlue">
                {stats.totalUsers}
              </p>
            </div>

            <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">💰</div>
                <div className="bg-lightGold text-darkBlue px-3 py-1 rounded-full text-sm font-medium">
                  Revenue
                </div>
              </div>
              <p className="text-gray-600 mb-2 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-lightGold">
                ${stats.totalRevenue.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </motion.div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="font-playfair text-2xl font-bold text-darkBlue mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push("/admin/books")}
            className="p-4 bg-darkBlue text-white rounded-lg hover:bg-opacity-90 transition flex items-center gap-3"
          >
            <span className="text-2xl">📚</span>
            <span className="font-medium">Manage Books</span>
          </button>
          <button
            onClick={() => router.push("/admin/orders")}
            className="p-4 bg-sage text-white rounded-lg hover:bg-opacity-90 transition flex items-center gap-3"
          >
            <span className="text-2xl">📦</span>
            <span className="font-medium">View Orders</span>
          </button>
          <button
            onClick={() => router.push("/admin/users")}
            className="p-4 bg-lightGold text-darkBlue rounded-lg hover:bg-opacity-90 transition flex items-center gap-3"
          >
            <span className="text-2xl">👥</span>
            <span className="font-medium">Manage Users</span>
          </button>
        </div>
      </div>
    </>
  );
}
