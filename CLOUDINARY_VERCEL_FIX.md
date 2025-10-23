# Fix Cloudinary Images on Vercel - Complete Guide

## Problem

Cloudinary images work locally but fail after deploying to Vercel.

## Root Causes

1. ❌ Missing environment variable in Vercel
2. ❌ Incomplete `next.config.js` configuration
3. ❌ Images might not be publicly accessible
4. ❌ Environment variable not exposed to client-side

---

## ✅ Solution: Step-by-Step Fix

### Step 1: Update `next.config.js` Configuration

Your current config is correct, but let's make it more robust:

```javascript
// ✅ IMAGE OPTIMIZATION
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      port: "",
      pathname: "/**", // Allow all paths
    },
  ],
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 31536000, // 1 year for static images
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
},
```

**Key Addition:** `pathname: "/**"` ensures all Cloudinary paths are allowed.

---

### Step 2: Set Environment Variables in Vercel

#### A. Go to Vercel Dashboard

1. Navigate to: https://vercel.com/dashboard
2. Select your project: **bookshop** (or your project name)
3. Click **Settings** tab
4. Click **Environment Variables** in the sidebar

#### B. Add Cloudinary Variables

Add these THREE variables (all are important):

| Variable Name                       | Value                         | Environment                      |
| ----------------------------------- | ----------------------------- | -------------------------------- |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `drrtvz6sl`                   | Production, Preview, Development |
| `CLOUDINARY_API_KEY`                | `773341824149577`             | Production, Preview, Development |
| `CLOUDINARY_API_SECRET`             | `nhxIUq1zTgOBWmyYPxWGYNb6dEw` | Production, Preview, Development |

**✨ IMPORTANT:**

- Check **ALL THREE** environment checkboxes (Production, Preview, Development)
- The `NEXT_PUBLIC_` prefix is **critical** for client-side access
- Without `NEXT_PUBLIC_`, the variable won't be available in the browser

#### C. Screenshot Guide

```
┌─────────────────────────────────────────────┐
│ Environment Variables                        │
├─────────────────────────────────────────────┤
│ Name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME     │
│ Value: drrtvz6sl                            │
│ ☑ Production  ☑ Preview  ☑ Development     │
│                                 [Add]        │
└─────────────────────────────────────────────┘
```

---

### Step 3: Verify Cloudinary Image Settings

#### A. Check Image Upload Settings

1. Go to: https://cloudinary.com/console
2. Navigate to **Settings** → **Upload**
3. Ensure **"Strict transformations"** is **DISABLED**
4. Set **Access Control** to **Public** (not authenticated)

#### B. Test Image URL Format

Your images should follow this format:

```
https://res.cloudinary.com/drrtvz6sl/image/upload/v1234567890/folder/image.jpg
```

**Correct formats:**

- ✅ `https://res.cloudinary.com/drrtvz6sl/image/upload/image.jpg`
- ✅ `https://res.cloudinary.com/drrtvz6sl/image/upload/v1234567890/image.jpg`
- ✅ `https://res.cloudinary.com/drrtvz6sl/image/upload/c_fill,w_300,h_300/image.jpg`

**Incorrect formats:**

- ❌ `https://cloudinary.com/...` (missing `res.`)
- ❌ Missing cloud name
- ❌ Private/authenticated images without signed URLs

---

### Step 4: Update Your Image Code (If Needed)

#### Current Code (Your approach):

```javascript
const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${imageName}`;
```

✅ **This is correct!** Just ensure:

1. `imageName` doesn't include the full URL (only the public_id)
2. The environment variable is set in Vercel

#### Example Usage with Next.js Image Component:

```tsx
import Image from "next/image";

export default function BookCard({ book }) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${book.imageUrl}`;

  return (
    <Image
      src={imageUrl}
      alt={book.title}
      width={300}
      height={400}
      className="rounded-lg"
    />
  );
}
```

#### Alternative: Using Cloudinary SDK (More Robust)

```bash
npm install cloudinary-build-url
```

```javascript
import { buildImageUrl } from "cloudinary-build-url";

const imageUrl = buildImageUrl(imageName, {
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  transformations: {
    resize: {
      type: "fill",
      width: 300,
      height: 400,
    },
  },
});
```

---

### Step 5: Redeploy to Vercel

#### Option A: Automatic Redeploy (Recommended)

After adding environment variables, Vercel requires a new deployment:

1. Go to **Deployments** tab in Vercel
2. Click the **three dots (...)** on the latest deployment
3. Click **Redeploy**
4. Or simply push a new commit:

```bash
# Make a small change or use --allow-empty
git commit --allow-empty -m "Trigger redeploy with Cloudinary env vars"
git push origin main
```

#### Option B: Manual Trigger

```bash
# Using Vercel CLI
vercel --prod
```

---

### Step 6: Test Environment Variables in Production

#### Method 1: Create a Test API Route

Create `app/api/test-env/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    hasApiKey: !!process.env.CLOUDINARY_API_KEY,
    hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
    nodeEnv: process.env.NODE_ENV,
  });
}
```

