'use client';

import { Shield, Briefcase, GraduationCap, Heart, Building2, Sprout, Users, Globe, Scale } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from '@/lib/TranslationContext';

export default function ManifestoPage() {
  const { t, locale } = useTranslations();

  const policies = [
    {
      icon: Heart,
      title: locale === 'hi' ? 'आयुर्वेदिक सुपर-स्पेशलिटी अस्पताल' : 'Ayurvedic Super-Specialty Healthcare',
      color: 'red',
      points: locale === 'hi' ? [
        'प्रत्येक जिले में गंभीर रोगों के इलाज हेतु सुपर स्पेशलिटी आयुर्वेदिक अस्पतालों का निर्माण।',
        'असाध्य रोगों के लिए इन अस्पतालों में इन-पेशेंट (भर्ती) की पूर्ण सुविधा।',
        'राज्य स्तर पर आधुनिक आयुर्वेदिक मेडिकल कॉलेजों की स्थापना।',
        'आयुर्वेद के माध्यम से स्वस्थ और दीर्घायु भारत का निर्माण।',
      ] : [
        'Construction of super-specialty Ayurvedic hospitals in every district for serious ailments.',
        'Full in-patient (admission) facilities for chronic and incurable diseases.',
        'Establishment of state-of-the-art Ayurvedic Medical Colleges.',
        'Promoting holistic health and longevity through traditional Ayurvedic sciences.',
      ],
    },
    {
      icon: Briefcase,
      title: locale === 'hi' ? 'कर्ज मुक्त भारत और आर्थिक सुधार' : 'Debt-Free India & Economic Reform',
      color: 'green',
      points: locale === 'hi' ? [
        'किसानों और मध्यम वर्ग को ₹50 प्रति लीटर पर पेट्रोलियम की उपलब्धता सुनिश्चित करना।',
        'कृषि को पूर्ण रूप से "उद्योग" का दर्जा देना ताकि किसानों को औद्योगिक लाभ मिले।',
        'आम जनता और मध्यम वर्ग के बोझ को कम करने के लिए "आयकर" (Income Tax) की समाप्ति।',
        'पूंजीपतियों के बजाय जनता के हितों को केंद्र में रखने वाली आर्थिक नीतियां।',
      ] : [
        'Ensuring petroleum at ₹50/liter for farmers and the middle class.',
        'Granting full "Industry" status to agriculture to provide industrial benefits to farmers.',
        'Abolition of Income Tax to reduce the financial burden on the common man.',
        'Economic policies centered on public welfare rather than corporate interests.',
      ],
    },
    {
      icon: Sprout,
      title: locale === 'hi' ? 'राजकीय कृषि एवं गौ-रक्षा कार्यक्रम' : 'State Agriculture & Cow Protection',
      color: 'blue',
      points: locale === 'hi' ? [
        'गाय-बैल को "राजकीय धर्म पशु" घोषित कर उनकी पूर्ण सुरक्षा सुनिश्चित करना।',
        'बुजुर्ग पशुओं को गौशाला दान करने पर ₹5000 प्रति पशु की अनुदान राशि।',
        'गोबर ₹50/ली., गोमूत्र ₹60/ली. और गाय का दूध ₹90/ली. की दर पर सरकार द्वारा खरीद।',
        'सामूहिक खेती और राजकीय स्वामित्व के माध्यम से कृषि का आधुनिकरण।',
      ] : [
        'Declaring cows and oxen as "State Religious Animals" for their complete protection.',
        'Grant of ₹5000 per animal to those donating elderly cattle to shelters.',
        'Govt procurement: Dung @₹50/L, Urine @₹60/L, and Cow Milk @₹90/L.',
        'Modernizing agriculture through collective farming and state ownership.',
      ],
    },
    {
      icon: Globe,
      title: locale === 'hi' ? 'विदेशी काला धन और राष्ट्रीय संपत्ति' : 'Foreign Black Money & National Assets',
      color: 'indigo',
      points: locale === 'hi' ? [
        'विदेशी बैंकों में जमा काले धन को "राष्ट्रीय संपत्ति" घोषित करने हेतु संसद में बिल।',
        'स्विस बैंकों में जमा राशि की वापसी सुनिश्चित कर उसे राष्ट्र निर्माण में लगाना।',
        'घोटालों की राशि को पुनः देश की अर्थव्यवस्था में लाकर प्रत्येक भारतीय को लाभ पहुँचाना।',
        'वित्तीय लूट को रोकने के लिए कड़े अंतर्राष्ट्रीय और राष्ट्रीय कानून।',
      ] : [
        'Parliamentary bill to declare black money in foreign banks as "National Property."',
        'Repatriation of Swiss Bank deposits to be utilized for nation-building.',
        'Redirecting recovered scam money back into the economy for public benefit.',
        'Strict international and national laws to prevent further financial drain.',
      ],
    },
    {
      icon: Users,
      title: locale === 'hi' ? 'सार्वभौमिक सामाजिक सुरक्षा' : 'Universal Social Security',
      color: 'purple',
      points: locale === 'hi' ? [
        'प्रत्येक भारतीय को भोजन, आवास और सम्मानजनक रोजगार की पूर्ण गारंटी।',
        '65 वर्ष से अधिक आयु के वृद्धों के लिए आजीवन सम्मानजनक पेंशन योजना।',
        'समाज के गरीब और कमजोर वर्गों के लिए व्यापक कल्याणकारी कार्यक्रम।',
        'असमानता को कम कर अमीरी-गरीबी की खाई को पाटने का संकल्प।',
      ] : [
        'Guaranteed food, housing, and dignified employment for every citizen.',
        'Lifelong dignity pension for senior citizens above 65 years of age.',
        'Comprehensive welfare programs for the poor and vulnerable sections.',
        'Commitment to bridging the gap between the rich and the poor.',
      ],
    },
    {
      icon: Shield,
      title: locale === 'hi' ? 'सड़क सुरक्षा और लाइसेंस सुधार' : 'Road Safety & Licensing Reform',
      color: 'red',
      points: locale === 'hi' ? [
        'अनिवार्य प्रशिक्षण के पश्चात ही ड्राइविंग लाइसेंस जारी करने की कड़ी व्यवस्था।',
        'शराब पीकर ड्राइविंग को संगीन अपराध की श्रेणी में रखना।',
        'नशे में दुर्घटना करने वालों का लाइसेंस स्थायी रूप से रद्द करना।',
        'सड़क सुरक्षा और यातायात नियमों के प्रति जन-जागरूकता अभियान।',
      ] : [
        'Strict mandatory training before the issuance of any driving license.',
        'Classifying drunk driving as a severe, non-bailable offense.',
        'Permanent cancellation of licenses for repeat offenders or fatal accidents.',
        'Mass awareness campaigns for road safety and traffic discipline.',
      ],
    },
    {
      icon: Building2,
      title: locale === 'hi' ? 'भ्रष्टाचार मुक्त शासन' : 'Corruption-Free Governance',
      color: 'gray',
      points: locale === 'hi' ? [
        'संविधान में "भ्रष्टाचार" की स्पष्ट परिभाषा तय कर कड़े दंड का प्रावधान।',
        'व्यक्तिगत संपत्ति की सीमा निर्धारण कर अनैतिक संपत्ति की जब्ती।',
        'बैंकों और बीमा क्षेत्रों का पूर्ण राष्ट्रीयकरण ताकि धन का दुरुपयोग न हो।',
        'पूंजीपतियों के कर्ज माफी की परंपरा को समाप्त कर जनहित में धन का उपयोग।',
      ] : [
        'Defining "Corruption" clearly in the constitution with stringent penalties.',
        'Limiting individual property ownership and seizing unethical assets.',
        'Complete nationalization of Banks and Insurance for secure public funds.',
        'Ending the practice of corporate loan waivers to focus on public welfare.',
      ],
    },
    {
      icon: Scale,
      title: locale === 'hi' ? 'पारिवारिक विवाद एवं महिला सुरक्षा' : 'Family Disputes & Women\'s Protection',
      color: 'blue',
      points: locale === 'hi' ? [
        'दहेज और घरेलू हिंसा कानूनों के दुरुपयोग पर रोक के लिए पारदर्शी जांच।',
        'BNS 69 जैसे गंभीर प्रावधानों में निष्पक्षता और साक्ष्य-आधारित कार्यवाही सुनिश्चित करना।',
        'पारिवारिक विवादों के समाधान हेतु जिला स्तर पर "पारिवारिक सुलह केंद्रों" की स्थापना।',
        'महिलाओं की वास्तविक सुरक्षा के साथ-साथ निर्दोषों को झूठे मुकदमों से बचाने के लिए कड़े नियम।',
      ] : [
        'Transparent investigation to prevent misuse of dowry and domestic violence laws.',
        'Ensuring fairness and evidence-based action in serious provisions like BNS 69.',
        'Establishment of "Family Reconciliation Centers" at the district level for dispute resolution.',
        'Strict rules for the actual safety of women while protecting the innocent from false cases.',
      ],
    },
    {
      icon: GraduationCap,
      title: locale === 'hi' ? 'शुद्ध भोजन और मिलावटखोरी पर रोक' : 'Pure Food & Anti-Adulteration',
      color: 'blue',
      points: locale === 'hi' ? [
        'खाद्य पदार्थों में मिलावट को संगीन अपराध घोषित कर कड़ा दंड सुनिश्चित करना।',
        'केमिकल युक्त और खतरनाक खाद्य सामग्री पर पूर्ण प्रतिबंध।',
        'स्वस्थ भारत के लिए शुद्ध और पौष्टिक भोजन की उपलब्धता की गारंटी।',
        'मिलावटखोरों पर अंकुश लगाकर रोगों (कैंसर, शुगर आदि) से समाज की रक्षा।',
      ] : [
        'Declaring food adulteration as a heinous crime with severe punishments.',
        'Strict ban on chemical-laden and hazardous food ingredients.',
        'Guaranteeing the availability of pure and nutritious food for a Healthy India.',
        'Protecting society from lifestyle diseases by curbing the adulteration mafia.',
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500' },
      red: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', border: 'border-red-500' },
      green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', border: 'border-green-500' },
      gray: { bg: 'bg-gray-100 dark:bg-gray-800/30', text: 'text-gray-600 dark:text-gray-400', border: 'border-gray-500' },
      purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500' },
      indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500' },
    };
    return colors[color] || colors.blue;
  };

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
              {locale === 'hi' ? 'हमारा विजन' : 'OUR VISION'}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6 leading-tight">
              {t('manifesto.title', 'Our Manifesto')} <br />
              <span className="text-muted-foreground font-medium text-3xl sm:text-5xl">
                {locale === 'hi' ? 'समृद्ध भारत का संकल्प' : 'COMMITMENT TO PROSPERITY'}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl font-normal leading-relaxed border-l-2 border-red-600/40 pl-6">
              {t('manifesto.subtitle', 'A comprehensive vision for India\'s progress and prosperity')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {locale === 'hi' ? 'कल का भारत बनाना' : 'Building Tomorrow\'s India'}
            </h2>
            <p className="text-lg text-muted-foreground">
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
                <Card key={index} className={`border-t-4 ${colors.border} bg-card hover:shadow-lg transition-shadow`}>
                  <CardContent className="pt-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colors.bg} mb-4`}>
                      <policy.icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{policy.title}</h3>
                    <ul className="space-y-2">
                      {policy.points.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className={`inline-block w-2 h-2 rounded-full ${colors.bg} mr-3 mt-2 flex-shrink-0`} />
                          <span className="text-muted-foreground">{point}</span>
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

      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              {locale === 'hi' ? 'हमारी प्रतिबद्धता' : 'Our Commitment'}
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
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
