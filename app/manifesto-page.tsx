'use client';

import { Shield, Briefcase, GraduationCap, Heart, Building2, Sprout, Users, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from '@/lib/TranslationContext';

export default function ManifestoPage() {
  const { t, locale } = useTranslations();

  const policies = [
    {
      icon: GraduationCap,
      title: locale === 'hi' ? 'सभी के लिए शिक्षा' : 'Education for All',
      color: 'blue',
      points: locale === 'hi' ? [
        'प्राथमिक से विश्वविद्यालय स्तर तक मुफ्त गुणवत्तापूर्ण शिक्षा',
        '2030 तक हर स्कूल में डिजिटल कक्षाएं',
        'युवाओं के रोजगार के लिए कौशल विकास कार्यक्रम',
        'शिक्षक प्रशिक्षण और प्रतिस्पर्धी वेतन',
      ] : [
        'Free quality education from primary to university level',
        'Digital classrooms in every school by 2030',
        'Skill development programs for youth employment',
        'Teacher training and competitive salaries',
      ],
    },
    {
      icon: Heart,
      title: locale === 'hi' ? 'सार्वभौमिक स्वास्थ्यसेवा' : 'Universal Healthcare',
      color: 'red',
      points: locale === 'hi' ? [
        'सभी नागरिकों के लिए मुफ्त स्वास्थ्यसेवा',
        'हर जिले में आधुनिक अस्पताल',
        'निवारक स्वास्थ्य सेवा और कल्याण कार्यक्रम',
        'सस्ती दवाएं और उपचार',
      ] : [
        'Free healthcare for all citizens',
        'Modern hospitals in every district',
        'Preventive healthcare and wellness programs',
        'Affordable medicines and treatment',
      ],
    },
    {
      icon: Briefcase,
      title: locale === 'hi' ? 'रोजगार और अर्थव्यवस्था' : 'Employment & Economy',
      color: 'green',
      points: locale === 'hi' ? [
        '5 साल में 10 मिलियन नौकरियां बनाएं',
        'स्टार्टअप और छोटे व्यवसायों के लिए समर्थन',
        'पूरे राष्ट्र में बुनियादी ढांचे का विकास',
        'सभी कर्मचारियों के लिए न्यायपूर्ण मजदूरी और अधिकार',
      ] : [
        'Create 10 million jobs in 5 years',
        'Support for startups and small businesses',
        'Infrastructure development across the nation',
        'Fair wages and worker rights protection',
      ],
    },
    {
      icon: Shield,
      title: locale === 'hi' ? 'सुरक्षा और संरक्षण' : 'Safety & Security',
      color: 'red',
      points: locale === 'hi' ? [
        'बेहतर कानून प्रवर्तन और तेजी से न्याय',
        'सभी शहरों में महिला सुरक्षा पहल',
        'सामुदायिक पुलिसिंग कार्यक्रम',
        'साइबर सुरक्षा और डिजिटल सुरक्षा',
      ] : [
        'Enhanced law enforcement and quick justice',
        'Women safety initiatives in all cities',
        'Community policing programs',
        'Cyber security and digital safety',
      ],
    },
    {
      icon: Building2,
      title: locale === 'hi' ? 'बुनियादी ढांचा' : 'Infrastructure',
      color: 'gray',
      points: locale === 'hi' ? [
        'सभी क्षेत्रों को जोड़ने वाली आधुनिक सड़कें और राजमार्ग',
        'टिकाऊ विकास के साथ स्मार्ट शहर',
        'सार्वजनिक परिवहन का विस्तार',
        'ग्रामीण क्षेत्रों में डिजिटल बुनियादी ढांचा',
      ] : [
        'Modern roads and highways connecting all regions',
        'Smart cities with sustainable development',
        'Public transport expansion',
        'Digital infrastructure in rural areas',
      ],
    },
    {
      icon: Sprout,
      title: locale === 'hi' ? 'पर्यावरण' : 'Environment',
      color: 'green',
      points: locale === 'hi' ? [
        '2040 तक अक्षय ऊर्जा में संक्रमण',
        'वनीकरण और जैव विविधता संरक्षण',
        'स्वच्छ जल और वायु गुणवत्ता मानक',
        'टिकाऊ कृषि प्रथाएं',
      ] : [
        'Transition to renewable energy by 2040',
        'Reforestation and biodiversity protection',
        'Clean water and air quality standards',
        'Sustainable agriculture practices',
      ],
    },
    {
      icon: Users,
      title: locale === 'hi' ? 'सामाजिक कल्याण' : 'Social Welfare',
      color: 'purple',
      points: locale === 'hi' ? [
        'कमजोर वर्गों के लिए सार्वभौमिक बेसिक आय',
        'सीनियर नागरिकों के लिए पेंशन योजनाएं',
        'विकलांग व्यक्तियों के लिए समर्थन',
        'सभी के लिए आवास पहल',
      ] : [
        'Universal basic income for vulnerable sections',
        'Pension schemes for senior citizens',
        'Support for persons with disabilities',
        'Housing for all initiative',
      ],
    },
    {
      icon: Globe,
      title: locale === 'hi' ? 'विदेश नीति' : 'Foreign Policy',
      color: 'indigo',
      points: locale === 'hi' ? [
        'राजनयिक संबंधों को मजबूत करें',
        'आर्थिक विकास के लिए व्यापार साझेदारी',
        'वैश्विक जलवायु पहल में नेतृत्व',
        'विदेशों में भारतीय हितों की सुरक्षा',
      ] : [
        'Strengthen diplomatic relationships',
        'Trade partnerships for economic growth',
        'Leadership in global climate initiatives',
        'Protection of Indian interests abroad',
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-500' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-500' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-500' },
      gray: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-500' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-500' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-500' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative bg-gradient-to-r from-red-600 to-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
              {t('manifesto.title', 'Our Manifesto')}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t('manifesto.subtitle', 'A comprehensive vision for India\'s progress and prosperity')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'hi' ? 'कल का भारत बनाना' : 'Building Tomorrow\'s India'}
            </h2>
            <p className="text-lg text-gray-600">
              {locale === 'hi'
                ? 'हमारा घोषणापत्र लाखों भारतीयों की सामूहिक आकांक्षाओं का प्रतिनिधित्व करता है। ये नीतियां एक समावेशी, समृद्ध और टिकाऊ राष्ट्र बनाने के लिए डिज़ाइन की गई हैं।'
                : 'Our manifesto represents the collective aspirations of millions of Indians. These policies are designed to create an inclusive, prosperous, and sustainable nation for current and future generations.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {policies.map((policy, index) => {
              const colors = getColorClasses(policy.color);
              return (
                <Card key={index} className={`border-t-4 ${colors.border} hover:shadow-lg transition-shadow`}>
                  <CardContent className="pt-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colors.bg} mb-4`}>
                      <policy.icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{policy.title}</h3>
                    <ul className="space-y-2">
                      {policy.points.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className={`inline-block w-2 h-2 rounded-full ${colors.bg} ${colors.text} mr-3 mt-2 flex-shrink-0`} />
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {locale === 'hi' ? 'हमारी प्रतिबद्धता' : 'Our Commitment'}
            </h2>
            <div className="space-y-4 text-gray-600 text-lg">
              <p>
                {locale === 'hi'
                  ? 'हम इन नीतियों को पूर्ण पारदर्शिता और जवाबदेही के साथ लागू करने का वचन देते हैं। हर नागरिक को प्रगति रिपोर्ट तक पहुंच होगी और वे हमें अपनी प्रतिबद्धताओं के लिए जिम्मेदार ठहरा सकते हैं।'
                  : 'We pledge to implement these policies with complete transparency and accountability. Every citizen will have access to progress reports and can hold us responsible for our commitments.'
                }
              </p>
              <p>
                {locale === 'hi'
                  ? 'हमारा घोषणापत्र केवल एक प्रतिश्रुतियों का दस्तावेज नहीं है, बल्कि विस्तृत कार्यान्वयन योजनाओं, समय सीमा और संसाधन आवंटन रणनीतियों द्वारा समर्थित एक रोडमैप है।'
                  : 'Our manifesto is not just a document of promises, but a roadmap backed by detailed implementation plans, timelines, and resource allocation strategies.'
                }
              </p>
              <p>
                {locale === 'hi'
                  ? 'हम सहभागिता शासन में विश्वास करते हैं और इन नीतियों को परिष्कृत और कार्यान्वित करने में सार्वजनिक इनपुट सक्रिय रूप से लेंगे ताकि वे राष्ट्र को प्रभावी ढंग से सेवा दे सकें।'
                  : 'We believe in participatory governance and will actively seek public input in refining and executing these policies to ensure they serve the nation effectively.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
