'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageIntro from '@/components/PageIntro';
import SectionHeading from '@/components/SectionHeading';
import { useTranslations } from '@/lib/TranslationContext';
import { ArrowRight } from 'lucide-react';

export default function OrganizationPage() {
  const { locale } = useTranslations();
  const isHi = locale === 'hi';

  const levels = [
    {
      level: '01',
      title: isHi ? 'राष्ट्रीय मुख्यालय' : 'National Headquarters',
      desc: isHi
        ? 'पार्टी का केंद्रीय प्रशासनिक केंद्र जहाँ महत्वपूर्ण निर्णय लिए जाते हैं।'
        : 'Central administrative hub where key party decisions are made.',
    },
    {
      level: '02',
      title: isHi ? 'राष्ट्रीय परिषद्' : 'National Council',
      desc: isHi
        ? 'पार्टी के शीर्ष नेतृत्व और निर्णय लेने वाली संस्था।'
        : 'Top leadership and primary decision-making body.',
    },
    {
      level: '03',
      title: isHi ? 'राष्ट्रीय कार्य समिति' : 'National Executive Committee',
      desc: isHi
        ? 'राष्ट्रीय स्तर पर कार्यान्वयन और प्रशासन।'
        : 'Implementation and administration at the national level.',
    },
    {
      level: '04',
      title: isHi ? 'राज्य संगठन' : 'State Organization',
      desc: isHi
        ? 'प्रत्येक राज्य में पार्टी का संगठनात्मक ढाँचा।'
        : 'Party structure and administration in each state.',
    },
    {
      level: '05',
      title: isHi ? 'जिला स्तरीय संगठन' : 'District Organization',
      desc: isHi
        ? 'जिला स्तर पर पार्टी की गतिविधियों का संचालन।'
        : 'Party activities and coordination at the district level.',
    },
    {
      level: '06',
      title: isHi ? 'बूथ स्तर समिति' : 'Booth Level Committee',
      desc: isHi
        ? 'प्रत्येक मतदान केंद्र पर 1–15 सदस्यों की समिति।'
        : 'A committee of 1–15 members at every polling booth.',
      href: `/${locale}/booth-committee`,
    },
  ];

  const hierarchy = [
    { title: isHi ? 'राष्ट्रीय अध्यक्ष' : 'National President', note: '' },
    { title: isHi ? 'महासचिव' : 'General Secretary', note: '' },
    { title: isHi ? 'कोषाध्यक्ष' : 'Treasurer', note: '' },
    { title: isHi ? 'राज्य अध्यक्ष' : 'State Presidents', note: isHi ? 'सभी राज्यों में' : 'Across all states' },
    { title: isHi ? 'जिला अध्यक्ष' : 'District Presidents', note: isHi ? 'सभी जिलों में' : 'Across all districts' },
    {
      title: isHi ? 'बूथ स्तर समिति' : 'Booth Level Committee',
      note: isHi ? 'प्रत्येक मतदान केंद्र पर' : 'At every polling booth',
      href: `/${locale}/booth-committee`,
    },
  ];

  const departments = [
    { name: isHi ? 'संगठन विभाग' : 'Organization', desc: isHi ? 'पार्टी संगठन और सदस्यता' : 'Party organization and membership' },
    { name: isHi ? 'प्रचार विभाग' : 'Publicity', desc: isHi ? 'जनसंचार और मीडिया' : 'Public communication and media' },
    { name: isHi ? 'शिक्षा विभाग' : 'Education', desc: isHi ? 'कार्यकर्ता प्रशिक्षण' : 'Worker training and development' },
    { name: isHi ? 'राजनीतिक विभाग' : 'Political Affairs', desc: isHi ? 'नीति निर्माण और रणनीति' : 'Policy and strategy' },
    { name: isHi ? 'आर्थिक विभाग' : 'Finance', desc: isHi ? 'वित्तीय प्रबंधन' : 'Financial management' },
    { name: isHi ? 'सामाजिक कल्याण' : 'Social Welfare', desc: isHi ? 'सामाजिक कार्यक्रम' : 'Social programs and support' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageIntro
        title={isHi ? 'संगठनात्मक ढांचा' : 'Organizational Structure'}
        subtitle={isHi ? 'बहुजन क्रांति पार्टी' : 'Bahujan Kranti Party'}
        description={
          isHi
            ? 'राष्ट्रीय मुख्यालय से बूथ स्तर तक — पार्टी की कार्य प्रणाली और पदानुक्रम।'
            : 'From national headquarters to booth level — how the party is organized and governed.'
        }
        count={6}
        countLabel={isHi ? 'संगठन स्तर' : 'levels'}
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={isHi ? 'संगठन के स्तर' : 'Organizational Levels'}
            description={isHi ? 'ऊपर से नीचे तक पार्टी की संरचना' : 'Party structure from top to bottom'}
            className="mb-8"
          />
          <div className="space-y-3">
            {levels.map((item) => {
              const content = (
                <div className="flex gap-4 sm:gap-6 p-4 sm:p-5 border border-border rounded-lg bg-card hover:border-red-600/20 transition-colors">
                  <span className="text-sm font-bold text-red-600 tabular-nums shrink-0 pt-0.5">
                    {item.level}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                    {item.href && (
                      <span className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-red-600">
                        {isHi ? 'देखें' : 'View directory'}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              );
              return item.href ? (
                <Link key={item.level} href={item.href}>{content}</Link>
              ) : (
                <div key={item.level}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={isHi ? 'पदानुक्रम' : 'Hierarchy'}
            description={isHi ? 'नेतृत्व की श्रृंखला' : 'Chain of leadership'}
            className="mb-8 text-center"
          />
          <div className="space-y-0">
            {hierarchy.map((item, i) => {
              const row = (
                <div className="py-4 text-center border-b border-border last:border-0">
                  <p className="font-medium text-foreground">{item.title}</p>
                  {item.note && (
                    <p className="text-xs text-muted-foreground mt-0.5">{item.note}</p>
                  )}
                </div>
              );
              return item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block hover:bg-card/50 transition-colors -mx-4 px-4 rounded"
                >
                  {row}
                </Link>
              ) : (
                <div key={item.title}>{row}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={isHi ? 'मुख्य विभाग' : 'Main Departments'}
            className="mb-8"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-card p-5">
                <h4 className="font-medium text-foreground text-sm">{dept.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{dept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
