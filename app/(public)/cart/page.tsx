'use client';

import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="font-playfair text-4xl font-bold text-darkBlue mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Start shopping to fill your cart with your favorite books!
          </p>
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
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="card flex gap-4"
                >
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={96}
                      height={128}
                      className="w-24 h-32 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-playfair text-lg font-bold text-darkBlue mb-2">
                      {item.title}
                    </h3>
                    <p className="text-lightGold font-bold mb-4">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-darkBlue rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-3 py-1 hover:bg-cream"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 border-l border-r border-darkBlue">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-cream"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="font-playfair text-2xl font-bold text-darkBlue mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">{formatPrice(total * 0.1)}</span>
                </div>
              </div>
              <div className="flex justify-between mb-6 text-lg font-bold">
                <span>Total:</span>
                <span className="text-lightGold">
                  {formatPrice(total * 1.1)}
                </span>
              </div>
              <div className="space-y-3">
                <Link
                  href="/checkout"
                  className="btn btn-primary bg-darkBlue text-white block text-center hover:bg-opacity-90"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => clearCart()}
                  className="btn btn-outline w-full border border-darkBlue text-darkBlue hover:bg-darkBlue hover:text-white"
                >
                  Clear Cart
                </button>
              </div>
              <Link
                href="/books"
                className="text-center block mt-4 text-darkBlue hover:text-lightGold transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}