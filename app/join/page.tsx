'use client';

import { useState } from 'react';
import { Users, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function JoinPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    fathersOrHusbandsName: '',
    address: '',
    pincode: '',
    mobileNo: '',
    voterIdCardNo: '',
    date: '',
    membershipType: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');

      toast.success('Application submitted successfully!', {
        description: 'We will review your application and get back to you soon.',
      });

      setFormData({
        name: '',
        age: '',
        fathersOrHusbandsName: '',
        address: '',
        pincode: '',
        mobileNo: '',
        voterIdCardNo: '',
        date: '',
        membershipType: '',
      });
    } catch (error) {
      toast.error('Failed to submit application', {
        description: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'Be part of decision-making processes',
    'Attend exclusive party events and rallies',
    'Receive regular updates on party activities',
    'Opportunity to volunteer and contribute',
    'Access to training and development programs',
    'Connect with like-minded individuals',
  ];

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      <Header />

      <section className="relative bg-gradient-to-r from-red-600 to-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
              Join Our Movement
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Become a member and help us build a better India for all
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Why Join Us?
                </h2>
              </div>

              <p className="text-gray-600 mb-8">
                By joining Bahujan Kranti Party, you become part of a movement dedicated to creating
                positive change in our nation. Your voice matters, and together we can shape
                the future of India.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-red-50 to-blue-50 border-red-200">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Membership is Free</h3>
                  <p className="text-gray-600">
                    There are no membership fees. We believe in building a strong, inclusive
                    movement where everyone can participate regardless of their financial status.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-6">Membership Application</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-sm font-medium mb-2">
                        Age *
                      </label>
                      <Input
                        id="age"
                        type="number"
                        required
                        min="1"
                        max="120"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="Your age"
                      />
                    </div>

                    <div>
                      <label htmlFor="fathersOrHusbandsName" className="block text-sm font-medium mb-2">
                        Father&apos;s Name / Husband&apos;s Name *
                      </label>
                      <Input
                        id="fathersOrHusbandsName"
                        type="text"
                        required
                        value={formData.fathersOrHusbandsName}
                        onChange={(e) => setFormData({ ...formData, fathersOrHusbandsName: e.target.value })}
                        placeholder="Father's or Husband's name"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Address *
                      </label>
                      <Textarea
                        id="address"
                        required
                        rows={2}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Your residential address"
                      />
                    </div>

                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium mb-2">
                        Pincode *
                      </label>
                      <Input
                        id="pincode"
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="Your 6-digit pincode"
                        pattern="[0-9]{6}"
                      />
                    </div>

                    <div>
                      <label htmlFor="mobileNo" className="block text-sm font-medium mb-2">
                        Mobile No. *
                      </label>
                      <Input
                        id="mobileNo"
                        type="tel"
                        required
                        value={formData.mobileNo}
                        onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div>
                      <label htmlFor="voterIdCardNo" className="block text-sm font-medium mb-2">
                        Voter ID Card No. *
                      </label>
                      <Input
                        id="voterIdCardNo"
                        type="text"
                        required
                        value={formData.voterIdCardNo}
                        onChange={(e) => setFormData({ ...formData, voterIdCardNo: e.target.value })}
                        placeholder="Your voter ID card number"
                      />
                    </div>

                    <div>
                      <label htmlFor="membershipType" className="block text-sm font-medium mb-2">
                        Membership Type *
                      </label>
                      <select
                        id="membershipType"
                        required
                        value={formData.membershipType}
                        onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="">Select membership type</option>
                        <option value="Active Membership">Active Membership</option>
                        <option value="Normal Membership">Normal Membership</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-medium mb-2">
                        Date *
                      </label>
                      <Input
                        id="date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
