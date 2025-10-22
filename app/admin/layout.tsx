"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }

    if (
      status === "authenticated" &&
      (session?.user as any)?.role !== "ADMIN"
    ) {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-darkBlue"></div>
      </div>
    );
  }

  if ((session?.user as any)?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed on left */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 bg-gradient-to-br from-white via-gray-50 to-blue-50">
        {/* Top Navbar */}
        <AdminNavbar />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
