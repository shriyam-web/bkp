'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Users, Lightbulb, TrendingUp, BookOpen, Quote, Shield, Globe, Award, ChevronDown, Scale, MapPin, Flag, Briefcase, Building2, Sprout, X, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewsCard from '@/components/NewsCard';
import EventCard from '@/components/EventCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PoliticalCarousel from '@/components/PoliticalCarousel';
import SectionHeading from '@/components/SectionHeading';
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent z-[1]" />

        <div className="absolute top-20 right-[10%] w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute bottom-20 right-[20%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-bounce duration-[10000ms] z-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-red-500 ring-1 ring-inset ring-white/20 mb-8 backdrop-blur-md">
              <span className="flex h-3 w-3 rounded-full bg-red-600 mr-3 animate-ping" />
              {locale === 'hi' ? 'परिवर्तन की लहर' : 'A MOVEMENT FOR CHANGE'}
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-6 leading-tight drop-shadow-xl">
              {locale === 'hi' ? 'बहुजन क्रांति पार्टी' : 'BAHUJAN KRANTI'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-blue-600 italic">
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

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase">{locale === 'hi' ? 'नीचे देखें' : 'Scroll Down'}</span>
          <ChevronDown className="h-6 w-6 text-white" />
        </div>
      </section>

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

      {/* Core values — numbered grid */}
      <section className="py-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t('home.values', 'Our Core Values')}
            description={locale === 'hi' ? 'सिद्धांत जो हम राष्ट्र के लिए हर निर्णय में लागू करते हैं' : 'Principles that guide every decision we make for the nation'}
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-md overflow-hidden border border-border">
            {values.map((value, index) => (
              <div key={index} className="bg-card p-6 sm:p-8 group hover:bg-muted/40 transition-colors">
                <span className="text-3xl font-bold text-red-600/30 group-hover:text-red-600/60 transition-colors tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideology — editorial quote panels */}
      <section className="py-16 bg-[#0f172a] text-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={locale === 'hi' ? 'हमारी वैचारिक बुनियाद' : 'Our Ideological Foundations'}
            description={locale === 'hi' ? 'डॉ. बी.आर. अंबेडकर और कार्ल मार्क्स की दूरदर्शी सोच से प्रेरित' : 'Guided by Dr. B.R. Ambedkar and Karl Marx'}
            className="mb-10 [&_h2]:text-white [&_p]:text-slate-400"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <blockquote className="border-l-4 border-red-600 pl-6 py-4">
              <div className="flex items-center gap-4 mb-5">
                <img src="/ambedkar.jpg" alt="Dr. B.R. Ambedkar" className="h-14 w-14 rounded-md object-cover" />
                <div>
                  <cite className="not-italic text-base font-semibold">Dr. B.R. Ambedkar</cite>
                  <p className="text-sm text-slate-400">{locale === 'hi' ? 'संविधान निर्माता' : 'Architect of the Constitution'}</p>
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-medium leading-snug text-slate-100">
                &ldquo;{locale === 'hi' ? 'शिक्षित बनो, संगठित रहो, संघर्ष करो।' : 'Educate, Agitate, Organize.'}&rdquo;
              </p>
            </blockquote>
            <blockquote className="border-l-4 border-[#FACC15] pl-6 py-4">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-14 w-14 rounded-md bg-slate-800 flex items-center justify-center">
                  <Quote className="h-6 w-6 text-[#FACC15]" />
                </div>
                <div>
                  <cite className="not-italic text-base font-semibold">Karl Marx</cite>
                  <p className="text-sm text-slate-400">{locale === 'hi' ? 'दार्शनिक और अर्थशास्त्री' : 'Philosopher & Economist'}</p>
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-medium leading-snug text-slate-100">
                &ldquo;{locale === 'hi' ? 'दुनिया के मजदूरों एक हो जाओ — तुम्हारे पास खोने के लिए कुछ नहीं है सिवाय अपनी बेड़ियों के।' : 'Workers of the world unite; you have nothing to lose but your chains.'}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Initiatives — bento grid */}
      <section className="py-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={locale === 'hi' ? 'मुख्य पहल' : 'Key Initiatives'}
            description={locale === 'hi' ? 'प्रत्येक भारतीय को उन्नत करने के लिए परिवर्तनकारी कार्यक्रम' : 'Transformative programs designed to uplift every Indian'}
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {initiatives.map((initiative, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedTopic({
                  title: initiative.title,
                  description: initiative.description,
                  points: initiative.points,
                  color: initiative.color,
                  icon: initiative.icon,
                })}
                className={`group text-left border border-border rounded-md p-6 bg-card hover:border-red-600/50 hover:bg-muted/30 transition-colors ${
                  index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-red-600/10 text-red-600">
                    <initiative.icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </div>
                <h3 className={`mt-4 font-semibold text-foreground ${index === 0 ? 'text-xl' : 'text-base'}`}>
                  {initiative.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {initiative.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto preview */}
      <section className="py-16 bg-muted/20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <SectionHeading
              title={locale === 'hi' ? 'भारत के लिए हमारा संकल्प' : 'Our Commitment to Bharat'}
              description={locale === 'hi'
                ? 'घोषणा पत्र के मुख्य स्तंभ — एक सशक्त राष्ट्र की नींव'
                : 'Core pillars of our manifesto for a strong and prosperous nation'}
            />
            <Link href={`/${locale}/manifesto`}>
              <Button variant="outline" size="sm" className="shrink-0">
                {locale === 'hi' ? 'पूरा घोषणापत्र' : 'Full Manifesto'}
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border border border-border rounded-md overflow-hidden bg-card">
            {manifestoItems.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedTopic({
                  title: item.title,
                  description: item.description,
                  points: item.points,
                  color: item.color,
                  icon: item.icon,
                })}
                className="w-full flex items-start gap-4 p-5 sm:p-6 text-left hover:bg-muted/40 transition-colors group"
              >
                <span className="text-sm font-bold text-red-600 tabular-nums w-6 shrink-0 pt-0.5">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="py-12 sm:py-24 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-16 gap-4 sm:gap-6">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-foreground sm:text-4xl mb-2 sm:mb-4">
                {locale === 'hi' ? 'हमारा नेतृत्व' : 'Our Leadership'}
              </h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">
                {locale === 'hi' ? 'एक समृद्ध और न्यायपूर्ण भारत के लिए आंदोलन का नेतृत्व करने वाले समर्पित क्रांतिकारी' : 'Dedicated revolutionaries leading the movement for a prosperous and just India'}
              </p>
            </div>
            <Link href={`/${locale}/leadership`} className="shrink-0 w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto rounded-full px-6 sm:px-8 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all">
                {locale === 'hi' ? 'सभी नेताओं से मिलें' : 'Meet All Leaders'}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="lg:col-span-1 bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all duration-500 group min-w-0">
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
                  &ldquo;{locale === 'hi' ? 'हमारा मिशन हर नागरिक को सशक्त बनाना और सामाजिक न्याय सुनिश्चित करना है।' : 'Our mission is to empower every citizen and ensure social justice.'}&rdquo;
                </p>
                <Link href={`/${locale}/leadership?memberId=president`}>
                  <Button variant="ghost" className="w-full justify-between hover:bg-red-50 dark:hover:bg-accent hover:text-red-600 group/btn">
                    {locale === 'hi' ? 'प्रोफ़ाइल देखें' : 'View Profile'}
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-8 lg:col-span-2 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden group min-w-0">
                  <Users className="absolute -right-8 -bottom-8 h-32 w-32 sm:h-48 sm:w-48 text-white/10 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{locale === 'hi' ? 'राष्ट्रीय समिति' : 'National Committee'}</h3>
                    <p className="text-blue-100 leading-relaxed text-sm sm:text-base">
                      {locale === 'hi' ? 'पार्टी की केंद्रीय निर्णय लेने वाली संस्था जो हमारे मिशन का मार्गदर्शन करती है।' : 'The central decision-making body of the party guiding our national mission.'}
                    </p>
                  </div>
                  <Link href={`/${locale}/leadership`} className="relative z-10 mt-6 sm:mt-8">
                    <Button className="w-full sm:w-fit bg-white text-blue-800 hover:bg-blue-50">
                      {locale === 'hi' ? 'समिति देखें' : 'View Committee'}
                    </Button>
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden group min-w-0">
                  <Shield className="absolute -right-8 -bottom-8 h-32 w-32 sm:h-48 sm:w-48 text-white/10 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{locale === 'hi' ? 'राज्य नेतृत्व' : 'State Leadership'}</h3>
                    <p className="text-red-100 leading-relaxed text-sm sm:text-base">
                      {locale === 'hi' ? 'जमीनी स्तर पर बदलाव लाने के लिए भारत के प्रत्येक राज्य में हमारे समर्पित प्रतिनिधि।' : 'Our dedicated representatives in every state of India working for grassroots change.'}
                    </p>
                  </div>
                  <Link href={`/${locale}/leadership`} className="relative z-10 mt-6 sm:mt-8">
                    <Button className="w-full sm:w-fit bg-white text-red-800 hover:bg-red-50">
                      {locale === 'hi' ? 'राज्यों का चयन करें' : 'Select State'}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white relative overflow-hidden group min-w-0">
                <Vote className="absolute -right-4 -bottom-4 h-24 w-24 sm:h-36 sm:w-36 text-white/10 pointer-events-none" />
                <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
                  <div className="min-w-0">
                    <div className="inline-block px-2.5 py-1 bg-white/20 text-[10px] font-bold tracking-widest uppercase rounded-full mb-2.5">
                      {locale === 'hi' ? 'जमीनी स्तर' : 'Grassroots Level'}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 break-words">
                      {locale === 'hi' ? 'बूथ स्तर समिति' : 'Booth Level Committee'}
                    </h3>
                    <p className="text-orange-100 leading-relaxed text-sm break-words">
                      {locale === 'hi'
                        ? 'राज्य → विधानसभा → बूथ → समिति सदस्य। भारत के 4,000+ विधानसभा क्षेत्रों में बूथ स्तर पर संगठन।'
                        : 'State → Assembly → Booth → Committee members. Organizing at 4,000+ assembly constituencies across India.'}
                    </p>
                  </div>
                  <Link
                    href={`/${locale}/booth-committee`}
                    className="block w-full min-w-0"
                  >
                    <Button className="w-full max-w-full bg-white text-orange-700 hover:bg-orange-50 font-bold h-11 px-4 text-sm sm:text-base whitespace-normal">
                      <span className="truncate">
                        {locale === 'hi' ? 'बूथ समिति खोलें' : 'Open Booth Console'}
                      </span>
                      <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {news.length > 0 && (
        <section className="py-16 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <SectionHeading
                title={t('news.title', 'Latest News')}
                description={locale === 'hi' ? 'हाल की गतिविधियों और घोषणाओं के साथ अपडेट रहें' : 'Stay updated with recent activities and announcements'}
              />
              <Link href={`/${locale}/news`}>
                <Button variant="outline" size="sm" className="shrink-0 hidden sm:flex">
                  {locale === 'hi' ? 'सभी समाचार' : 'View All News'}
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <NewsCard key={item._id} id={item._id} {...item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {events.length > 0 && (
        <section className="py-16 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <SectionHeading
                title={t('events.title', 'Upcoming Events')}
                description={locale === 'hi' ? 'कार्यक्रमों में शामिल हों और परिवर्तन का हिस्सा बनें' : 'Join our events and be part of the change'}
              />
              <Link href={`/${locale}/events`}>
                <Button variant="outline" size="sm" className="shrink-0 hidden sm:flex">
                  {locale === 'hi' ? 'सभी कार्यक्रम' : 'View All Events'}
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} {...event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter + join CTA */}
      <section className="py-16 bg-[#0f172a] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#FACC15] mb-3">
                {locale === 'hi' ? 'जुड़ें' : 'Stay Connected'}
              </p>
              <h2 className="text-2xl font-bold sm:text-3xl leading-tight mb-4">
                {locale === 'hi' ? 'परिवर्तन का हिस्सा बनें' : 'Be Part of the Change'}
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                {locale === 'hi'
                  ? 'न्यूज़लेटर की सदस्यता लें — गतिविधियों, कार्यक्रमों और मिशन में योगदान के तरीकों के बारे में अपडेट पाएं।'
                  : 'Subscribe for updates on activities, events, and ways to contribute to our mission.'}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link href={`/${locale}/join`} className="text-[#FACC15] hover:underline font-medium">
                  {t('join.title', 'Become a Member')} →
                </Link>
                <Link href={`/${locale}/contact`} className="text-slate-400 hover:text-white transition-colors">
                  {t('contact.title', 'Get in Touch')} →
                </Link>
              </div>
            </div>

            <div className="border border-slate-700 rounded-md p-6 sm:p-8 bg-slate-900/50">
              {subscribed ? (
                <div className="text-center py-4">
                  <Award className="h-10 w-10 text-[#FACC15] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {locale === 'hi' ? 'सदस्यता सफल!' : 'Subscribed Successfully!'}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {locale === 'hi' ? 'धन्यवाद! आप न्यूज़लेटर के लिए नामांकित हैं।' : 'Thank you! You are enrolled in our newsletter.'}
                  </p>
                  <button
                    type="button"
                    className="mt-4 text-sm text-slate-500 hover:text-white"
                    onClick={() => setSubscribed(false)}
                  >
                    {locale === 'hi' ? 'एक और ईमेल जोड़ें' : 'Add another email'}
                  </button>
                </div>
              ) : (
                <form className="space-y-3" onSubmit={handleSubscribe}>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                    placeholder={locale === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
                    disabled={submitting}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white h-11 rounded-md disabled:opacity-70"
                    disabled={submitting}
                  >
                    {submitting
                      ? (locale === 'hi' ? 'प्रक्रिया जारी है...' : 'Processing...')
                      : (locale === 'hi' ? 'सदस्यता लें' : 'Subscribe')}
                  </Button>
                  <p className="text-xs text-center text-slate-500">
                    {locale === 'hi' ? 'कभी भी अनसब्सक्राइब करें।' : 'Unsubscribe at any time.'}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {selectedTopic && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
          onClick={() => setSelectedTopic(null)}
        >
          <div
            className="bg-card rounded-md w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1 bg-red-600" />
            <button
              onClick={() => setSelectedTopic(null)}
              className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-muted text-muted-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6 pr-8">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-red-600/10 text-red-600">
                  <selectedTopic.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{selectedTopic.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {selectedTopic.description}
              </p>

              <div className="border border-border rounded-md p-5 bg-muted/30">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                  {locale === 'hi' ? 'मुख्य बिंदु' : 'Key Highlights'}
                </h4>
                <ul className="space-y-3">
                  {selectedTopic.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <span className="text-red-600 font-bold shrink-0">{idx + 1}.</span>
                      <span className="text-foreground leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => setSelectedTopic(null)} className="bg-red-600 hover:bg-red-700 text-white">
                  {locale === 'hi' ? 'ठीक है' : 'Got it'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
