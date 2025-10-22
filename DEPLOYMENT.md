# Readify Bookstore - Vercel Deployment Guide

This guide will walk you through deploying the Readify bookstore application to Vercel.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Build Error Fixes](#build-error-fixes)
3. [Environment Variables Setup](#environment-variables-setup)
4. [Database Setup](#database-setup)
5. [Vercel Deployment Steps](#vercel-deployment-steps)
6. [Post-Deployment Configuration](#post-deployment-configuration)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying to Vercel, ensure you have:

- [x] GitHub account with your repository pushed
- [x] Vercel account (sign up at [vercel.com](https://vercel.com))
- [x] PostgreSQL database (using Neon - production ready)
- [x] Cloudinary account (for image uploads)
- [x] Google OAuth credentials (Optional - for Google sign-in)

---

## Build Error Fixes

### Recent Fixes Applied

The following fixes have been applied to resolve build errors:

1. **Added GET handlers to dynamic API routes** - All dynamic routes now have proper GET methods
2. **Updated Prisma configuration** - Improved database connection handling during build
3. **Modified build script** - Added `prisma generate` to build process
4. **Added postinstall script** - Ensures Prisma Client is generated after dependency installation
5. **Made Google OAuth optional** - Google provider is only added if credentials are present

### Build Command

The build command has been updated in `package.json`:

```bash
"build": "prisma generate && next build"
```

---

## Environment Variables Setup

### Required Environment Variables

You'll need to configure these environment variables in Vercel:

```env
# Database Configuration (PostgreSQL via Neon)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# NextAuth Configuration
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-generated-secret-key"

# Cloudinary Configuration (Required for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Google OAuth (Optional - for Google Sign-In)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Generating NEXTAUTH_SECRET

Run this command in your terminal to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Database Setup

### Option 1: Using PlanetScale (Recommended)

1. **Sign up at [planetscale.com](https://planetscale.com)**
2. **Create a new database:**
   - Click "New database"
   - Name it (e.g., `readify-bookstore`)
   - Select your preferred region

3. **Get connection string:**
   - Go to your database dashboard
   - Click "Connect"
   - Select "Prisma" as framework
   - Copy the `DATABASE_URL`

4. **Update Prisma schema** (if using PlanetScale):
   ```prisma
   datasource db {
     provider     = "mysql"
     url          = env("DATABASE_URL")
     relationMode = "prisma" // Add this for PlanetScale
   }
   ```

### Option 2: Using Railway

1. **Sign up at [railway.app](https://railway.app)**
2. **Create new MySQL database**
3. **Copy the connection string** from the Variables tab

### Option 3: Using Your Own MySQL Server

Ensure your MySQL server:

- Is accessible from the internet
- Has proper firewall rules configured
- Uses SSL connection (recommended)

---

## Vercel Deployment Steps

### Step 1: Import Project to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "Add New Project"**
3. **Import your GitHub repository:**
   - Select your GitHub account
   - Search for `book-store` repository
   - Click "Import"

### Step 2: Configure Project Settings

1. **Framework Preset:** Next.js (auto-detected)
2. **Root Directory:** `./` (leave as default)
3. **Build Command:** `npm run build` (default)
4. **Output Directory:** `.next` (default)
5. **Install Command:** `npm install` (default)

### Step 3: Add Environment Variables

In the "Environment Variables" section, add all required variables:

| Key                    | Value                        | Example                                    |
| ---------------------- | ---------------------------- | ------------------------------------------ |
| `DATABASE_URL`         | Your MySQL connection string | `mysql://user:pass@host:3306/db`           |
| `NEXTAUTH_URL`         | Your Vercel deployment URL   | `https://readify.vercel.app`               |
| `NEXTAUTH_SECRET`      | Generated secret key         | `your-32-char-secret`                      |
| `GOOGLE_CLIENT_ID`     | Google OAuth Client ID       | `123456789-abc.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret   | `GOCSPX-xxxxxxxxxxxxx`                     |
| `NODE_ENV`             | production                   | `production`                               |

**Important:** Make sure to add these for all environments (Production, Preview, Development)

### Step 4: Deploy

1. **Click "Deploy"**
2. **Wait for build to complete** (usually 2-5 minutes)
3. **Vercel will provide a deployment URL**

---

## Post-Deployment Configuration

### 1. Run Database Migrations

After first deployment, you need to initialize your database:

**Option A: Using Vercel CLI**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Run migrations
vercel env pull .env.local
npx prisma migrate deploy
npx prisma db push
```

**Option B: Using Local Machine**

```bash
# Set DATABASE_URL temporarily to production database
DATABASE_URL="your-production-database-url" npx prisma db push

# Seed the database (optional)
DATABASE_URL="your-production-database-url" npm run seed
```

### 2. Configure Google OAuth (if using)

1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. **Select your project**
3. **Go to "Credentials"**
4. **Edit your OAuth 2.0 Client**
5. **Add Authorized redirect URIs:**
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```
6. **Add Authorized JavaScript origins:**
   ```
   https://your-domain.vercel.app
   ```

### 3. Update NEXTAUTH_URL

If you get a custom domain:

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Update `NEXTAUTH_URL`** to your custom domain
5. **Redeploy** the application

### 4. Seed Initial Data

If you need to populate the database with initial books/data:

```bash
# Using the seed script
DATABASE_URL="your-production-url" node prisma/seed.js
```

Or create an admin API endpoint to seed data (more secure).

---

## Custom Domain Setup (Optional)

### 1. Add Custom Domain

1. **Go to your project in Vercel**
2. **Click "Settings" → "Domains"**
3. **Add your custom domain** (e.g., `readify.com`)
4. **Follow Vercel's DNS configuration instructions**

### 2. Update Environment Variables

```env
NEXTAUTH_URL="https://your-custom-domain.com"
```

### 3. Update Google OAuth (if using)

Add your custom domain to Google OAuth settings.

---

## Monitoring and Logs

### View Deployment Logs

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Click on "Deployments"**
4. **Click on any deployment to view logs**

### Runtime Logs

1. **Go to your project**
2. **Click "Logs" in the top navigation**
3. **Filter by date/time to debug issues**

---

## Performance Optimization

### 1. Enable Edge Caching

Already configured in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

### 2. Image Optimization

Images are automatically optimized by Next.js on Vercel.

### 3. Analytics (Optional)

Enable Vercel Analytics:

1. Go to your project
2. Click "Analytics" tab
3. Click "Enable Analytics"

---

## Troubleshooting

### Common Issues

#### 1. Build Fails

**Error:** `Error: Cannot find module 'prisma'`

**Solution:**

```bash
# Add prisma as a dependency
npm install prisma --save-dev
git add . && git commit -m "Add prisma as dev dependency"
git push
```

#### 2. Database Connection Fails

**Error:** `Can't reach database server`

**Solutions:**

- Verify `DATABASE_URL` is correct
- Ensure database allows connections from Vercel IP addresses
- Check if database is running
- Verify SSL settings if required

#### 3. Environment Variables Not Loading

**Solution:**

- Go to Vercel Dashboard → Settings → Environment Variables
- Ensure variables are set for "Production" environment
- Redeploy after adding variables

#### 4. NextAuth Errors

**Error:** `[next-auth][error] OAUTH_CALLBACK_ERROR`

**Solutions:**

- Verify `NEXTAUTH_URL` matches your deployment URL
- Check `NEXTAUTH_SECRET` is set
- Verify Google OAuth redirect URIs include your Vercel URL

#### 5. Prisma Client Errors

**Error:** `Prisma Client could not be generated`

**Solution:**

```bash
# Add postinstall script to package.json
"scripts": {
  "postinstall": "prisma generate"
}
```

#### 6. 500 Internal Server Error

**Check logs:**

1. Go to Vercel Dashboard
2. Click "Logs"
3. Look for error messages
4. Common causes:
   - Missing environment variables
   - Database connection issues
   - Prisma client not generated

---

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

### Disable Auto-Deployment (Optional)

1. Go to Project Settings
2. Click "Git"
3. Disable "Production Branch" or specific branches

---

## Rollback Deployment

If something goes wrong:

1. **Go to "Deployments" tab**
2. **Find the previous working deployment**
3. **Click the three dots (···)**
4. **Click "Promote to Production"**

---

## Environment-Specific Configurations

### Development

```env
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="mysql://root:password@localhost:3306/bookshop"
```

### Production

```env
NEXTAUTH_URL="https://your-domain.vercel.app"
DATABASE_URL="mysql://user:pass@production-host/bookshop"
```

---

## Security Checklist

- [x] `.env` files are in `.gitignore`
- [x] `NEXTAUTH_SECRET` is strong and unique
- [x] Database credentials are secure
- [x] Google OAuth redirect URIs are exact
- [x] Environment variables are set in Vercel (not in code)
- [x] Database has proper access controls
- [x] SSL/HTTPS is enabled (automatic on Vercel)

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

---

## Support

If you encounter issues:

1. **Check Vercel Logs** for error messages
2. **Review [Vercel Status](https://vercel-status.com/)** for platform issues
3. **Consult [Next.js Discussions](https://github.com/vercel/next.js/discussions)**
4. **Check [Prisma GitHub Issues](https://github.com/prisma/prisma/issues)**

---

## Deployment Checklist

Before going live:

- [ ] All environment variables are set in Vercel
- [ ] Database is set up and accessible
- [ ] Prisma migrations are applied
- [ ] Test user authentication (email + Google)
- [ ] Test book browsing and search
- [ ] Test cart functionality
- [ ] Test checkout process
- [ ] Test admin dashboard access
- [ ] Custom domain is configured (if applicable)
- [ ] Google OAuth is configured with production URLs
- [ ] Analytics are enabled (optional)
- [ ] Error monitoring is set up (optional)

---

**Congratulations! Your Readify bookstore is now live on Vercel! 🎉📚**
