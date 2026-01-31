'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Users, Lightbulb, TrendingUp, HandHeart, BookOpen, Quote, Shield, Globe, Award, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NewsCard from '@/components/NewsCard';
import EventCard from '@/components/EventCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PoliticalCarousel from '@/components/PoliticalCarousel';
import { useTranslations } from '@/lib/TranslationContext';

interface News {
  _id: string;
  title: string;
  excerpt: string;
  image_url: string;
  published_at: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  image_url: string;
}

export default function HomePage() {
  const { t, locale } = useTranslations();
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
      title: t('home.democracy', 'Democracy'),
      description: t('home.democracyDesc', 'Strengthening democratic institutions and citizen participation'),
    },
    {
      icon: Users,
      title: t('home.equality', 'Equality'),
      description: t('home.equalityDesc', 'Ensuring equal opportunities for all citizens regardless of background'),
    },
    {
      icon: Lightbulb,
      title: t('home.transparency', 'Transparency'),
      description: t('home.transparencyDesc', 'Operating with complete transparency and accountability'),
    },
    {
      icon: TrendingUp,
      title: t('home.inclusion', 'Inclusion'),
      description: t('home.inclusionDesc', 'Building an inclusive society that celebrates diversity'),
    },
  ];

  const initiatives = [
    {
      icon: HandHeart,
      title: t('home.healthcare', 'Healthcare for All'),
      description: t('home.healthcareDesc', 'Universal healthcare coverage ensuring no citizen is left behind'),
      color: 'from-red-500 to-red-600',
    },
    {
      icon: BookOpen,
      title: t('home.education', 'Education Revolution'),
      description: t('home.educationDesc', 'Quality education accessible to every child across the nation'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Users,
      title: t('home.employment', 'Employment Generation'),
      description: t('home.employmentDesc', 'Creating millions of jobs through skill development and entrepreneurship'),
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 h-full w-full">
          <PoliticalCarousel />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent z-5" />

        {/* Decorative Elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute bottom-20 right-[20%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-bounce duration-[10000ms] z-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-red-500 ring-1 ring-inset ring-white/20 mb-8 backdrop-blur-md animate-fade-in">
              <span className="flex h-3 w-3 rounded-full bg-red-600 mr-3 animate-ping" />
              {locale === 'hi' ? 'परिवर्तन की लहर' : 'A MOVEMENT FOR CHANGE'}
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-6 leading-tight drop-shadow-xl">
              {locale === 'hi' ? 'बहुजन क्रांति पार्टी' : 'BAHUJAN KRANTI'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-blue-600 animate-gradient-x italic">
                {locale === 'hi' ? '(मार्क्सवाद-अंबेडकरवाद)' : 'PARTY (MARXWAAD-AMBEDKARWAAD)'}
              </span>
            </h1>

            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl font-medium border-l-4 border-red-600 pl-6 backdrop-blur-sm bg-black/5 py-2">
              {locale === 'hi'
                ? 'मार्क्सवादी और अंबेडकरवादी सिद्धांतों के प्रति प्रतिबद्ध एक राजनीतिक आंदोलन, जो सामाजिक समानता और श्रमिकों के अधिकारों के लिए समर्पित है।'
                : 'A political movement committed to Marxist and Ambedkarite principles, dedicated to social equality and empowering the masses.'}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link href={`/${locale}/join`}>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 h-14 rounded-full shadow-lg shadow-red-900/20 transition-all hover:scale-105 active:scale-95 group">
                  {t('home.ctaJoin', 'Join Our Movement')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={`/${locale}/manifesto`}>
                <Button size="lg" variant="outline" className="bg-white/5 text-white border-white/30 hover:bg-white/10 backdrop-blur-md text-lg px-8 h-14 rounded-full border-2 transition-all">
                  {t('home.ctaLearnMore', 'Read Our Vision')}
                </Button>
              </Link>

              <div className="hidden lg:flex items-center gap-3 ml-6 text-white/60">
                <div className="flex h-8 w-8 rounded-full border-2 border-white/20 bg-white/5 items-center justify-center">
                  <Heart className="h-4 w-4 text-red-500" />
                </div>
                <span className="text-xs font-bold tracking-widest">{locale === 'hi' ? 'सक्रिय स्वयंसेवक' : 'ACTIVE VOLUNTEERS'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase">{locale === 'hi' ? 'नीचे देखें' : 'Scroll Down'}</span>
          <ChevronDown className="h-6 w-6 text-white" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: locale === 'hi' ? 'सक्रिय सदस्य' : 'Active Members', value: locale === 'hi' ? 'बढ़ता हुआ' : 'Growing', icon: Users, color: 'text-blue-600' },
            { label: locale === 'hi' ? 'क्षेत्र कवर' : 'Areas Covered', value: locale === 'hi' ? 'सक्रिय' : 'Active', icon: Globe, color: 'text-red-600' },
            { label: locale === 'hi' ? 'आयोजित कार्यक्रम' : 'Events Held', value: locale === 'hi' ? 'नियमित' : 'Regular', icon: Award, color: 'text-blue-600' },
            { label: locale === 'hi' ? 'स्वयंसेवक' : 'Volunteers', value: locale === 'hi' ? 'समर्पित' : 'Dedicated', icon: Heart, color: 'text-red-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-gray-100 hover:scale-105 transition-transform">
              <div className={`p-3 rounded-xl bg-gray-50 ${stat.color} mb-3`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm font-medium text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-red-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              {t('home.values', 'Our Core Values')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === 'hi' ? 'सिद्धांत जो हम राष्ट्र के लिए हर निर्णय में लागू करते हैं' : 'Principles that guide every decision we make for the nation'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="group border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ideology Section */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4 bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent inline-block">
              {locale === 'hi' ? 'हमारी वैचारिक बुनियाद' : 'Our Ideological Foundations'}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {locale === 'hi' ? 'डॉ. बी.आर. अंबेडकर और कार्ल मार्क्स की दूरदर्शी सोच से प्रेरित' : 'Guided by the visionary thinking of Dr. B.R. Ambedkar and Karl Marx'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 relative">
              <Quote className="absolute top-8 right-8 h-12 w-12 text-white/10" />
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-red-500">
                  <img src="/ambedkar.jpg" alt="Dr. B.R. Ambedkar" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Dr. B.R. Ambedkar</h3>
                  <p className="text-red-400 text-sm">{locale === 'hi' ? 'संविधान निर्माता' : 'Architect of Indian Constitution'}</p>
                </div>
              </div>
              <p className="text-2xl font-medium leading-relaxed italic text-gray-200">
                "{locale === 'hi' ? 'शिक्षित बनो, संगठित रहो, संघर्ष करो।' : 'Educate, Agitate, Organize.'}"
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 relative">
              <Quote className="absolute top-8 right-8 h-12 w-12 text-white/10" />
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-blue-500 bg-gray-800 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Karl Marx</h3>
                  <p className="text-blue-400 text-sm">{locale === 'hi' ? 'दार्शनिक और अर्थशास्त्री' : 'Philosopher & Economist'}</p>
                </div>
              </div>
              <p className="text-2xl font-medium leading-relaxed italic text-gray-200">
                "{locale === 'hi' ? 'दुनिया के मजदूरों एक हो जाओ, तुम्हारे पास खोने के लिए कुछ नहीं है सिवाय अपनी बेड़ियों के।' : 'Workers of the world unite; you have nothing to lose but your chains.'}"
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              {locale === 'hi' ? 'मुख्य पहल' : 'Key Initiatives'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === 'hi' ? 'प्रत्येक भारतीय को उन्नत करने के लिए डिजाइन किए गए परिवर्तनकारी कार्यक्रम' : 'Transformative programs designed to uplift every Indian'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${initiative.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`} />
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${initiative.color} mb-6 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-300`}>
                  <initiative.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{initiative.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{initiative.description}</p>
                <Link href={`/${locale}/manifesto`} className="inline-flex items-center text-sm font-bold text-red-600 group-hover:translate-x-2 transition-transform duration-300">
                  {locale === 'hi' ? 'विवरण देखें' : 'Learn More'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                {locale === 'hi' ? 'हमारा नेतृत्व' : 'Our Leadership'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                {locale === 'hi' ? 'एक समृद्ध और न्यायपूर्ण भारत के लिए आंदोलन का नेतृत्व करने वाले समर्पित क्रांतिकारी' : 'Dedicated revolutionaries leading the movement for a prosperous and just India'}
              </p>
            </div>
            <Link href={`/${locale}/leadership`}>
              <Button variant="outline" className="rounded-full px-8 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all">
                {locale === 'hi' ? 'सभी नेताओं से मिलें' : 'Meet All Leaders'}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* President Card - Featured */}
            <div className="lg:col-span-1 bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img src="/president.jpg" alt="National President" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-block px-3 py-1 bg-red-600 text-[10px] font-bold tracking-widest uppercase rounded-full mb-2">
                    {locale === 'hi' ? 'राष्ट्रीय अध्यक्ष' : 'National President'}
                  </div>
                  <h3 className="text-2xl font-bold">{locale === 'hi' ? 'श्री रंजीत सिंह' : 'Mr. Ranjeet Singh'}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 italic mb-6">
                  "{locale === 'hi' ? 'हमारा मिशन हर नागरिक को सशक्त बनाना और सामाजिक न्याय सुनिश्चित करना है।' : 'Our mission is to empower every citizen and ensure social justice.'}"
                </p>
                <Link href={`/${locale}/leadership?memberId=president`}>
                  <Button variant="ghost" className="w-full justify-between hover:bg-red-50 hover:text-red-600 group/btn">
                    {locale === 'hi' ? 'प्रोफ़ाइल देखें' : 'View Profile'}
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Other Leaders / Cards placeholder */}
            <div className="flex flex-col gap-8 lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white flex flex-col justify-between h-full relative overflow-hidden group">
                  <Users className="absolute -right-8 -bottom-8 h-48 w-48 text-white/10 group-hover:scale-110 transition-transform duration-700" />
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{locale === 'hi' ? 'राष्ट्रीय समिति' : 'National Committee'}</h3>
                    <p className="text-blue-100 leading-relaxed">
                      {locale === 'hi' ? 'पार्टी की केंद्रीय निर्णय लेने वाली संस्था जो हमारे मिशन का मार्गदर्शन करती है।' : 'The central decision-making body of the party guiding our national mission.'}
                    </p>
                  </div>
                  <Link href={`/${locale}/leadership`}>
                    <Button className="w-fit bg-white text-blue-800 hover:bg-blue-50 mt-8">
                      {locale === 'hi' ? 'समिति देखें' : 'View Committee'}
                    </Button>
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-8 text-white flex flex-col justify-between h-full relative overflow-hidden group">
                  <Shield className="absolute -right-8 -bottom-8 h-48 w-48 text-white/10 group-hover:scale-110 transition-transform duration-700" />
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{locale === 'hi' ? 'राज्य नेतृत्व' : 'State Leadership'}</h3>
                    <p className="text-red-100 leading-relaxed">
                      {locale === 'hi' ? 'जमीनी स्तर पर बदलाव लाने के लिए भारत के प्रत्येक राज्य में हमारे समर्पित प्रतिनिधि।' : 'Our dedicated representatives in every state of India working for grassroots change.'}
                    </p>
                  </div>
                  <Link href={`/${locale}/leadership`}>
                    <Button className="w-fit bg-white text-red-800 hover:bg-red-50 mt-8">
                      {locale === 'hi' ? 'राज्यों का चयन करें' : 'Select State'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {news.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                  {t('news.title', 'Latest News')}
                </h2>
                <p className="text-lg text-gray-600">
                  {locale === 'hi' ? 'हमारी हाल की गतिविधियों और घोषणाओं के साथ अपडेट रहें' : 'Stay updated with our recent activities and announcements'}
                </p>
              </div>
              <Link href={`/${locale}/news`}>
                <Button variant="outline" className="hidden sm:flex">
                  {locale === 'hi' ? 'सभी समाचार देखें' : 'View All News'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <NewsCard key={item._id} id={item._id} {...item} />
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
                  {t('events.title', 'Upcoming Events')}
                </h2>
                <p className="text-lg text-gray-600">
                  {locale === 'hi' ? 'हमारे कार्यक्रमों में शामिल हों और परिवर्तन का हिस्सा बनें' : 'Join us at our events and be part of the change'}
                </p>
              </div>
              <Link href={`/${locale}/events`}>
                <Button variant="outline" className="hidden sm:flex">
                  {locale === 'hi' ? 'सभी कार्यक्रम देखें' : 'View All Events'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} {...event} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-gradient-to-br from-red-700 via-red-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-extrabold sm:text-5xl mb-6 leading-tight">
                {locale === 'hi' ? 'परिवर्तन का हिस्सा बनें' : 'Be the Change You Want to See'}
              </h2>
              <p className="text-xl mb-8 text-white/90 leading-relaxed max-w-xl">
                {locale === 'hi'
                  ? 'हमारे न्यूज़लेटर की सदस्यता लें और हमारी गतिविधियों, आगामी कार्यक्रमों और हमारे मिशन में आप कैसे योगदान कर सकते हैं, इसके बारे में नियमित अपडेट प्राप्त करें।'
                  : 'Subscribe to our newsletter and receive regular updates about our activities, upcoming events, and how you can contribute to our mission.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium">{locale === 'hi' ? 'हमारे बढ़ते समुदाय में शामिल हों' : 'Join our growing community'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-2xl border-0 bg-white px-6 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 text-lg"
                    placeholder={locale === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
                  />
                </div>
                <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white h-14 rounded-2xl text-lg font-bold transition-all shadow-lg shadow-red-900/20">
                  {locale === 'hi' ? 'अभी सदस्यता लें' : 'Subscribe Now'}
                </Button>
                <p className="text-xs text-center text-white/60">
                  {locale === 'hi'
                    ? 'हम आपकी गोपनीयता का सम्मान करते हैं। कभी भी अनसब्सक्राइब करें।'
                    : 'We respect your privacy. Unsubscribe at any time.'}
                </p>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10 flex justify-center gap-6">
                <Link href={`/${locale}/join`}>
                  <Button variant="link" className="text-white hover:text-red-300 p-0 h-auto font-bold underline decoration-2 underline-offset-4">
                    {t('join.title', 'Become a Member')}
                  </Button>
                </Link>
                <Link href={`/${locale}/contact`}>
                  <Button variant="link" className="text-white hover:text-red-300 p-0 h-auto font-bold underline decoration-2 underline-offset-4">
                    {t('contact.title', 'Get in Touch')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
