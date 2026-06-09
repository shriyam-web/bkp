'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageIntro from '@/components/PageIntro';
import SectionHeading from '@/components/SectionHeading';
import { useTranslations } from '@/lib/TranslationContext';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { locale } = useTranslations();
  const isHi = locale === 'hi';

  const pillars = [
    {
      title: isHi ? 'हमारा मिशन' : 'Our Mission',
      text: isHi
        ? 'एक मजबूत, आत्मनिर्भर भारत जहाँ हर नागरिक को शिक्षा, स्वास्थ्य, रोजगार और न्याय तक पहुँच हो।'
        : 'A strong, self-reliant India where every citizen has access to education, healthcare, employment, and justice.',
    },
    {
      title: isHi ? 'हमारी दृष्टि' : 'Our Vision',
      text: isHi
        ? 'एक समाज जहाँ श्रम का सम्मान हो, संसाधनों का समान वितरण हो, और हर परिवार को सम्मानजनक जीवन मिले।'
        : 'A society where labour is respected, resources are shared equitably, and every family lives with dignity.',
    },
    {
      title: isHi ? 'हमारे मूल्य' : 'Our Values',
      text: isHi
        ? 'ईमानदारी, पारदर्शिता, समावेशिता और जनता की सेवा — पार्टी की नींव।'
        : 'Integrity, transparency, inclusion, and service to the people — the foundation of our party.',
    },
  ];

  const timeline = [
    {
      year: '2012',
      title: isHi ? 'स्थापना और राजनीतिक घोषणा' : 'Foundation & Political Declaration',
      text: isHi
        ? '1 सितंबर 2012 को लखनऊ में बहुजन क्रांति पार्टी (मा.अ.) की आधिकारिक घोषणा।'
        : 'Official announcement of Bahujan Kranti Party (M.A.) in Lucknow on 1 September 2012.',
    },
    {
      year: '2020',
      title: isHi ? 'संगठनात्मक विस्तार' : 'Organizational Expansion',
      text: isHi
        ? 'विभिन्न राज्यों में संगठनात्मक ढाँचे का विस्तार और जमीनी कार्यकर्ताओं का जुड़ाव।'
        : 'Expansion of organizational structure across states and engagement of grassroots workers.',
    },
    {
      year: '2024',
      title: isHi ? 'लोकतंत्र को मजबूत करना' : 'Strengthening Democracy',
      text: isHi
        ? 'पारदर्शी शासन और समावेशी नीतियों के प्रति नवीनीकृत प्रतिबद्धता।'
        : 'Renewed commitment to transparent governance and inclusive policies.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageIntro
        title={isHi ? 'बहुजन क्रांति पार्टी' : 'About the Party'}
        subtitle={isHi ? 'इतिहास और विचारधारा' : 'History & Ideology'}
        description={
          isHi
            ? '2012 से समर्पित सेवा और जनकेंद्रित नीतियों के माध्यम से एक प्रगतिशील, समावेशी भारत का निर्माण।'
            : 'Since 2012, building a progressive and inclusive India through dedicated service and people-centric policies.'
        }
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <SectionHeading
                title={isHi ? 'हमारी कहानी' : 'Our Story'}
                className="mb-6"
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
                <p>
                  {isHi
                    ? '2012 में स्थापित, बहुजन क्रांति पार्टी एक राजनीतिक आंदोलन के रूप में उभरी जो हर भारतीय नागरिक की आकांक्षाओं का प्रतिनिधित्व करती है।'
                    : 'Founded in 2012, Bahujan Kranti Party emerged as a political movement representing the aspirations of every Indian citizen.'}
                </p>
                <p>
                  {isHi
                    ? 'हमारा जमीनी दृष्टिकोण आम नागरिकों की वास्तविक चुनौतियों को समझने और उनकी जरूरतों को पूरा करने वाली नीतियां तैयार करने में सक्षम बनाता है।'
                    : 'Our grassroots approach helps us understand real challenges faced by ordinary citizens and craft policies that address their needs.'}
                </p>
                <p>
                  {isHi
                    ? 'आज हम समावेशी विकास, पारदर्शिता और सुशासन में विश्वास करने वाली एक पार्टी के रूप में खड़े हैं।'
                    : 'Today we stand as a party committed to inclusive development, transparency, and good governance.'}
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border">
              <Image
                src="https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt={isHi ? 'पार्टी जमावड़ा' : 'Party gathering'}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={isHi ? 'वैज्ञानिक समाजवाद और विचारधारा' : 'Scientific Socialism & Ideology'}
            description={
              isHi
                ? 'मार्क्सवाद-अंबेडकरवाद पर आधारित हमारा राजनीतिक दर्शन'
                : 'Our political philosophy rooted in Marxism-Ambedkarism'
            }
            className="mb-8 max-w-2xl"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed">
              <p>
                {isHi
                  ? 'बहुजन क्रांति पार्टी (मा.अ.) का मानना है कि वर्तमान पूंजीवादी व्यवस्था शोषण और आमजन के दुखों का मूल कारण है। हमारा संकल्प इस व्यवस्था को उखाड़ फेंककर वैज्ञानिक समाजवाद की स्थापना करना है।'
                  : 'Bahujan Kranti Party (M.A.) holds that the capitalist system is the root cause of exploitation and mass suffering. Our resolve is to uproot it and establish scientific socialism.'}
              </p>
              <p>
                {isHi
                  ? 'हमारा लक्ष्य डॉ. कार्ल मार्क्स और डॉ. बी.आर. अंबेडकर के विजन — "वर्ग-विहीन और जाति-विहीन समाज" — की स्थापना करना है।'
                  : 'Our goal is the shared vision of Dr. Karl Marx and Dr. B.R. Ambedkar: a classless and casteless society.'}
              </p>
            </div>
            <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed">
              <p>
                {isHi
                  ? 'पूंजीवाद के उन्मूलन के बिना मानवीय मूल्यों की स्थापना असंभव है। हम राज्य समाजवाद के माध्यम से कृषि का राष्ट्रीयकरण और उद्योगों पर जन-स्वामित्व सुनिश्चित करेंगे।'
                  : 'Without abolishing capitalism, true human values cannot be established. We aim to nationalize agriculture and ensure public ownership of industries through state socialism.'}
              </p>
              <blockquote className="border-l-2 border-red-600 pl-4 text-foreground font-medium italic">
                {isHi
                  ? 'समाजवाद ही मुक्ति का मार्ग है। जागो भारतीयों, जागो बहुजनों!'
                  : 'Socialism is the path to liberation. Awaken, Indians! Awaken, Bahujans!'}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={isHi ? 'मिशन, दृष्टि, मूल्य' : 'Mission, Vision, Values'} className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {pillars.map((item) => (
              <div key={item.title} className="bg-card p-6 sm:p-8">
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={isHi ? 'हमारी यात्रा' : 'Our Journey'} className="mb-8" />
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-5 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-red-600 tabular-nums w-12 text-right shrink-0">
                    {item.year}
                  </span>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="pt-0.5 pb-2">
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border border-border rounded-lg bg-card">
            <div>
              <p className="font-semibold text-foreground">
                {isHi ? 'हमारे मिशन में शामिल हों' : 'Join our mission'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isHi ? 'सदस्य बनें और परिवर्तन का हिस्सा बनें' : 'Become a member and be part of the change'}
              </p>
            </div>
            <Link
              href={`/${locale}/join`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 shrink-0"
            >
              {isHi ? 'सदस्यता लें' : 'Join Us'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
