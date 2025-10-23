# Readify - Online Bookstore Platform

A fully functional e-commerce bookstore website built with Next.js 14, Tailwind CSS, Prisma ORM, and MySQL. Features user authentication, shopping cart, checkout process, and admin dashboard.

## Project Overview

Readify is a modern, responsive bookstore platform that allows users to browse, search, and purchase books online. It includes a comprehensive admin dashboard for managing inventory, orders, and analytics.

**Project Lead & Developer:** Charls, Full Stack Developer  
**Built with ❤️ using:** Next.js, Tailwind CSS, Prisma, MySQL, and NextAuth.js

---

## Features

### Public / User Features
- ✅ Browse and search books by title, author, or description
- ✅ Filter books by category, price range, or ratings
- ✅ Add books to cart and manage cart items
- ✅ User authentication (sign up / login with email or Google)
- ✅ Responsive design for mobile & desktop
- ✅ Book detail pages with reviews and ratings
- ✅ Secure checkout with multiple payment options

### Admin Features
- ✅ Admin dashboard with stats and analytics
- ✅ CRUD operations for books (Add / Edit / Delete)
- ✅ Order management and tracking
- ✅ User management
- ✅ Sales analytics and reports
- ✅ Inventory management

---

## Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Framer Motion** - Animations

### Backend
- **Next.js API Routes** - Backend APIs
- **Prisma ORM** - Database ORM
- **NextAuth.js** - Authentication

### Database
- **MySQL** (via XAMPP) - Relational database
- Alternative: PostgreSQL (via Neon)

### Payment & Services
- **Stripe** (Test Mode) - Payment processing
- **GCash** (Test Mode) - Mobile payments
- **PayPal** (Test Mode) - Online payments
- **Cloudinary** - Image hosting (optional)

---

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MySQL running (via XAMPP or another MySQL server)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/readify.git
cd readify
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mysql://root:@localhost:3306/readify"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Stripe Keys (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"
STRIPE_SECRET_KEY="sk_test_your_secret_key"

# Cloudinary (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### Step 4: Set Up MySQL Database

1. Open XAMPP Control Panel and start MySQL
2. Create a new database named `readify`:
   ```sql
   CREATE DATABASE readify;
   ```

### Step 5: Run Prisma Setup
```bash
# Generate Prisma client
npx prisma generate

# Create tables in the database
npx prisma db push

# Seed the database with sample data
npm run prisma:seed
```

### Step 6: Start the Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

---

## Default Test Accounts

After running the seed script, you can log in with:

### Admin Account
- **Email:** admin@readify.com
- **Password:** admin123
- **Role:** Admin

### Regular User Account
- **Email:** user@readify.com
- **Password:** user123
- **Role:** User

---

## Project Structure

```
readify/
├── app/                              # Next.js App Router
│   ├── api/                          # API Routes
│   │   ├── auth/
│   │   │   ├── route.ts             # NextAuth handler
│   │   │   └── register/            # Registration endpoint
│   │   ├── books/                   # Books API
│   │   └── orders/                  # Orders API
│   ├── auth/                         # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── books/                        # Books browsing
│   ├── cart/                         # Shopping cart
│   ├── checkout/                     # Checkout page
│   ├── admin/                        # Admin dashboard
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   └── globals.css                   # Global styles
│
├── components/                       # React Components
│   ├── navbar/                       # Navigation bar
│   ├── footer/                       # Footer
│   ├── ui/                          # UI components
│   ├── cards/                       # Card components
│   └── forms/                       # Form components
│
├── lib/                              # Utility functions
│   ├── prisma.ts                    # Prisma client
│   ├── auth.ts                      # NextAuth configuration
│   └── utils.ts                     # Helper functions
│
├── hooks/                            # Custom React hooks
│   └── useCart.ts                   # Cart state management
│
├── prisma/                           # Prisma schema & seed
│   ├── schema.prisma                # Database schema
│   └── seed.js                      # Sample data
│
├── public/                           # Static assets
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts               # Tailwind config
├── next.config.js                   # Next.js config
├── postcss.config.js                # PostCSS config
└── .env.local                       # Environment variables
```

---

## Available Scripts

```bash
# Development
npm run dev              # Start dev server at http://localhost:3000

# Production
npm run build            # Build for production
npm start                # Start production server

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Sync database schema
npm run prisma:seed      # Seed database with sample data

# Code Quality
npm run lint             # Run ESLint
```

---

## Database Schema

