'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sampleOrders = [
  {
    id: 'ORD-001',
    date: 'October 15, 2024',
    total: '$450.00',
    status: 'Delivered',
    statusColor: 'green',
    products: [
      { name: 'Mountain Bike Pro', quantity: 1, price: '$400.00' },
      { name: 'Bike Helmet', quantity: 1, price: '$50.00' },
    ],
    shippingAddress: '123 Main Street, New York, NY 10001',
    paymentMethod: 'Credit Card ending in 4242',
  },
  {
    id: 'ORD-002',
    date: 'October 10, 2024',
    total: '$280.50',
    status: 'In Transit',
    statusColor: 'blue',
    products: [
      { name: 'Road Bike', quantity: 1, price: '$280.50' },
    ],
    shippingAddress: '456 Business Avenue, New York, NY 10002',
    paymentMethod: 'PayPal',
  },
  {
    id: 'ORD-003',
    date: 'October 1, 2024',
    total: '$89.99',
    status: 'Processing',
    statusColor: 'yellow',
    products: [
      { name: 'Bike Chain Lubricant', quantity: 2, price: '$19.99' },
      { name: 'Handlebar Grips', quantity: 1, price: '$50.00' },
    ],
    shippingAddress: '123 Main Street, New York, NY 10001',
    paymentMethod: 'Credit Card ending in 4242',
  },
];

export default function OrdersSection() {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-2">View and track your orders</p>
      </div>

      {/* Orders List */}
      {sampleOrders.length > 0 ? (
        <div className="space-y-4">
          {sampleOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {/* Order Header */}
              <button
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
                className="w-full p-6 hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="text-lg font-semibold text-gray-900">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="text-lg font-semibold text-gray-900">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-lg font-semibold text-gray-900">{order.total}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedOrder === order.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <>
                  <div className="border-t border-gray-200" />
                  <div className="p-6 bg-gray-50 space-y-6">
                    {/* Products */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                      <div className="bg-white rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product</th>
                              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Quantity</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Price</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {order.products.map((product, idx) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-900">{product.name}</td>
                                <td className="px-4 py-3 text-center text-gray-600">{product.quantity}</td>
                                <td className="px-4 py-3 text-right text-gray-900 font-semibold">{product.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Address</h3>
                      <p className="text-gray-700">{order.shippingAddress}</p>
                    </div>

                    {/* Payment Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Method</h3>
                      <p className="text-gray-700">{order.paymentMethod}</p>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-end">
                        <div className="text-right">
                          <p className="text-gray-600 text-sm mb-1">Order Total</p>
                          <p className="text-2xl font-bold text-gray-900">{order.total}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-gray-600 mb-4">No orders yet</p>
          <p className="text-gray-500">Start shopping to see your orders here</p>
        </div>
      )}
    </div>
  );
}
