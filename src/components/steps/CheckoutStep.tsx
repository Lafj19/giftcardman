import React, { useState } from 'react';
import { CardDesign, OrderDetails } from '../../types';
import { Card3D } from '../ui/Card3D';
import { CreditCard, Truck, Package, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface CheckoutStepProps {
  design: CardDesign;
  onBack: () => void;
}

export function CheckoutStep({ design, onBack }: CheckoutStepProps) {
  const [order, setOrder] = useState<OrderDetails>({
    quantity: 100,
    shippingName: '',
    shippingAddress: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const pricePerCard = order.quantity >= 500 ? 1.5 : order.quantity >= 250 ? 2.0 : 2.5;
  const subtotal = order.quantity * pricePerCard;
  const shipping = 15.0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {isSuccess ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center py-16"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Order Confirmed!</h2>
          <p className="text-gray-500 mb-8 text-lg">
            Your custom gift cards are being processed and will be shipped to {order.shippingName} soon.
          </p>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-8 inline-block text-left">
            <p className="text-sm text-gray-500 mb-1">Order Reference</p>
            <p className="font-mono font-medium text-gray-900">#GC-{Math.floor(Math.random() * 1000000)}</p>
          </div>
          <div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-sm"
            >
              Create Another Design
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">Checkout</h2>
            <p className="text-gray-500">Review your design and place your order for physical cards.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Order Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Design Preview</h3>
                <div className="mb-6 pointer-events-none">
                  <Card3D design={design} interactive={false} />
                </div>
                
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Package className="w-4 h-4" /> Quantity
                    </span>
                    <select 
                      value={order.quantity}
                      onChange={(e) => setOrder({ ...order, quantity: Number(e.target.value) })}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value={50}>50 cards</option>
                      <option value={100}>100 cards</option>
                      <option value={250}>250 cards</option>
                      <option value={500}>500 cards</option>
                      <option value={1000}>1000 cards</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price per card</span>
                    <span className="font-medium text-gray-900">${pricePerCard.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="text-2xl font-semibold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-indigo-600" />
                  Shipping Details
                </h3>
                
                <div className="space-y-5 mb-10">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name / Company</label>
                    <input
                      required
                      type="text"
                      value={order.shippingName}
                      onChange={(e) => setOrder({ ...order, shippingName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                    <textarea
                      required
                      rows={3}
                      value={order.shippingAddress}
                      onChange={(e) => setOrder({ ...order, shippingAddress: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                      placeholder="123 Business Rd, Suite 100&#10;City, State, ZIP"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  Payment Information
                </h3>
                
                <div className="space-y-5 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        required
                        type="text"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input
                        required
                        type="text"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-gray-600 hover:text-gray-900 font-medium px-6 py-2"
                  >
                    Back to Customize
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
