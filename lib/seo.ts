import type { Metadata } from "next";

export const DEFAULT_METADATA: Metadata = {
  title: {
    default: "Readify - Your Online Bookstore",
    template: "%s | Readify",
  },
  description:
    "Discover and purchase your favorite books from around the world with Readify, the premier digital bookstore.",
  keywords: [
    "books",
    "bookstore",
    "online shopping",
    "e-commerce",
    "reading",
    "digital books",
    "book store online",
  ],
  authors: [{ name: "Readify Team" }],
  creator: "Readify",
  publisher: "Readify",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Readify",
    title: "Readify - Your Online Bookstore",
    description:
      "Discover and purchase your favorite books from around the world with Readify.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Readify - Your Online Bookstore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Readify - Your Online Bookstore",
    description:
      "Discover and purchase your favorite books from around the world with Readify.",
    creator: "@readifybooks",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

/**
 * Generate metadata for individual pages
 * @param title - Page title
 * @param description - Page description
 * @param path - URL path (for canonical)
 * @param image - OG image URL
 */
export function generatePageMetadata(
  title: string,
  description: string,
  path: string = "/",
  image?: string
): Metadata {
  const imageUrl = image || "/og-image.png";

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

/**
 * Generate JSON-LD structured data for Book
 */
export function generateBookSchema(book: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: book.author,
    },
    image: book.imageUrl,
    description: book.description,
    price: book.price,
    priceCurrency: "USD",
    offers: {
      "@type": "Offer",
      price: book.price,
      priceCurrency: "USD",
      availability: "InStock",
      seller: {
        "@type": "Organization",
        name: "Readify",
      },
    },
    review: {
      "@type": "Review",
      ratingValue: book.rating,
      reviewCount: book.reviews,
    },
  };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Readify",
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    logo: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/logo.png`,
    description: "Readify - Your Online Bookstore",
    sameAs: [
      "https://www.facebook.com/readify",
      "https://www.twitter.com/readifybooks",
      "https://www.instagram.com/readifybooks",
    ],
  };
}

/**
 * Generate JSON-LD structured data for LocalBusiness
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Readify",
    description: "Your Online Bookstore",
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    priceRange: "$$",
    image: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/og-image.png`,
    areaServed: "US",
  };
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
