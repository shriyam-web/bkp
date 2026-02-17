'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { useTranslations } from '@/lib/TranslationContext';

interface Event {
  _id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  image_url: string;
}

export default function EventsPage() {
  const { t, locale } = useTranslations();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        const result = await response.json();

        if (result.data) setEvents(result.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative bg-gradient-to-r from-red-600/90 to-blue-600/90 py-24 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-6xl mb-6 tracking-tight">
              {locale === 'hi' ? 'आने वाले कार्यक्रम' : 'Upcoming Events'}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
              {locale === 'hi'
                ? 'हमारे कार्यक्रमों में हमारे साथ जुड़ें और वह परिवर्तन का हिस्सा बनें जो आप देखना चाहते हैं'
                : 'Join us at our events and be part of the change you want to see'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
              <p className="mt-6 text-muted-foreground font-medium text-lg">{locale === 'hi' ? 'कार्यक्रम लोड हो रहे हैं...' : 'Loading events...'}</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} {...event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground text-xl font-medium max-w-md mx-auto">
                {locale === 'hi'
                  ? 'इस समय कोई आने वाला कार्यक्रम नहीं है। रोमांचक घोषणाओं के लिए जल्द ही वापस जांचें!'
                  : 'No upcoming events at the moment. Check back soon for exciting announcements!'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
