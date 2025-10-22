"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: "📊", href: "/admin" },
  { id: "books", label: "Books", icon: "📚", href: "/admin/books" },
  { id: "orders", label: "Orders", icon: "📦", href: "/admin/orders" },
  { id: "users", label: "Users", icon: "👥", href: "/admin/users" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white text-darkBlue min-h-screen fixed left-0 top-0 overflow-y-auto border-r border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link
          href="/admin"
          className="font-playfair text-2xl font-bold text-accent"
        >
          Readify Admin
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-accent text-white font-medium"
                    : "text-darkBlue hover:bg-gray-100"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-darkBlue transition-all"
        >
          <span>🏠</span>
          <span>Back to Store</span>
        </Link>
      </div>
    </aside>
  );
}
