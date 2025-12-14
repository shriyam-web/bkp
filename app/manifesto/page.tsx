import { Shield, Briefcase, GraduationCap, Heart, Building2, Sprout, Users, Globe } from 'lucide-react';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Our Manifesto | Bahujan Kranti Party',
  description: 'Read the Bahujan Kranti Party\'s manifesto. Our comprehensive vision for a progressive, inclusive, and prosperous India.',
  keywords: 'manifesto, party platform, political vision, India development, inclusive growth',
  openGraph: {
    title: 'Our Manifesto | Bahujan Kranti Party',
    description: 'Comprehensive vision for a progressive, inclusive, and prosperous India.',
    url: '/manifesto',
    type: 'website',
  },
};

export default function ManifestoPage() {
  const policies = [
    {
      icon: GraduationCap,
      title: 'Education for All',
      color: 'blue',
      points: [
        'Free quality education from primary to university level',
        'Digital classrooms in every school by 2030',
        'Skill development programs for youth employment',
        'Teacher training and competitive salaries',
      ],
    },
    {
      icon: Heart,
      title: 'Universal Healthcare',
      color: 'red',
      points: [
        'Free healthcare for all citizens',
        'Modern hospitals in every district',
        'Preventive healthcare and wellness programs',
        'Affordable medicines and treatment',
      ],
    },
    {
      icon: Briefcase,
      title: 'Employment & Economy',
      color: 'green',
      points: [
        'Create 10 million jobs in 5 years',
        'Support for startups and small businesses',
        'Infrastructure development across the nation',
        'Fair wages and worker rights protection',
      ],
    },
    {
      icon: Shield,
      title: 'Safety & Security',
      color: 'red',
      points: [
        'Enhanced law enforcement and quick justice',
        'Women safety initiatives in all cities',
        'Community policing programs',
        'Cyber security and digital safety',
      ],
    },
    {
      icon: Building2,
      title: 'Infrastructure',
      color: 'gray',
      points: [
        'Modern roads and highways connecting all regions',
        'Smart cities with sustainable development',
        'Public transport expansion',
        'Digital infrastructure in rural areas',
      ],
    },
    {
      icon: Sprout,
      title: 'Environment',
      color: 'green',
      points: [
        'Transition to renewable energy by 2040',
        'Reforestation and biodiversity protection',
        'Clean water and air quality standards',
        'Sustainable agriculture practices',
      ],
    },
    {
      icon: Users,
      title: 'Social Welfare',
      color: 'purple',
      points: [
        'Universal basic income for vulnerable sections',
        'Pension schemes for senior citizens',
        'Support for persons with disabilities',
        'Housing for all initiative',
      ],
    },
    {
      icon: Globe,
      title: 'Foreign Policy',
      color: 'indigo',
      points: [
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
              Our Manifesto
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              A comprehensive vision for India&apos;s progress and prosperity
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Building Tomorrow&apos;s India
            </h2>
            <p className="text-lg text-gray-600">
              Our manifesto represents the collective aspirations of millions of Indians.
              These policies are designed to create an inclusive, prosperous, and sustainable
              nation for current and future generations.
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
              Our Commitment
            </h2>
            <div className="space-y-4 text-gray-600 text-lg">
              <p>
                We pledge to implement these policies with complete transparency and accountability.
                Every citizen will have access to progress reports and can hold us responsible
                for our commitments.
              </p>
              <p>
                Our manifesto is not just a document of promises, but a roadmap backed by
                detailed implementation plans, timelines, and resource allocation strategies.
              </p>
              <p>
                We believe in participatory governance and will actively seek public input
                in refining and executing these policies to ensure they serve the nation effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