Then visit: `https://your-app.vercel.app/api/test-env`

Expected output:

```json
{
  "cloudName": "drrtvz6sl",
  "hasApiKey": true,
  "hasApiSecret": true,
  "nodeEnv": "production"
}
```

#### Method 2: Browser Console Check

Add this temporarily to any client component:

```tsx
useEffect(() => {
  console.log(
    "Cloudinary Cloud Name:",
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  );
}, []);
```

Open browser console and check if the value appears.

#### Method 3: Check Build Logs

1. Go to Vercel Dashboard → **Deployments**
2. Click on latest deployment
3. Check **Build Logs**
4. Look for environment variable references

---

### Step 7: Verify Images Load Correctly

#### A. Test Direct Image URL

Open browser and visit:

```
https://res.cloudinary.com/drrtvz6sl/image/upload/YOUR_IMAGE_NAME.jpg
```

If this loads ✅, your image is public and accessible.

#### B. Check Network Tab

1. Open your deployed site
2. Open Developer Tools (F12)
3. Go to **Network** tab
4. Filter by **Img**
5. Check if Cloudinary images load with **200 status**

#### C. Common Error Codes

- **403 Forbidden** → Image is private or strict transformations enabled
- **404 Not Found** → Wrong public_id or cloud name
- **Failed to load** → CORS issue or next.config.js misconfiguration

---

## 🚨 Common Issues & Solutions

### Issue 1: "Failed to load image"

**Cause:** Environment variable not set correctly

**Solution:**

1. Double-check spelling: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
2. Ensure all three environments are checked in Vercel
3. Redeploy after adding variables

### Issue 2: Images load but are broken/distorted

**Cause:** Incorrect image dimensions or transformations

**Solution:**

```tsx
<Image
  src={imageUrl}
  alt={book.title}
  width={300}
  height={400}
  quality={90}
  priority={false}
  loading="lazy"
/>
```

### Issue 3: "Invalid src prop"

**Cause:** `next.config.js` doesn't allow the hostname

**Solution:** Ensure `remotePatterns` includes Cloudinary (see Step 1)

### Issue 4: Environment variable is `undefined`

**Cause:** Missing `NEXT_PUBLIC_` prefix

**Solution:**

- Client-side variables **MUST** start with `NEXT_PUBLIC_`
- Server-side variables don't need this prefix

---

## ✅ Verification Checklist

Before considering this fixed, verify:

- [ ] Environment variables added in Vercel (all 3)
- [ ] All three environments checked (Production, Preview, Development)
- [ ] `next.config.js` updated with `pathname: "/**"`
- [ ] Committed changes and pushed to GitHub
- [ ] Vercel redeployed automatically (or manually triggered)
- [ ] Test API endpoint returns correct values
- [ ] Images load on production site
- [ ] No 403/404 errors in Network tab
- [ ] Browser console shows correct cloud name

---

## 📝 Quick Reference

### Environment Variables Format

```env
# Client-side (exposed to browser)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=drrtvz6sl

# Server-side only (NOT exposed to browser)
CLOUDINARY_API_KEY=773341824149577
CLOUDINARY_API_SECRET=nhxIUq1zTgOBWmyYPxWGYNb6dEw
```

### Image URL Structure

```
https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}
                           └─────────┘                └──────────────┘ └─────────┘
                           Your cloud name            Optional         Image filename

                           
```

### Next.js Image Component Example

```tsx
import Image from "next/image";

const CloudinaryImage = ({ publicId, alt }) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const url = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;

  return (
    <Image
      src={url}
      alt={alt}
      width={300}
      height={400}
      className="object-cover rounded-lg"
    />
  );
};
```

---

## 🎯 Final Test Command

After deploying, run this in your browser console on the production site:

```javascript
// Test environment variable
console.log("Cloud Name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

// Test image URL construction
const testUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/sample.jpg`;
console.log("Test URL:", testUrl);

// Try loading a test image
fetch(testUrl)
  .then((res) => console.log("Image status:", res.status))
  .catch((err) => console.error("Image error:", err));
```

Expected output:

```
Cloud Name: drrtvz6sl
Test URL: https://res.cloudinary.com/drrtvz6sl/image/upload/sample.jpg
Image status: 200
```

---

## 📞 Need More Help?

If images still don't work after following all steps:

1. **Check Vercel Build Logs** for errors
2. **Verify Cloudinary Console** - ensure images are public
3. **Test with Cloudinary's sample image**: `sample.jpg`
4. **Check browser console** for specific error messages
5. **Review Network tab** for failed requests

**Sample Test Image:**

```
https://res.cloudinary.com/drrtvz6sl/image/upload/sample.jpg
```

If this URL works in browser, your Cloudinary setup is correct!

---

## Summary

The key steps are:

1. ✅ Add `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` to Vercel environment variables
2. ✅ Update `next.config.js` with `pathname: "/**"`
3. ✅ Ensure images are public in Cloudinary
4. ✅ Redeploy on Vercel
5. ✅ Test with API endpoint or browser console

Your images should now work perfectly in production! 🎉
