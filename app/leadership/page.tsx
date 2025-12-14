'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Briefcase, MapPin, ChevronLeft, ChevronRight, Star, Award } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const STATE_PRESIDENTS = [
  {
    id: 1,
    state: 'Uttar Pradesh',
    president: 'Mr. Keshava Chandra Pandey',
    position: 'State President - Uttar Pradesh',
    image: '/papa.jpg',
    bio: 'Visionary leader driving the party movement in Uttar Pradesh'
  },
  {
    id: 2,
    state: 'Maharashtra',
    president: 'Coming Soon',
    position: 'State President - Maharashtra',
    image: 'https://ui-avatars.com/api/?name=Coming+Soon&background=3B82F6&color=fff',
    bio: 'Building strong grassroots organization across Maharashtra'
  },
  {
    id: 3,
    state: 'Bihar',
    president: 'Coming Soon',
    position: 'State President - Bihar',
    image: 'https://ui-avatars.com/api/?name=Coming+Soon&background=3B82F6&color=fff',
    bio: 'Leading the movement for social change in Bihar'
  },
  {
    id: 4,
    state: 'West Bengal',
    president: 'Coming Soon',
    position: 'State President - West Bengal',
    image: 'https://ui-avatars.com/api/?name=Coming+Soon&background=3B82F6&color=fff',
    bio: 'Championing inclusive development in West Bengal'
  },
  {
    id: 5,
    state: 'Tamil Nadu',
    president: 'Coming Soon',
    position: 'State President - Tamil Nadu',
    image: 'https://ui-avatars.com/api/?name=Coming+Soon&background=3B82F6&color=fff',
    bio: 'Driving progressive politics in Tamil Nadu'
  }
];

const NATIONAL_COMMITTEE = [
  { id: 1, name: 'Coming Soon', position: 'Vice President' },
  { id: 2, name: 'Coming Soon', position: 'General Secretary' },
  { id: 3, name: 'Coming Soon', position: 'Treasurer' },
  { id: 4, name: 'Coming Soon', position: 'Joint Secretary' },
  { id: 5, name: 'Coming Soon', position: 'Spokesperson' },
  { id: 6, name: 'Coming Soon', position: 'Media Head' },
];

export default function LeadershipPage() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % STATE_PRESIDENTS.length);
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + STATE_PRESIDENTS.length) % STATE_PRESIDENTS.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-red-900 to-blue-900 py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-block">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white/80 text-sm font-medium">
              <Star className="h-4 w-4 text-yellow-400" />
              Meet Our Leaders
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Visionary Leadership<br />
            <span className="bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
              for a Better India
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Dedicated individuals united in their mission to create positive change and empower every citizen
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                  <div className="aspect-square overflow-hidden bg-gray-200">
                    <img
                      src="/president.jpg"
                      alt="National President"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Award className="h-5 w-5 text-red-600" />
                      <span className="text-red-600 font-bold text-sm uppercase tracking-widest">National President</span>
                      <Award className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      Mr. Ranjeet Singh
                    </h3>
                    <p className="text-gray-500 font-medium">
                      Leading the Movement
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">National Committee</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-blue-600 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {NATIONAL_COMMITTEE.map((member, idx) => (
                  <div
                    key={member.id}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-600/10 to-blue-600/10 rounded-bl-full"></div>
                    <div className="relative">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-blue-600 text-white font-bold text-lg">
                            {idx + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">{member.position}</p>
                          <p className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">{member.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-6 inline-block">
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
                <Users className="h-4 w-4" />
                State Leadership
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              State Presidents
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visionary leaders driving our movement across India
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                <div className="lg:col-span-2 h-full min-h-96 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 relative">
                  <img
                    src={STATE_PRESIDENTS[carouselIndex].image}
                    alt={STATE_PRESIDENTS[carouselIndex].president}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="lg:col-span-3 flex flex-col justify-between p-8 sm:p-12">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-6 font-bold text-xs uppercase tracking-widest">
                      <MapPin className="h-4 w-4" />
                      {STATE_PRESIDENTS[carouselIndex].state}
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-2">
                      {STATE_PRESIDENTS[carouselIndex].president}
                    </h3>
                    <p className="text-red-600 font-bold mb-6 text-lg">
                      {STATE_PRESIDENTS[carouselIndex].position}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-lg mb-8">
                      {STATE_PRESIDENTS[carouselIndex].bio}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={prevCarousel}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <ChevronLeft className="h-5 w-5" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>
                    <button
                      onClick={nextCarousel}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-12 flex-wrap">
              {STATE_PRESIDENTS.map((pres, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselIndex(index)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${index === carouselIndex
                    ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  aria-label={`Go to ${pres.state}`}
                >
                  {pres.state}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-6 inline-block">
              <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
                <Users className="h-4 w-4" />
                Expand Our Reach
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              State Committees
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover opportunities to serve your state and strengthen our movement
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
            {INDIAN_STATES.map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(selectedState === state ? null : state)}
                className={`group relative p-4 rounded-2xl font-bold transition-all duration-300 text-sm text-center overflow-hidden ${selectedState === state
                  ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-900 shadow-md hover:shadow-lg hover:scale-102 border border-gray-200'
                  }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{state}</span>
                </div>
              </button>
            ))}
          </div>

          {selectedState && (
            <div className="mt-12 animate-fade-in">
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-200 max-w-3xl mx-auto">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full mb-4 font-bold text-xs uppercase tracking-widest">
                      <MapPin className="h-4 w-4" />
                      {selectedState}
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900">{selectedState} Committee</h3>
                  </div>
                  <button
                    onClick={() => setSelectedState(null)}
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors text-2xl h-10 w-10 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-5 mt-8">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    The <span className="font-bold text-blue-600">{selectedState}</span> committee is dedicated to building our party&apos;s presence and leadership across the state. We are actively recruiting talented individuals who share our vision for a progressive and inclusive India.
                  </p>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-l-4 border-blue-600 p-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🏛️</span>
                      <div>
                        <p className="text-gray-900 font-bold text-lg mb-1">Committee Structure</p>
                        <p className="text-gray-700 text-sm">
                          Committee details and members for {selectedState} will be available soon as we expand our leadership team and establish stronger foundations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-300 p-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🤝</span>
                      <div>
                        <p className="text-gray-900 font-bold text-lg mb-1">Get Involved</p>
                        <p className="text-gray-700 text-sm">
                          Interested in joining the {selectedState} committee? We welcome passionate individuals committed to making a difference. Contact us to learn more!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
