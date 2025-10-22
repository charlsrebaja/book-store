'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import axios from 'axios';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [error, setError] = useState('');

  const total = getTotalPrice();
  const taxRate = 0.1;
  const tax = total * taxRate;
  const finalTotal = total + tax;

  const handleCheckout = async () => {
    if (!session?.user) {
      router.push('/auth/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: items.map((item) => ({
          bookId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total: finalTotal,
      };

      const response = await axios.post('/api/orders', orderData);

      if (response.status === 201) {
        // Here you would integrate with Stripe, Gcash, or PayPal
        clearCart();
        router.push(`/order-confirmation/${response.data.id}`);
      }
    } catch (err) {
      setError('Failed to process order. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl font-bold text-darkBlue mb-4">
            Checkout
          </h1>
          <p className="text-gray-600 mb-8">Your cart is empty</p>
          <Link
            href="/books"
            className="btn btn-primary bg-darkBlue text-white hover:bg-opacity-90 inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="font-playfair text-5xl font-bold text-darkBlue mb-12">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Billing Information */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-playfair text-2xl font-bold text-darkBlue mb-6">
                Billing Information
              </h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-darkBlue mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    defaultValue={session?.user?.name || ''}
                    className="input-field"
                    placeholder="Full Name"
                    aria-label="Full Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-darkBlue mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    defaultValue={session?.user?.email || ''}
                    className="input-field"
                    placeholder="you@example.com"
                    aria-label="Email"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-darkBlue mb-2">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    className="input-field"
                    placeholder="123 Main St"
                    aria-label="Address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-darkBlue mb-2">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      className="input-field"
                      placeholder="City"
                      aria-label="City"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-darkBlue mb-2">
                      ZIP Code
                    </label>
                    <input
                      id="zip"
                      type="text"
                      className="input-field"
                      placeholder="ZIP Code"
                      aria-label="ZIP Code"
                    />
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-playfair text-2xl font-bold text-darkBlue mb-6">
                Payment Method
              </h2>
              <div className="space-y-3">
                {[
                  { value: 'stripe', label: 'Stripe' },
                  { value: 'gcash', label: 'GCash' },
                  { value: 'paypal', label: 'PayPal' },
                ].map((method) => (
                  <label key={method.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-medium text-darkBlue">{method.label}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card sticky top-24">
              <h2 className="font-playfair text-2xl font-bold text-darkBlue mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-300">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.title} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%):</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 text-lg font-bold">
                <span>Total:</span>
                <span className="text-lightGold">{formatPrice(finalTotal)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="btn btn-primary bg-darkBlue text-white w-full hover:bg-opacity-90 disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay ${formatPrice(finalTotal)}`}
              </button>

              <Link
                href="/cart"
                className="text-center block mt-4 text-darkBlue hover:text-lightGold transition"
              >
                Back to Cart
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}