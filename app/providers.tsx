"use client";

import { SessionProvider } from "next-auth/react";
import React, { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Clear service workers to prevent cache issues
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister().catch((err) => {
            console.error("Failed to unregister service worker:", err);
          });
        });
      });
    }

    // Prevent browser from caching CSS/JS
    const meta = document.createElement("meta");
    meta.httpEquiv = "cache-control";
    meta.content = "no-cache, no-store, must-revalidate";
    document.head.appendChild(meta);

    const pragma = document.createElement("meta");
    pragma.httpEquiv = "pragma";
    pragma.content = "no-cache";
    document.head.appendChild(pragma);

    const expires = document.createElement("meta");
    expires.httpEquiv = "expires";
    expires.content = "0";
    document.head.appendChild(expires);
  }, []);

  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
}
