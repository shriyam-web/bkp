'use client';

import { Building2, Users, Briefcase, Shield, BarChart3 } from 'lucide-react';
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
      color: 'red',
      description: locale === 'hi' 
        ? 'पार्टी का केंद्रीय प्रशासनिक केंद्र जहां सभी महत्वपूर्ण निर्णय लिए जाते हैं।'
        : 'The central administrative hub of the party where all important decisions are made.',
    },
    {
      icon: Users,
      title: locale === 'hi' ? 'राष्ट्रीय पार्षद' : 'National Council',
      color: 'blue',
      description: locale === 'hi'
        ? 'पार्टी के शीर्ष नेतृत्व और निर्णय लेने वाली संस्था।'
        : 'The top leadership and decision-making body of the party.',
    },
    {
      icon: Briefcase,
      title: locale === 'hi' ? 'राष्ट्रीय कार्य समिति' : 'National Executive Committee',
      color: 'green',
      description: locale === 'hi'
        ? 'राष्ट्रीय स्तर पर कार्यान्वयन और प्रशासन के लिए जिम्मेदार।'
        : 'Responsible for implementation and administration at the national level.',
    },
    {
      icon: Shield,
      title: locale === 'hi' ? 'राज्य संगठन' : 'State Organization',
      color: 'yellow',
      description: locale === 'hi'
        ? 'प्रत्येक राज्य में पार्टी के संगठनात्मक ढांचे और प्रशासन।'
        : 'Party organizational structure and administration in each state.',
    },
    {
      icon: BarChart3,
      title: locale === 'hi' ? 'जिला स्तरीय संगठन' : 'District Level Organization',
      color: 'purple',
      description: locale === 'hi'
        ? 'जिला स्तर पर पार्टी की गतिविधियों और संगठन का संचालन।'
        : 'Conducting party activities and organization at the district level.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative bg-gradient-to-r from-red-600 to-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
              {locale === 'hi' ? 'संगठनात्मक ढांचा' : 'Organizational Structure'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
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
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-6 bg-${item.color}-100`}>
                      <Icon className={`h-6 w-6 text-${item.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'hi' ? 'संगठनात्मक पदानुक्रम' : 'Organizational Hierarchy'}
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="space-y-6">
                <div className="text-center py-4 bg-red-50 rounded-lg border-2 border-red-600">
                  <h4 className="text-xl font-bold text-red-600">
                    {locale === 'hi' ? 'राष्ट्रीय अध्यक्ष' : 'National President'}
                  </h4>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-gray-400"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="py-4 bg-blue-50 rounded-lg border-2 border-blue-600 text-center">
                    <h4 className="font-bold text-blue-600">
                      {locale === 'hi' ? 'महासचिव' : 'General Secretary'}
                    </h4>
                  </div>
                  <div className="py-4 bg-blue-50 rounded-lg border-2 border-blue-600 text-center">
                    <h4 className="font-bold text-blue-600">
                      {locale === 'hi' ? 'कोषाध्यक्ष' : 'Treasurer'}
                    </h4>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-gray-400"></div>
                </div>

                <div className="py-4 bg-green-50 rounded-lg border-2 border-green-600 text-center">
                  <h4 className="font-bold text-green-600">
                    {locale === 'hi' ? 'राज्य अध्यक्ष' : 'State Presidents'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    {locale === 'hi' ? 'सभी राज्यों में' : 'In all states'}
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-gray-400"></div>
                </div>

                <div className="py-4 bg-yellow-50 rounded-lg border-2 border-yellow-600 text-center">
                  <h4 className="font-bold text-yellow-600">
                    {locale === 'hi' ? 'जिला अध्यक्ष' : 'District Presidents'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    {locale === 'hi' ? 'सभी जिलों में' : 'In all districts'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
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
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h4 className="font-bold text-lg mb-2 text-gray-900">{dept.name}</h4>
                  <p className="text-gray-600">{dept.desc}</p>
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
