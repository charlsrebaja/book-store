# 📁 Public Images Folder Structure

This folder contains all public assets and images for the Readify bookstore application.

## Folder Organization

```
public/images/
├── books/          # Book cover images
├── hero/           # Hero section images
├── categories/     # Category-specific images
└── icons/          # Icon assets
```

## Detailed Guide

### 📚 `/books`

**Purpose:** Store book cover images and book-related assets

**File Naming Convention:**

- Use kebab-case for filenames: `book-title-here.jpg`
- Include ISBN or book ID: `9780123456789-cover.jpg`
- Use descriptive names: `fiction-bestseller-2024.jpg`

**Recommended Format:**

- Format: JPG or WebP (for optimization)
- Dimensions: 400x600px (standard book cover)
- Max File Size: 200KB per image

**Example Usage:**

```tsx
<Image
  src="/images/books/the-great-gatsby-cover.jpg"
  alt="The Great Gatsby"
  width={400}
  height={600}
/>
```

---

### 🎨 `/hero`

**Purpose:** Hero section background images and banners

**File Naming Convention:**

- `hero-main.jpg` - Primary hero image
- `hero-secondary.jpg` - Alternative hero
- `banner-${page}.jpg` - Page-specific banners

**Recommended Format:**

- Format: JPG or WebP
- Dimensions: 1920x1080px (16:9 aspect ratio)
- Max File Size: 500KB per image

**Example Usage:**

```tsx
<section
  className="min-h-screen bg-cover bg-center"
  style={{
    backgroundImage: "url(/images/hero/hero-main.jpg)",
  }}
>
  {/* Content */}
</section>
```

---

### 🏷️ `/categories`

**Purpose:** Category thumbnail images and category banners

**File Naming Convention:**

- `fiction-thumbnail.jpg`
- `business-thumbnail.jpg`
- `self-help-thumbnail.jpg`
- `classics-thumbnail.jpg`

**Recommended Format:**

- Format: JPG or WebP
- Dimensions: 800x400px (2:1 aspect ratio)
- Max File Size: 150KB per image

**Example Usage:**

```tsx
<div
  className="w-full h-48 bg-cover rounded-lg"
  style={{
    backgroundImage: "url(/images/categories/fiction-thumbnail.jpg)",
  }}
/>
```

---

### 🎯 `/icons`

**Purpose:** Custom icon assets (SVG, PNG, or high-res icons)

**File Naming Convention:**

- Use descriptive names: `book-icon.svg`
- Include color variant: `book-icon-dark.svg`, `book-icon-light.svg`
- Size in filename (optional): `book-icon-24px.svg`

**Recommended Format:**

- Format: SVG (preferred, scalable) or PNG
- SVG: Any dimensions (scalable)
- PNG: 256x256px or higher for clarity
- Max File Size: 50KB per SVG, 100KB per PNG

**Example Usage:**

```tsx
<img src="/images/icons/book-icon.svg" alt="Book" className="w-6 h-6" />
```

---

## 🚀 Next.js Image Optimization

### Using Next.js Image Component (Recommended)

The `Image` component from `next/image` provides automatic optimization:

```tsx
import Image from "next/image";

export default function BookCard({ book }) {
  return (
    <Image
      src={`/images/books/${book.slug}.jpg`}
      alt={book.title}
      width={400}
      height={600}
      priority={false}
      quality={80}
      placeholder="blur"
    />
  );
}
```

**Benefits:**

- ✅ Automatic format conversion (WebP, AVIF)
- ✅ Responsive image sizes
- ✅ Lazy loading by default
- ✅ Prevents layout shift with `placeholder="blur"`
- ✅ Better Core Web Vitals

### Configuration

