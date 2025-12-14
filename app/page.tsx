'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Users, Lightbulb, TrendingUp, HandHeart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NewsCard from '@/components/NewsCard';
import EventCard from '@/components/EventCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PoliticalCarousel from '@/components/PoliticalCarousel';


interface News {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  published_at: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  image_url: string;
}

export default function Home() {
  const [news, setNews] = useState<News[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [newsRes, eventsRes] = await Promise.all([
          fetch('/api/news').then(res => res.json()),
          fetch('/api/events').then(res => res.json()),
        ]);

        if (newsRes.data) setNews(newsRes.data.slice(0, 3));
        if (eventsRes.data) setEvents(eventsRes.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const values = [
    {
      icon: Heart,
      title: 'Unity in Diversity',
      description: 'Celebrating our rich cultural heritage while building a united nation',
    },
    {
      icon: Users,
      title: 'People First',
      description: 'Every policy crafted with the welfare of citizens at its core',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Embracing technology and new ideas for sustainable growth',
    },
    {
      icon: TrendingUp,
      title: 'Progress',
      description: 'Building infrastructure and opportunities for all Indians',
    },
  ];

  const initiatives = [
    {
      icon: HandHeart,
      title: 'Healthcare for All',
      description: 'Universal healthcare coverage ensuring no citizen is left behind',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: BookOpen,
      title: 'Education Revolution',
      description: 'Quality education accessible to every child across the nation',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Users,
      title: 'Employment Generation',
      description: 'Creating millions of jobs through skill development and entrepreneurship',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 h-full w-full">
          <PoliticalCarousel />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-5" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Building a{' '}
              <span className="bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
                Stronger India
              </span>{' '}
              Together
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Join us in our mission to create a progressive, inclusive, and prosperous nation
              where every citizen has the opportunity to thrive.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/join">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-lg">
                  Join Our Movement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/manifesto">
                <Button size="lg" variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white text-lg">
                  Read Our Vision
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-red-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Principles that guide every decision we make for the nation
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="border-t-4 border-red-600 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-blue-600 mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Key Initiatives
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transformative programs designed to uplift every Indian
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${initiative.color} opacity-10 rounded-bl-full`} />
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${initiative.color} mb-4`}>
                  <initiative.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{initiative.title}</h3>
                <p className="text-gray-600">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {news.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                  Latest News
                </h2>
                <p className="text-lg text-gray-600">
                  Stay updated with our recent activities and announcements
                </p>
              </div>
              <Link href="/news">
                <Button variant="outline" className="hidden sm:flex">
                  View All News
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <NewsCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {events.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                  Upcoming Events
                </h2>
                <p className="text-lg text-gray-600">
                  Join us at our events and be part of the change
                </p>
              </div>
              <Link href="/events">
                <Button variant="outline" className="hidden sm:flex">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of citizens working towards a better India. Your voice matters.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/join">
              <Button size="lg" variant="secondary" className="text-lg">
                Become a Member
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-black border-white hover:bg-white/10 text-lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
