'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Users, Lightbulb, TrendingUp, HandHeart, BookOpen, Quote, Shield, Globe, Award, ChevronDown, Scale, MapPin, Flag, Briefcase, Building2, Sprout, X, Vote } from 'lucide-react';
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
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<{title: string, description: string, points: string[], color: string, icon: any} | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubscribed(true);
  };

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
      icon: BookOpen,
      title: locale === 'hi' ? 'शिक्षा नीति' : 'Education Policy',
      description: locale === 'hi' ? 'राष्ट्रवादी और मूल्य-आधारित शिक्षा प्रणाली जो हर बच्चे के भविष्य को संवारती है।' : 'A nationalistic and value-based education system that shapes every child\'s future.',
      color: 'from-orange-500 to-red-600',
      points: locale === 'hi' ? [
        'निशुल्क और गुणवत्तापूर्ण शिक्षा की गारंटी।',
        'कौशल विकास पर आधारित आधुनिक पाठ्यक्रम।',
        'शिक्षकों के लिए बेहतर प्रशिक्षण और सुविधाएं।',
        'भारतीय संस्कृति और आधुनिक विज्ञान का समन्वय।'
      ] : [
        'Guarantee of free and quality education.',
        'Modern curriculum based on skill development.',
        'Better training and facilities for teachers.',
        'Coordination of Indian culture and modern science.'
      ]
    },
    {
      icon: Shield,
      title: locale === 'hi' ? 'सेना व अखंड भारत' : 'Army & Akhand Bharat',
      description: locale === 'hi' ? 'शक्तिशाली सेना का निर्माण और अखंड भारत के गौरव को पुनः प्राप्त करने का संकल्प।' : 'Building a powerful military and a commitment to reclaiming the glory of Akhand Bharat.',
      color: 'from-red-600 to-red-800',
      points: locale === 'hi' ? [
        'सेना का आधुनिकीकरण और स्वदेशी हथियारों का निर्माण।',
        'सैनिकों और उनके परिवारों के कल्याण के लिए विशेष योजनाएं।',
        'अखंड भारत की सांस्कृतिक एकता को सुदृढ़ करना।',
        'सीमा सुरक्षा और आतंकवाद के विरुद्ध शून्य सहिष्णुता।'
      ] : [
        'Modernization of the military and indigenous weapon production.',
        'Special schemes for the welfare of soldiers and their families.',
        'Strengthening the cultural unity of Akhand Bharat.',
        'Zero tolerance for cross-border security and terrorism.'
      ]
    },
    {
      icon: MapPin,
      title: locale === 'hi' ? 'फर्रुखाबाद विकास' : 'Farrukhabad Development',
      description: locale === 'hi' ? 'फर्रुखाबाद के सर्वांगीण विकास के लिए एक समर्पित और आधुनिक मास्टर प्लान।' : 'A dedicated and modern master plan for the all-round development of Farrukhabad.',
      color: 'from-green-600 to-green-800',
      points: locale === 'hi' ? [
        'फर्रुखाबाद को औद्योगिक हब के रूप में विकसित करना।',
        'आधुनिक बुनियादी ढांचा और स्मार्ट सिटी सुविधाएं।',
        'कृषि और आलू उत्पादकों के लिए विशेष कोल्ड स्टोरेज और मार्केट।',
        'ऐतिहासिक स्थलों का विकास और पर्यटन को बढ़ावा।'
      ] : [
        'Developing Farrukhabad as an industrial hub.',
        'Modern infrastructure and smart city facilities.',
        'Special cold storage and markets for potato farmers.',
        'Development of historical sites and tourism promotion.'
      ]
    },
    {
      icon: Scale,
      title: locale === 'hi' ? 'न्याय व्यवस्था' : 'Judicial System',
      description: locale === 'hi' ? 'प्रत्येक नागरिक के लिए सुलभ, तीव्र और पारदर्शी न्याय सुनिश्चित करने के लिए व्यापक सुधार।' : 'Comprehensive reforms to ensure accessible, swift, and transparent justice for every citizen.',
      color: 'from-blue-600 to-blue-800',
      points: locale === 'hi' ? [
        'फास्ट-ट्रैक अदालतों की संख्या में वृद्धि।',
        'गरीबों के लिए निशुल्क कानूनी सहायता कार्यक्रम।',
        'न्यायपालिका का पूर्ण डिजिटलीकरण।',
        'न्यायिक जवाबदेही और पारदर्शिता सुनिश्चित करना।'
      ] : [
        'Increase in the number of fast-track courts.',
        'Free legal aid programs for the underprivileged.',
        'Complete digitalization of the judiciary.',
        'Ensuring judicial accountability and transparency.'
      ]
    },
    {
      icon: Heart,
      title: locale === 'hi' ? 'परिवार व संस्कृति रक्षा' : 'Family & Cultural Protection',
      description: locale === 'hi' ? 'पारंपरिक पारिवारिक मूल्यों और हमारी सांस्कृतिक जड़ों को आधुनिकता के प्रहार से बचाना।' : 'Protecting traditional family values and our cultural roots from the onslaught of modernity.',
      color: 'from-purple-600 to-purple-800',
      points: locale === 'hi' ? [
        'संयुक्त परिवार प्रणाली को प्रोत्साहित करना।',
        'सांस्कृतिक विरासत स्थलों का संरक्षण।',
        'युवाओं में नैतिक और सांस्कृतिक मूल्यों का विकास।',
        'पारंपरिक त्योहारों और लोक कलाओं को बढ़ावा।'
      ] : [
        'Encouraging the joint family system.',
        'Preservation of cultural heritage sites.',
        'Developing moral and cultural values in youth.',
        'Promoting traditional festivals and folk arts.'
      ]
    },
    {
      icon: Flag,
      title: locale === 'hi' ? 'संस्कृति बचाओ कार्यक्रम' : 'Sanskriti Bachao Karyakram',
      description: locale === 'hi' ? 'भारत की समृद्ध विरासत और गौरवशाली परंपराओं को संरक्षित करने का हमारा प्रमुख अभियान।' : 'Our flagship movement to preserve Bharat\'s rich heritage and glorious traditions.',
      color: 'from-yellow-500 to-orange-600',
      points: locale === 'hi' ? [
        'प्राचीन स्मारकों और मंदिरों का जीर्णोद्धार।',
        'भारतीय भाषाओं के प्रचार और प्रसार के लिए अभियान।',
        'सांस्कृतिक प्रदूषण के विरुद्ध जन जागरूकता।',
        'भावी पीढ़ियों के लिए परंपराओं का प्रलेखन।'
      ] : [
        'Restoration of ancient monuments and temples.',
        'Campaigns for the promotion of Indian languages.',
        'Public awareness against cultural pollution.',
        'Documentation of traditions for future generations.'
      ]
    },
    {
      icon: Scale,
      title: locale === 'hi' ? 'पारिवारिक विवाद एवं कानून' : 'Family Disputes & Law',
      description: locale === 'hi' ? 'दहेज, घरेलू हिंसा और BNS 69 जैसे कानूनों के दुरुपयोग को रोकना और न्याय सुनिश्चित करना।' : 'Preventing misuse of laws like dowry, domestic violence and BNS 69 and ensuring justice.',
      color: 'from-blue-500 to-indigo-600',
      points: locale === 'hi' ? [
        'दहेज और घरेलू हिंसा कानूनों के दुरुपयोग पर रोक के लिए पारदर्शी जांच।',
        'BNS 69 जैसे गंभीर प्रावधानों में निष्पक्षता सुनिश्चित करना।',
        'पारिवारिक विवादों के समाधान हेतु जिला स्तर पर सुलह केंद्रों की स्थापना।',
        'महिलाओं की सुरक्षा के साथ निर्दोषों को झूठे मुकदमों से बचाने के लिए कड़े नियम।'
      ] : [
        'Transparent investigation to prevent misuse of dowry and domestic violence laws.',
        'Ensuring fairness in serious legal provisions like BNS 69.',
        'Establishment of reconciliation centers at the district level for family disputes.',
        'Strict rules to protect the innocent from false cases while ensuring women\'s safety.'
      ]
    },
  ];

  const manifestoItems = [
    {
      icon: Heart,
      title: locale === 'hi' ? 'आयुर्वेदिक सुपर-स्पेशलिटी' : 'Ayurvedic Super-Specialty',
      description: locale === 'hi' ? 'प्रत्येक जिले में गंभीर रोगों के इलाज हेतु सुपर स्पेशलिटी आयुर्वेदिक अस्पतालों का निर्माण।' : 'Construction of super-specialty Ayurvedic hospitals in every district for serious ailments.',
      color: 'from-red-500 to-red-700',
      points: locale === 'hi' ? [
        'प्रत्येक जिले में गंभीर रोगों के इलाज हेतु सुपर स्पेशलिटी आयुर्वेदिक अस्पतालों का निर्माण।',
        'असाध्य रोगों के लिए इन अस्पतालों में इन-पेशेंट (भर्ती) की पूर्ण सुविधा।',
        'राज्य स्तर पर आधुनिक आयुर्वेदिक मेडिकल कॉलेजों की स्थापना।',
        'आयुर्वेद के माध्यम से स्वस्थ और दीर्घायु भारत का निर्माण।'
      ] : [
        'Construction of super-specialty Ayurvedic hospitals in every district for serious ailments.',
        'Full in-patient (admission) facilities for chronic and incurable diseases.',
        'Establishment of state-of-the-art Ayurvedic Medical Colleges.',
        'Promoting holistic health and longevity through traditional Ayurvedic sciences.'
      ]
    },
    {
      icon: Briefcase,
      title: locale === 'hi' ? 'कर्ज मुक्त भारत' : 'Debt-Free India',
      description: locale === 'hi' ? 'किसानों और मध्यम वर्ग को ₹50 प्रति लीटर पर पेट्रोलियम की उपलब्धता और आयकर की समाप्ति।' : 'Ensuring petroleum at ₹50/liter for farmers and middle class, and abolition of Income Tax.',
      color: 'from-green-500 to-green-700',
      points: locale === 'hi' ? [
        'किसानों और मध्यम वर्ग को ₹50 प्रति लीटर पर पेट्रोलियम की उपलब्धता सुनिश्चित करना।',
        'कृषि को पूर्ण रूप से "उद्योग" का दर्जा देना ताकि किसानों को औद्योगिक लाभ मिले।',
        'आम जनता और मध्यम वर्ग के बोझ को कम करने के लिए "आयकर" (Income Tax) की समाप्ति।',
        'पूंजीपतियों के बजाय जनता के हितों को केंद्र में रखने वाली आर्थिक नीतियां।'
      ] : [
        'Ensuring petroleum at ₹50/liter for farmers and the middle class.',
        'Granting full "Industry" status to agriculture to provide industrial benefits to farmers.',
        'Abolition of Income Tax to reduce the financial burden on the common man.',
        'Economic policies centered on public welfare rather than corporate interests.'
      ]
    },
    {
      icon: Sprout,
      title: locale === 'hi' ? 'राजकीय कृषि एवं गौ-रक्षा' : 'State Agriculture & Cow Protection',
      description: locale === 'hi' ? 'गाय-बैल को राजकीय धर्म पशु घोषित करना और कृषि का पूर्ण आधुनिकरण।' : 'Declaring cows as State Religious Animals and complete modernization of agriculture.',
      color: 'from-blue-500 to-blue-700',
      points: locale === 'hi' ? [
        'गाय-बैल को "राजकीय धर्म पशु" घोषित कर उनकी पूर्ण सुरक्षा सुनिश्चित करना।',
        'बुजुर्ग पशुओं को गौशाला दान करने पर ₹5000 प्रति पशु की अनुदान राशि।',
        'गोबर ₹50/ली., गोमूत्र ₹60/ली. और गाय का दूध ₹90/ली. की दर पर सरकार द्वारा खरीद।',
        'सामूहिक खेती और राजकीय स्वामित्व के माध्यम से कृषि का आधुनिकरण।'
      ] : [
        'Declaring cows and oxen as "State Religious Animals" for their complete protection.',
        'Grant of ₹5000 per animal to those donating elderly cattle to shelters.',
        'Govt procurement: Dung @₹50/L, Urine @₹60/L, and Cow Milk @₹90/L.',
        'Modernizing agriculture through collective farming and state ownership.'
      ]
    },
    {
      icon: Globe,
      title: locale === 'hi' ? 'विदेशी काला धन' : 'Foreign Black Money',
      description: locale === 'hi' ? 'विदेशी बैंकों में जमा काले धन को राष्ट्रीय संपत्ति घोषित करना और उसे वापस लाना।' : 'Declaring black money in foreign banks as National Property and its repatriation.',
      color: 'from-indigo-500 to-indigo-700',
      points: locale === 'hi' ? [
        'विदेशी बैंकों में जमा काले धन को "राष्ट्रीय संपत्ति" घोषित करने हेतु संसद में बिल।',
        'स्विस बैंकों में जमा राशि की वापसी सुनिश्चित कर उसे राष्ट्र निर्माण में लगाना।',
        'घोटालों की राशि को पुनः देश की अर्थव्यवस्था में लाकर प्रत्येक भारतीय को लाभ पहुँचाना।',
        'वित्तीय लूट को रोकने के लिए कड़े अंतर्राष्ट्रीय और राष्ट्रीय कानून।'
      ] : [
        'Parliamentary bill to declare black money in foreign banks as "National Property."',
        'Repatriation of Swiss Bank deposits to be utilized for nation-building.',
        'Redirecting recovered scam money back into the economy for public benefit.',
        'Strict international and national laws to prevent further financial drain.'
      ]
    },
    {
      icon: Users,
      title: locale === 'hi' ? 'सामाजिक सुरक्षा' : 'Social Security',
      description: locale === 'hi' ? 'प्रत्येक भारतीय को भोजन, आवास और 65 वर्ष से अधिक आयु के वृद्धों के लिए पेंशन।' : 'Guaranteed food, housing, and pension for senior citizens above 65 years.',
      color: 'from-purple-500 to-purple-700',
      points: locale === 'hi' ? [
        'प्रत्येक भारतीय को भोजन, आवास और सम्मानजनक रोजगार की पूर्ण गारंटी।',
        '65 वर्ष से अधिक आयु के वृद्धों के लिए आजीवन सम्मानजनक पेंशन योजना।',
        'समाज के गरीब और कमजोर वर्गों के लिए व्यापक कल्याणकारी कार्यक्रम।',
        'असमानता को कम कर अमीरी-गरीबी की खाई को पाटने का संकल्प।'
      ] : [
        'Guaranteed food, housing, and dignified employment for every citizen.',
        'Lifelong dignity pension for senior citizens above 65 years of age.',
        'Comprehensive welfare programs for the poor and vulnerable sections.',
        'Commitment to bridging the gap between the rich and the poor.'
      ]
    },
    {
      icon: Building2,
      title: locale === 'hi' ? 'भ्रष्टाचार मुक्त शासन' : 'Corruption-Free Governance',
      description: locale === 'hi' ? 'संविधान में भ्रष्टाचार की स्पष्ट परिभाषा और बैंकों का पूर्ण राष्ट्रीयकरण।' : 'Clear definition of corruption in constitution and complete nationalization of banks.',
      color: 'from-gray-500 to-gray-700',
      points: locale === 'hi' ? [
        'संविधान में "भ्रष्टाचार" की स्पष्ट परिभाषा तय कर कड़े दंड का प्रावधान।',
        'व्यक्तिगत संपत्ति की सीमा निर्धारण कर अनैतिक संपत्ति की जब्ती।',
        'बैंकों और बीमा क्षेत्रों का पूर्ण राष्ट्रीयकरण ताकि धन का दुरुपयोग न हो।',
        'पूंजीपतियों के कर्ज माफी की परंपरा को समाप्त कर जनहित में धन का उपयोग।'
      ] : [
        'Defining "Corruption" clearly in the constitution with stringent penalties.',
        'Limiting individual property ownership and seizing unethical assets.',
        'Complete nationalization of Banks and Insurance for secure public funds.',
        'Ending the practice of corporate loan waivers to focus on public welfare.'
      ]
    },
    {
      icon: Scale,
      title: locale === 'hi' ? 'पारिवारिक विवाद निवारण' : 'Family Dispute Resolution',
      description: locale === 'hi' ? 'दहेज, घरेलू हिंसा और BNS 69 जैसे कानूनों के दुरुपयोग पर रोक और निष्पक्ष जांच।' : 'Preventing misuse of laws like dowry, domestic violence and BNS 69 through fair investigation.',
      color: 'from-blue-600 to-blue-800',
      points: locale === 'hi' ? [
        'दहेज और घरेलू हिंसा कानूनों के दुरुपयोग पर रोक के लिए पारदर्शी जांच।',
        'BNS 69 जैसे गंभीर प्रावधानों में निष्पक्षता और साक्ष्य-आधारित कार्यवाही सुनिश्चित करना।',
        'पारिवारिक विवादों के समाधान हेतु जिला स्तर पर "पारिवारिक सुलह केंद्रों" की स्थापना।',
        'महिलाओं की वास्तविक सुरक्षा के साथ-साथ निर्दोषों को झूठे मुकदमों से बचाने के लिए कड़े नियम।'
      ] : [
        'Transparent investigation to prevent misuse of dowry and domestic violence laws.',
        'Ensuring fairness and evidence-based action in serious provisions like BNS 69.',
        'Establishment of "Family Reconciliation Centers" at the district level for dispute resolution.',
        'Strict rules for the actual safety of women while protecting the innocent from false cases.'
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative h-[700px] flex items-center overflow-hidden pt-20">
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

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-6 leading-tight drop-shadow-xl">
              {locale === 'hi' ? 'बहुजन क्रांति पार्टी' : 'BAHUJAN KRANTI'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-blue-600 animate-gradient-x italic">
                {locale === 'hi' ? '(मार्क्सवाद-अंबेडकरवाद)' : 'PARTY (MARXWAAD-AMBEDKARWAAD)'}
              </span>
            </h1>

            <p className="text-base text-gray-300 mb-10 leading-relaxed max-w-2xl font-medium border-l-4 border-red-600 pl-6 backdrop-blur-sm bg-black/5 py-2">
              {locale === 'hi'
                ? 'मार्क्सवादी और अंबेडकरवादी सिद्धांतों के प्रति प्रतिबद्ध एक राजनीतिक आंदोलन, जो सामाजिक समानता और श्रमिकों के अधिकारों के लिए समर्पित है।'
                : 'A political movement committed to Marxist and Ambedkarite principles, dedicated to social equality and empowering the masses.'}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link href={`/${locale}/join`}>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-base px-8 h-12 rounded-full shadow-lg shadow-red-900/20 transition-all hover:scale-105 active:scale-95 group">
                  {t('home.ctaJoin', 'Join Our Movement')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={`/${locale}/manifesto`}>
                <Button size="lg" variant="outline" className="bg-white/5 text-white border-white/30 hover:bg-white/10 backdrop-blur-md text-base px-8 h-12 rounded-full border-2 transition-all">
                  {t('home.ctaLearnMore', 'Read Our Vision')}
                </Button>
              </Link>

              <div className="hidden lg:flex items-center gap-3 ml-6 text-white/60">
                <div className="flex h-8 w-8 rounded-full border-2 border-white/20 bg-white/5 items-center justify-center">
                  <Heart className="h-4 w-4 text-red-500" />
                </div>
                <span className="text-[10px] font-bold tracking-widest">{locale === 'hi' ? 'राष्ट्र निर्माण के लिए' : 'DEDICATED TO NATION'}</span>
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
            <div key={i} className="bg-card rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-border hover:scale-105 transition-transform">
              <div className={`p-3 rounded-xl bg-muted ${stat.color} mb-3`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-red-50 to-background dark:from-red-950/20 dark:to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              {t('home.values', 'Our Core Values')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === 'hi' ? 'सिद्धांत जो हम राष्ट्र के लिए हर निर्णय में लागू करते हैं' : 'Principles that guide every decision we make for the nation'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="group border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-card">
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
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

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              {locale === 'hi' ? 'मुख्य पहल' : 'Key Initiatives'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === 'hi' ? 'प्रत्येक भारतीय को उन्नत करने के लिए डिजाइन किए गए परिवर्तनकारी कार्यक्रम' : 'Transformative programs designed to uplift every Indian'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${initiative.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`} />
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${initiative.color} mb-6 shadow-lg shadow-gray-200 dark:shadow-none group-hover:scale-110 transition-transform duration-300`}>
                  <initiative.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{initiative.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{initiative.description}</p>
                <button 
                  onClick={() => setSelectedTopic({
                    title: initiative.title,
                    description: initiative.description,
                    points: initiative.points,
                    color: initiative.color,
                    icon: initiative.icon
                  })}
                  className="inline-flex items-center text-sm font-bold text-red-600 hover:text-red-700 transition-colors group-hover:translate-x-2 transition-transform duration-300"
                >
                  {locale === 'hi' ? 'विवरण देखें' : 'Learn More'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision for Bharat Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-5xl mb-6">
              {locale === 'hi' ? 'भारत के लिए हमारा संकल्प' : 'Our Commitment to Bharat'}
            </h2>
            <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full mb-6" />
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
              {locale === 'hi'
                ? 'बहुजन क्रांति पार्टी के घोषणा पत्र के मुख्य स्तंभ जो एक सशक्त और समृद्ध राष्ट्र की नींव रखते हैं।'
                : 'The core pillars of Bahujan Kranti Party\'s manifesto that lay the foundation for a strong and prosperous nation.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {manifestoItems.map((item, index) => (
              <div key={index} className="bg-card rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-border group">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-medium mb-6">
                  {item.description}
                </p>
                <button 
                  onClick={() => setSelectedTopic({
                    title: item.title,
                    description: item.description,
                    points: item.points,
                    color: item.color,
                    icon: item.icon
                  })}
                  className="inline-flex items-center text-sm font-bold text-red-600 hover:text-red-700 transition-colors group-hover:translate-x-2 transition-transform duration-300"
                >
                  {locale === 'hi' ? 'विवरण देखें' : 'Learn More'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="py-24 bg-muted/20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                {locale === 'hi' ? 'हमारा नेतृत्व' : 'Our Leadership'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
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
            <div className="lg:col-span-1 bg-card rounded-3xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all duration-500 group">
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
                <p className="text-muted-foreground italic mb-6">
                  "{locale === 'hi' ? 'हमारा मिशन हर नागरिक को सशक्त बनाना और सामाजिक न्याय सुनिश्चित करना है।' : 'Our mission is to empower every citizen and ensure social justice.'}"
                </p>
                <Link href={`/${locale}/leadership?memberId=president`}>
                  <Button variant="ghost" className="w-full justify-between hover:bg-red-50 dark:hover:bg-accent hover:text-red-600 group/btn">
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

              <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group">
                <Vote className="absolute -right-6 -bottom-6 h-40 w-40 text-white/10 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10 max-w-2xl">
                  <div className="inline-block px-3 py-1 bg-white/20 text-[10px] font-bold tracking-widest uppercase rounded-full mb-3">
                    {locale === 'hi' ? 'जमीनी स्तर' : 'Grassroots Level'}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    {locale === 'hi' ? 'बूथ स्तर समिति' : 'Booth Level Committee'}
                  </h3>
                  <p className="text-orange-100 leading-relaxed">
                    {locale === 'hi'
                      ? 'राज्य → विधानसभा → बूथ → समिति सदस्य। भारत के 4,000+ विधानसभा क्षेत्रों में बूथ स्तर पर संगठन।'
                      : 'State → Assembly → Booth → Committee members. Organizing at 4,000+ assembly constituencies across India.'}
                  </p>
                </div>
                <Link href={`/${locale}/booth-committee`} className="relative z-10 shrink-0">
                  <Button className="bg-white text-orange-700 hover:bg-orange-50 font-bold px-8 h-12">
                    {locale === 'hi' ? 'बूथ समिति खोलें' : 'Open Booth Console'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {news.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                  {t('news.title', 'Latest News')}
                </h2>
                <p className="text-lg text-muted-foreground">
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
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                  {t('events.title', 'Upcoming Events')}
                </h2>
                <p className="text-lg text-muted-foreground">
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
              {subscribed ? (
                <div className="text-center py-8 animate-fade-in">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-green-400 mb-6">
                    <Award className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {locale === 'hi' ? 'सदस्यता सफल!' : 'Subscribed Successfully!'}
                  </h3>
                  <p className="text-white/70">
                    {locale === 'hi' 
                      ? 'धन्यवाद! अब आप हमारे न्यूज़लेटर के लिए नामांकित हैं।' 
                      : 'Thank you for joining! You are now enrolled in our newsletter.'}
                  </p>
                  <Button 
                    variant="link" 
                    className="mt-6 text-white/50 hover:text-white"
                    onClick={() => setSubscribed(false)}
                  >
                    {locale === 'hi' ? 'एक और ईमेल जोड़ें' : 'Add another email'}
                  </Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubscribe}>
                  <div>
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full rounded-2xl border-0 bg-white px-6 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 text-lg disabled:opacity-50"
                      placeholder={locale === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
                      disabled={submitting}
                    />
                  </div>
                  <Button 
                    type="submit"
                    size="lg" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white h-14 rounded-2xl text-lg font-bold transition-all shadow-lg shadow-red-900/20 disabled:opacity-70"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {locale === 'hi' ? 'प्रक्रिया जारी है...' : 'Processing...'}
                      </span>
                    ) : (
                      locale === 'hi' ? 'अभी सदस्यता लें' : 'Subscribe Now'
                    )}
                  </Button>
                  <p className="text-xs text-center text-white/60">
                    {locale === 'hi'
                      ? 'हम आपकी गोपनीयता का सम्मान करते हैं। कभी भी अनसब्सक्राइब करें।'
                      : 'We respect your privacy. Unsubscribe at any time.'}
                  </p>
                </form>
              )}

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
      
      {/* Detailed Info Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-all animate-in fade-in duration-300">
          <div 
            className="bg-card rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-2 w-full bg-gradient-to-r ${selectedTopic.color}`} />
            <button 
              onClick={() => setSelectedTopic(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-6 mb-8">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedTopic.color} shadow-lg text-white`}>
                  <selectedTopic.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">{selectedTopic.title}</h3>
                </div>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  {selectedTopic.description}
                </p>
                
                <div className="bg-muted rounded-2xl p-6 md:p-8 border border-border">
                  <h4 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-4">
                    {locale === 'hi' ? 'मुख्य बिंदु' : 'KEY HIGHLIGHTS'}
                  </h4>
                  <ul className="space-y-4">
                    {selectedTopic.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${selectedTopic.color} flex-shrink-0 flex items-center justify-center mt-0.5`}>
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        </div>
                        <span className="text-foreground font-medium leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button 
                    onClick={() => setSelectedTopic(null)}
                    className={`bg-gradient-to-r ${selectedTopic.color} text-white px-8 h-12 rounded-full font-bold shadow-lg hover:scale-105 transition-transform`}
                  >
                    {locale === 'hi' ? 'ठीक है' : 'Got it'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-[-1]" onClick={() => setSelectedTopic(null)} />
        </div>
      )}
    </div>
  );
}