Add to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost:3000",
      "your-domain.com",
      // Add external image domains here
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
```

---

## 📋 File Size Guidelines

| Folder         | Recommended Size              | Format    |
| -------------- | ----------------------------- | --------- |
| **books**      | 100-200KB                     | JPG, WebP |
| **hero**       | 300-500KB                     | JPG, WebP |
| **categories** | 100-150KB                     | JPG, WebP |
| **icons**      | 10-50KB (SVG), 50-100KB (PNG) | SVG, PNG  |

---

## 🎨 Image Optimization Tips

### 1. **Compression**

Use tools like:

- [TinyPNG](https://tinypng.com) - Lossy/Lossless compression
- [ImageOptim](https://imageoptim.com) - Mac app
- [FileOptimizer](https://nikkhokkho.sourceforge.io/static.php?page=FileOptimizer) - Windows app

### 2. **Format Selection**

- **JPG:** Use for photos and realistic images
- **PNG:** Use for images with transparency
- **WebP:** Modern format, better compression
- **SVG:** Best for icons and logos

### 3. **Dimensions**

- Always resize to exact dimensions needed
- Use 2x resolution for high-DPI displays
- Test on mobile devices

### 4. **Lazy Loading**

```tsx
<Image
  src="/images/books/cover.jpg"
  alt="Book Cover"
  loading="lazy"
  quality={75}
/>
```

---

## 🔗 Usage Examples

### Book Cover in Card

```tsx
import Image from "next/image";

<div className="glass-card">
  <Image
    src={`/images/books/${book.id}-cover.jpg`}
    alt={book.title}
    width={400}
    height={600}
    className="rounded-lg w-full h-auto"
    quality={85}
  />
  <h3>{book.title}</h3>
</div>;
```

### Hero Image

```tsx
<section
  className="min-h-screen bg-cover bg-center relative"
  style={{
    backgroundImage: "url(/images/hero/hero-main.jpg)",
  }}
>
  <div className="absolute inset-0 bg-black/40"></div>
  {/* Content */}
</section>
```

### Category Thumbnail

```tsx
import Image from "next/image";

<Image
  src={`/images/categories/${category.slug}-thumbnail.jpg`}
  alt={category.name}
  width={800}
  height={400}
  className="rounded-lg"
/>;
```

### Icon

```tsx
<img src="/images/icons/book-icon.svg" alt="Books Icon" className="w-8 h-8" />
```

---

## ✅ Best Practices

1. **Always use `alt` text** for accessibility
2. **Specify dimensions** to prevent layout shift
3. **Use responsive images** with `srcSet`
4. **Lazy load images** outside viewport
5. **Compress before uploading**
6. **Use descriptive filenames** for SEO
7. **Test on different devices** and connections
8. **Monitor Core Web Vitals** (LCP, CLS)
9. **Use WebP format** for better compression
10. **Keep folder structure organized**

---

## 📊 Performance Monitoring

Use Chrome DevTools to check:

- Image dimensions
- File sizes
- Loading times
- Format used
- Cumulative Layout Shift (CLS)

Lighthouse audit:

- Performance score
- Core Web Vitals
- Image optimization opportunities

---

## 🔄 Updating Images

To update an image:

1. Replace the file in the appropriate folder
2. Next.js will invalidate cache automatically
3. Clear browser cache if needed: `Ctrl+Shift+Delete`

For bulk updates:

```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall (if needed)
rm -rf node_modules
npm install
```

---

## 📞 Troubleshooting

### Image Not Showing

- Check file path spelling
- Verify file exists in `public/images/`
- Check file permissions
- Use absolute path starting with `/`

### Image Blurry

- Increase image resolution
- Use WebP format
- Specify correct dimensions

### Image Loading Slow

- Reduce file size with compression
- Use WebP format
- Enable lazy loading
- Check network in DevTools

### Layout Shift Issues

- Always specify `width` and `height`
- Use `placeholder="blur"`
- Calculate aspect ratio correctly

---

**Your public images folder is ready to use!** 🎉

Store all your book covers, hero images, and icons here for optimal performance and organization.
