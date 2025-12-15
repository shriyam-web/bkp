'use client';

import { Target, Eye, Award, History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative bg-gradient-to-r from-red-600 to-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
              About Bahujan Kranti Party
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Building a progressive, inclusive India through dedicated service and people-centric policies
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2015, Bahujan Kranti Party emerged from a vision to create a political movement that truly represents the aspirations of every Indian citizen. Our journey began with a small group of dedicated individuals committed to bringing about positive change in our nation.
                </p>
                <p>
                  Over the years, we have grown into a national movement, with millions of members across all states and union territories. Our grassroots approach has enabled us to understand the real challenges faced by ordinary citizens and craft policies that address their needs.
                </p>
                <p>
                  Today, we stand as a party that believes in inclusive growth, sustainable development, and equal opportunities for all. Our commitment to transparency, accountability, and good governance has earned us the trust of citizens from all walks of life.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Party gathering"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-t-4 border-red-600">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 mb-4">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To build a strong, self-reliant, and prosperous India where every citizen has access to quality education, healthcare, employment, and justice. We strive to create a nation that honors its rich heritage while embracing progress and innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-green-500">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 mb-4">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  We envision an India that leads the world in economic growth, technological advancement, and human development. A nation where diversity is celebrated, opportunities are equal, and every citizen lives with dignity and security.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-blue-500">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Values</h3>
                <p className="text-gray-600">
                  Integrity, transparency, inclusivity, and service to the nation form the bedrock of our party. We believe in participatory democracy, social justice, environmental sustainability, and the empowerment of all sections of society.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <History className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
                  2015
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Foundation</h3>
                <p className="text-gray-600">
                  Bahujan Kranti Party was officially founded with a core group of 50 founding members committed to bringing positive change to Indian politics.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
                  2017
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">First Electoral Success</h3>
                <p className="text-gray-600">
                  Won seats in 5 state assemblies, establishing our presence as a credible alternative in Indian politics.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
                  2019
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">National Expansion</h3>
                <p className="text-gray-600">
                  Expanded to all states and union territories with over 5 million registered members across the country.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
                  2024
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Strengthening Democracy</h3>
                <p className="text-gray-600">
                  Continuing to grow and serve the nation with renewed commitment to transparent governance and inclusive policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Be part of a movement that is shaping the future of India
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
