'use client';

import Link from 'next/link';
import { Building2, Users, Briefcase, Shield, BarChart3, Vote, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from '@/lib/TranslationContext';

export default function OrganizationPage() {
  const { t, locale } = useTranslations();

  const structure = [
    {
      icon: Building2,
      title: locale === 'hi' ? 'राष्ट्रीय मुख्यालय' : 'National Headquarters',
      colorClasses: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      description: locale === 'hi'
        ? 'पार्टी का केंद्रीय प्रशासनिक केंद्र जहां सभी महत्वपूर्ण निर्णय लिए जाते हैं।'
        : 'The central administrative hub of the party where all important decisions are made.',
    },
    {
      icon: Users,
      title: locale === 'hi' ? 'राष्ट्रीय परिषद्' : 'National Council',
      colorClasses: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      description: locale === 'hi'
        ? 'पार्टी के शीर्ष नेतृत्व और निर्णय लेने वाली संस्था।'
        : 'The top leadership and decision-making body of the party.',
    },
    {
      icon: Briefcase,
      title: locale === 'hi' ? 'राष्ट्रीय कार्य समिति' : 'National Executive Committee',
      colorClasses: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      description: locale === 'hi'
        ? 'राष्ट्रीय स्तर पर कार्यान्वयन और प्रशासन के लिए जिम्मेदार।'
        : 'Responsible for implementation and administration at the national level.',
    },
    {
      icon: Shield,
      title: locale === 'hi' ? 'राज्य संगठन' : 'State Organization',
      colorClasses: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
      description: locale === 'hi'
        ? 'प्रत्येक राज्य में पार्टी के संगठनात्मक ढांचे और प्रशासन।'
        : 'Party organizational structure and administration in each state.',
    },
    {
      icon: BarChart3,
      title: locale === 'hi' ? 'जिला स्तरीय संगठन' : 'District Level Organization',
      colorClasses: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      description: locale === 'hi'
        ? 'जिला स्तर पर पार्टी की गतिविधियों और संगठन का संचालन।'
        : 'Conducting party activities and organization at the district level.',
    },
    {
      icon: Vote,
      title: locale === 'hi' ? 'बूथ स्तर समिति' : 'Booth Level Committee',
      colorClasses: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      description: locale === 'hi'
        ? 'प्रत्येक मतदान केंद्र (बूथ) पर 1–15 सदस्यों की समिति।'
        : 'A committee of 1–15 members at every polling booth.',
      href: `/${locale}/booth-committee`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden bg-muted/30 pt-32 pb-20 border-b border-border">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-red-500/5 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full bg-red-50 dark:bg-red-950/30 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-red-600 border border-red-100 dark:border-red-900/50 mb-6 uppercase">
              {locale === 'hi' ? 'संगठन' : 'ORGANIZATION'}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6 leading-tight">
              {locale === 'hi' ? 'संगठनात्मक ढांचा' : 'Organizational Structure'} <br />
              <span className="text-muted-foreground font-medium text-3xl sm:text-5xl">
                {locale === 'hi' ? 'हमारी कार्य प्रणाली' : 'OUR WORKING SYSTEM'}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl font-normal leading-relaxed border-l-2 border-red-600/40 pl-6">
              {locale === 'hi'
                ? 'बहुजन क्रांति पार्टी का संगठनात्मक ढांचा और कार्य प्रणाली'
                : 'Bahujan Kranti Party\'s Organizational Structure and Working System'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {structure.map((item, index) => {
              const Icon = item.icon;
              const card = (
                <Card className={`hover:shadow-lg transition-shadow bg-card h-full ${'href' in item && item.href ? 'hover:border-orange-500/30' : ''}`}>
                  <CardContent className="pt-8">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-6 ${item.colorClasses}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                    {'href' in item && item.href && (
                      <span className="inline-flex items-center gap-1 mt-4 text-sm font-bold text-orange-600">
                        {locale === 'hi' ? 'खोलें' : 'Open Console'}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </CardContent>
                </Card>
              );
              return 'href' in item && item.href ? (
                <Link key={index} href={item.href}>{card}</Link>
              ) : (
                <div key={index}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {locale === 'hi' ? 'संगठनात्मक पदानुक्रम' : 'Organizational Hierarchy'}
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
              <div className="space-y-6">
                <div className="text-center py-4 bg-red-50 dark:bg-red-900/30 rounded-lg border-2 border-red-600">
                  <h4 className="text-xl font-bold text-red-600 dark:text-red-400">
                    {locale === 'hi' ? 'राष्ट्रीय अध्यक्ष' : 'National President'}
                  </h4>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-muted-foreground/30"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="py-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-2 border-blue-600 text-center">
                    <h4 className="font-bold text-blue-600 dark:text-blue-400">
                      {locale === 'hi' ? 'महासचिव' : 'General Secretary'}
                    </h4>
                  </div>
                  <div className="py-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-2 border-blue-600 text-center">
                    <h4 className="font-bold text-blue-600 dark:text-blue-400">
                      {locale === 'hi' ? 'कोषाध्यक्ष' : 'Treasurer'}
                    </h4>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-muted-foreground/30"></div>
                </div>

                <div className="py-4 bg-green-50 dark:bg-green-900/30 rounded-lg border-2 border-green-600 text-center">
                  <h4 className="font-bold text-green-600 dark:text-green-400">
                    {locale === 'hi' ? 'राज्य अध्यक्ष' : 'State Presidents'}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    {locale === 'hi' ? 'सभी राज्यों में' : 'In all states'}
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-muted-foreground/30"></div>
                </div>

                <div className="py-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border-2 border-yellow-600 text-center">
                  <h4 className="font-bold text-yellow-600 dark:text-yellow-400">
                    {locale === 'hi' ? 'जिला अध्यक्ष' : 'District Presidents'}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    {locale === 'hi' ? 'सभी जिलों में' : 'In all districts'}
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-muted-foreground/30"></div>
                </div>

                <Link
                  href={`/${locale}/booth-committee`}
                  className="block py-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg border-2 border-orange-600 text-center hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
                >
                  <h4 className="font-bold text-orange-600 dark:text-orange-400">
                    {locale === 'hi' ? 'बूथ स्तर समिति' : 'Booth Level Committee'}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    {locale === 'hi' ? 'प्रत्येक मतदान केंद्र पर 1–15 सदस्य' : '1–15 members at every polling booth'}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {locale === 'hi' ? 'मुख्य विभाग' : 'Main Departments'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: locale === 'hi' ? 'संगठन विभाग' : 'Organization Department', desc: locale === 'hi' ? 'पार्टी संगठन और सदस्यता' : 'Party organization and membership' },
              { name: locale === 'hi' ? 'प्रचार विभाग' : 'Publicity Department', desc: locale === 'hi' ? 'जनसंचार और मीडिया' : 'Public communication and media' },
              { name: locale === 'hi' ? 'शिक्षा विभाग' : 'Education Department', desc: locale === 'hi' ? 'कार्यकर्ता प्रशिक्षण और विकास' : 'Worker training and development' },
              { name: locale === 'hi' ? 'राजनीतिक विभाग' : 'Political Department', desc: locale === 'hi' ? 'नीति निर्माण और रणनीति' : 'Policy making and strategy' },
              { name: locale === 'hi' ? 'आर्थिक विभाग' : 'Economic Department', desc: locale === 'hi' ? 'वित्तीय प्रबंधन' : 'Financial management' },
              { name: locale === 'hi' ? 'सामाजिक कल्याण विभाग' : 'Social Welfare Department', desc: locale === 'hi' ? 'सामाजिक कार्यक्रम और सहायता' : 'Social programs and support' },
            ].map((dept, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow bg-card">
                <CardContent className="pt-6">
                  <h4 className="font-bold text-lg mb-2 text-foreground">{dept.name}</h4>
                  <p className="text-muted-foreground">{dept.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
