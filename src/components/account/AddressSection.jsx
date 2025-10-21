'use client';

import { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import AddressModal from './AddressModal';

export default function AddressSection() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: 2,
      label: 'Office',
      street: '456 Business Avenue',
      city: 'New York',
      state: 'NY',
      postalCode: '10002',
      country: 'USA',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddAddress = (newAddress) => {
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editingAddress.id ? { ...newAddress, id: addr.id } : addr))
      );
      setEditingAddress(null);
    } else {
      setAddresses((prev) => [...prev, { ...newAddress, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowModal(true);
  };

  const handleDeleteAddress = (id) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    }
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAddress(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Addresses</h1>
          <p className="text-gray-600 mt-2">Manage your delivery addresses</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors w-fit"
        >
          <Plus className="w-5 h-5" />
          Add Address
        </button>
      </div>

      {/* Address Grid */}
      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              {/* Header with Label and Default Badge */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{address.label}</h3>
                {address.isDefault && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                    Default
                  </span>
                )}
              </div>

              {/* Address Details */}
              <div className="space-y-2 mb-6 text-gray-700">
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
                <p className="text-sm text-gray-600">Phone: {address.phone}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4" />

              {/* Actions */}
              <div className="flex gap-3 justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="flex items-center gap-1 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="flex items-center gap-1 px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="px-3 py-2 text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium"
                  >
                    Set Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-gray-600 mb-4">No addresses yet</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
          >
            Add Your First Address
          </button>
        </div>
      )}

      {/* Modal */}
      <AddressModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={handleAddAddress}
        initialData={editingAddress}
      />
    </div>
  );
}
