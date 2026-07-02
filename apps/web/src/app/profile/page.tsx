'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Section } from '@/components/Layout';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import apiClient from '@/utils/api';

interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
}

interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    fetchProfile();
    fetchAddresses();
  }, [isAuthenticated, router]);

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get('/api/users/profile');
      setProfile(response.data);
      setFormData({
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
        phone: response.data.phone || '',
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await apiClient.get('/api/users/addresses');
      setAddresses(response.data);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put('/api/users/profile', formData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Section>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-32 bg-gray-200 rounded" />
          </div>
        </Section>
      </Container>
    );
  }

  return (
    <Container>
      <Section>
        <div className="mb-8">
          <Button onClick={() => router.push('/dashboard')}>← Back to Dashboard</Button>
        </div>

        <h1 className="heading-lg mb-8">My Profile</h1>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>

          {!isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">First Name</p>
                  <p className="font-semibold">{profile?.firstName || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Name</p>
                  <p className="font-semibold">{profile?.lastName || 'Not set'}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{profile?.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold">{profile?.phone || 'Not set'}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input-base"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input-base"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>

              <input
                type="tel"
                placeholder="Phone"
                className="input-base"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Save Changes
              </Button>
            </form>
          )}
        </motion.div>

        {/* Addresses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Saved Addresses</h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push('/profile/add-address')}
            >
              + Add Address
            </Button>
          </div>

          {addresses.length === 0 ? (
            <div className="card text-center py-8">
              <p className="text-gray-600 mb-4">No addresses saved yet</p>
              <Button
                variant="ghost"
                onClick={() => router.push('/profile/add-address')}
              >
                Add Your First Address
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card relative"
                >
                  {address.isDefault && (
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Default
                    </div>
                  )}

                  <p className="text-sm text-gray-600 mb-3 capitalize">{address.type}</p>

                  <div className="space-y-1 text-sm">
                    <p className="font-semibold">{address.street}</p>
                    <p>{address.city}, {address.state} {address.postalCode}</p>
                    <p>{address.country}</p>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Delete</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </Section>
    </Container>
  );
}