### User Model
```typescript
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String?
  role      Role     @default(USER)
  image     String?
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Book Model
```typescript
model Book {
  id          String      @id @default(cuid())
  title       String
  author      String
  description String      @db.Text
  price       Float
  category    String
  imageUrl    String?
  stock       Int
  rating      Float       @default(0)
  reviews     Int         @default(0)
  orderItems  OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}
```

### Order & OrderItem Models
```typescript
model Order {
  id        String      @id @default(cuid())
  userId    String
  user      User        @relation(fields: [userId], references: [id])
  items     OrderItem[]
  total     Float
  status    String      @default("pending")
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}

model OrderItem {
  id       String @id @default(cuid())
  orderId  String
  bookId   String
  quantity Int
  price    Float
  order    Order  @relation(fields: [orderId], references: [id])
  book     Book   @relation(fields: [bookId], references: [id])
}
```

---

## Authentication

The project uses **NextAuth.js** with two authentication methods:

### Email/Password Authentication
- Users can sign up with email and password
- Passwords are hashed using bcryptjs
- Session-based authentication with JWT

### Google OAuth
- Users can sign in with their Google account
- Automatically creates a user account on first login

---

## UI Design

### Color Scheme
- **Cream:** `#F5F5DC` - Background color
- **Dark Blue:** `#1A3A52` - Primary text and buttons
- **Light Gold:** `#D4AF37` - Accent color
- **Sage:** `#9CAF88` - Secondary accents

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

### Design Features
- Minimalist bookstore aesthetic
- Soft shadows and rounded corners
- Framer Motion animations for smooth transitions
- Mobile-first responsive design
- Accessibility-friendly UI

---

## Payment Integration

### Stripe (Default)
```javascript
// Test card numbers: 4242 4242 4242 4242
// Use any future expiration date and CVC
```

### GCash
Test mode credentials available in Stripe/GCash documentation

### PayPal
Sandbox mode testing available via PayPal developer portal

---

## Testing Checklist

- [ ] User can browse and search books
- [ ] Category and price filtering works
- [ ] Add/remove items from cart
- [ ] Cart persists across page refreshes
- [ ] User registration and login flow
- [ ] Email/password authentication
- [ ] Google OAuth login
- [ ] Checkout process
- [ ] Order creation and confirmation
- [ ] Admin can add/edit/delete books
- [ ] Admin can view orders and users
- [ ] Admin dashboard shows correct stats
- [ ] Mobile responsiveness on all pages
- [ ] Animations and transitions smooth
- [ ] Database queries optimized

---

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

```bash
# Or deploy via CLI
vercel
```

### Production Checklist
- [ ] Change `NEXTAUTH_SECRET` to a random string
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Set up production database
- [ ] Configure Stripe production keys
- [ ] Set up Google OAuth for production domain
- [ ] Enable HTTPS
- [ ] Set up error logging
- [ ] Configure CI/CD pipeline

---

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running (`XAMPP` > `MySQL Start`)
- Check `DATABASE_URL` in `.env.local`
- Verify database exists: `CREATE DATABASE readify;`

### Module Not Found Errors
- Delete `node_modules` and `.next`
- Run `npm install` again
- Restart dev server

### NextAuth Errors
- Ensure `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are set
- Check Google OAuth credentials
- Verify callback URLs in Google Console

### Prisma Errors
- Run `npx prisma generate`
- Run `npx prisma db push`
- Check schema syntax in `prisma/schema.prisma`

---

## Roadmap

### Phase 2
- [ ] Book reviews and ratings system
- [ ] Wishlist functionality
- [ ] Order tracking and notifications
- [ ] Email notifications
- [ ] Discount codes and coupons
- [ ] Newsletter subscription

### Phase 3
- [ ] Social login (Facebook, GitHub)
- [ ] Advanced analytics dashboard
- [ ] Inventory alerts
- [ ] Author profiles
- [ ] Book recommendations
- [ ] API documentation

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For support, email support@readify.com or open an issue on GitHub.

---

## Credits

**Developed by:** Charls, Full Stack Developer  
**Role:** Project Lead, Full Stack Development, UI/UX Design  
**Built with ❤️ using:** Next.js, Tailwind CSS, Prisma, and MySQL

---

## Changelog

### v1.0.0 - Initial Release
- Complete authentication system with NextAuth.js
- Book browsing with search and filtering
- Shopping cart with Zustand state management
- Checkout page with payment method selection
- Admin dashboard with basic CRUD operations
- Responsive design for all devices
- Database seed with sample books
- API routes for books, orders, and authentication

---

## Live Demo

**Coming Soon!** - Will be deployed to Vercel

**Local Development:** http://localhost:3000

---

**Happy Reading! 📚**



